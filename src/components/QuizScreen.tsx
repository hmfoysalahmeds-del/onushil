import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  CheckSquare, 
  Award, 
  ArrowRight, 
  HelpCircle, 
  Flag, 
  Shield, 
  Zap, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  X,
  Sparkles
} from 'lucide-react';
import { Question } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onExamSubmit: (answers: Record<number, number>, timeTakenSeconds: number) => void;
  onBack?: () => void;
  durationMinutes?: number;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ 
  questions, 
  onExamSubmit, 
  onBack,
  durationMinutes = 30 
}) => {
  const totalSeconds = durationMinutes * 60; // 30 minutes = 1800 seconds
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [viewingFullPage, setViewingFullPage] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Strict Countdown Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if modal open
      if (showSubmitConfirm || viewingFullPage) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrev();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlag(currentQIndex);
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
        const optIdx = parseInt(e.key) - 1;
        if (optIdx < (questions[currentQIndex]?.options.length || 0)) {
          handleOptionSelect(currentQIndex, optIdx);
        }
      } else if (['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].includes(e.key.toLowerCase())) {
        const keyMap: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
        const optIdx = keyMap[e.key.toLowerCase()];
        if (optIdx !== undefined && optIdx < (questions[currentQIndex]?.options.length || 0)) {
          handleOptionSelect(currentQIndex, optIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQIndex, showSubmitConfirm, viewingFullPage, questions]);

  const handleAutoSubmit = () => {
    const timeSpent = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    onExamSubmit(answers, timeSpent);
  };

  const handleManualSubmit = () => {
    const timeSpent = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    onExamSubmit(answers, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qIdx]: oIdx,
    }));
  };

  const toggleFlag = (qIdx: number) => {
    setFlagged((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx],
    }));
  };

  const clearOption = (qIdx: number) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qIdx];
      return copy;
    });
  };

  const goToNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const progressPercent = (answeredCount / questions.length) * 100;
  
  const isTimeCritical = timeLeft < 3 * 60; // under 3 min
  const isTimeWarning = timeLeft < 8 * 60; // under 8 min

  // Pace calculations (target: 1800s / 100 = 18 sec per question)
  const timeElapsed = totalSeconds - timeLeft;
  const targetPerQuestion = Math.round(totalSeconds / questions.length);
  const currentPace = answeredCount > 0 ? (timeElapsed / answeredCount).toFixed(1) : '0';

  const currentQuestion = questions[currentQIndex] || questions[0];

  return (
    <div className="relative pb-24 text-slate-100">
      {/* 1. TOP TACTICAL HUD (STICKY) */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-2xl py-3 px-4 sm:px-6 -mx-4 sm:-mx-6 lg:-mx-8 mb-6 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left: Mode Badge & Back */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={() => {
                  const confirmExit = window.confirm("আপনি কি পরীক্ষাটি বাতিল করতে চান?");
                  if (confirmExit) {
                    onBack();
                  }
                }}
                className="text-slate-400 hover:text-emerald-400 flex items-center font-semibold text-xs sm:text-sm transition-colors cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1 text-slate-400" />
                <span>ফিরে যান</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  {questions.length === 50 || questions.length === 38 ? 'b20ISSB NON-VERBAL' : 'b20ISSB VERBAL IQ'}
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {questions.length === 50 || questions.length === 38 ? '50 Questions • 26 Min Time-Locked' : `${questions.length} IQ • ${durationMinutes} Min Drill`}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Real-Time Military Countdown Timer */}
          <div className="flex items-center justify-center gap-3 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 shadow-inner">
            <div className={`p-1.5 rounded-lg flex items-center justify-center ${
              isTimeCritical
                ? 'bg-rose-500/20 text-rose-400 animate-ping'
                : isTimeWarning
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <Clock className="w-4 h-4" />
            </div>

            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">
                TIME REMAINING
              </span>
              <span className={`text-2xl sm:text-3xl font-mono font-black tracking-tight leading-none ${
                isTimeCritical
                  ? 'text-rose-400 animate-pulse'
                  : isTimeWarning
                  ? 'text-amber-400'
                  : 'text-white'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="hidden md:block pl-3 border-l border-slate-800 text-[10px] text-slate-400 font-semibold text-left">
              <div>Target: <strong className="text-white">{targetPerQuestion}s</strong>/item</div>
              <div>Pace: <strong className="text-emerald-400">{currentPace}s</strong>/item</div>
            </div>
          </div>

          {/* Right: Progress & Submit CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-300">
                <span>{answeredCount} of {questions.length}</span> <span className="text-emerald-400">({Math.round(progressPercent)}%)</span>
              </div>
              <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => setShowPalette(!showPalette)}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Palette (1-{questions.length})</span>
            </button>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-950/40 cursor-pointer flex items-center gap-1.5"
            >
              <span>Submit Drill</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. QUESTION PALETTE DRAWER */}
      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-black text-white">{questions.length}-Question Matrix Navigator</h4>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Answered ({answeredCount})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span> Flagged ({flaggedCount})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></span> Unanswered ({questions.length - answeredCount})
                </span>
              </div>
            </div>

            {/* 100 Question Grid */}
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 max-h-56 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = flagged[idx];
                const isCurrent = currentQIndex === idx;

                let bgClass = "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700";
                if (isAnswered) {
                  bgClass = "bg-emerald-500 text-slate-950 font-black border-emerald-400";
                }
                if (isFlagged) {
                  bgClass = "bg-amber-400 text-slate-950 font-black border-amber-300";
                }
                if (isCurrent) {
                  bgClass += " ring-2 ring-white ring-offset-2 ring-offset-slate-900";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQIndex(idx);
                      setShowPalette(false);
                    }}
                    className={`h-8 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN CURRENT QUESTION DISPLAY CARD */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
      >
        {/* Question Header & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm">
              Question {currentQIndex + 1} of {questions.length}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-800 text-slate-300 uppercase tracking-wider border border-slate-700">
              {currentQuestion.topic}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
              {currentQuestion.category}
            </span>
          </div>

          {/* Quick Actions: Flag & Clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFlag(currentQIndex)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                flagged[currentQIndex]
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700'
              }`}
            >
              <Flag className="w-3.5 h-3.5 fill-current" />
              <span>{flagged[currentQIndex] ? 'Flagged (Review)' : 'Flag'}</span>
            </button>

            {answers[currentQIndex] !== undefined && (
              <button
                onClick={() => clearOption(currentQIndex)}
                className="text-xs font-semibold text-slate-400 hover:text-rose-400 flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-slate-800 cursor-pointer"
                title="Clear choice"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Stem */}
        <div className="py-6 text-left space-y-4">
          <h2 className="text-lg sm:text-2xl font-black text-white leading-relaxed tracking-tight">
            {currentQuestion.question}
          </h2>

          {/* Pattern Image or Matrix Diagram */}
          {currentQuestion.imageUrl ? (
            <div className="flex flex-col items-center justify-center my-4">
              <div className="bg-white p-3 sm:p-5 rounded-2xl border-2 border-slate-700 shadow-2xl max-w-md w-full flex flex-col items-center justify-center relative">
                <img
                  src={currentQuestion.imageUrl}
                  alt={`Question ${currentQIndex + 1} Pattern`}
                  className="max-h-72 w-auto object-contain cursor-zoom-in rounded-lg"
                  onClick={() => setViewingFullPage(currentQuestion.pageImageUrl || currentQuestion.imageUrl || null)}
                />
                {currentQuestion.pageImageUrl && (
                  <button
                    type="button"
                    onClick={() => setViewingFullPage(currentQuestion.pageImageUrl!)}
                    className="mt-3 text-[11px] font-black uppercase tracking-wider text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 transition-colors border border-slate-300 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Full Scanned Page</span>
                  </button>
                )}
              </div>
            </div>
          ) : (currentQuestion.diagramType || currentQuestion.testType === 'non-verbal') ? (
            <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 max-w-xl mx-auto flex flex-col items-center justify-center my-4 shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {currentQuestion.diagramType === 'matrix-3x3' ? '3×3 Progressive Matrix' : 'Non-Verbal Pattern Puzzle'}
              </span>

              {/* 3x3 Raven-Style Progressive Matrix Simulation */}
              {currentQuestion.diagramType === 'matrix-3x3' && (
                <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-lg">
                  {/* Row 1 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-400 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-400 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-emerald-400 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-emerald-400 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-teal-400 rotate-45 flex items-center justify-center">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-teal-400 rotate-45 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    </div>
                  </div>
                  {/* Missing Target Cell */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-amber-400 rounded-xl flex flex-col items-center justify-center bg-amber-400/15 text-amber-300 font-mono">
                    <span className="text-xl sm:text-2xl font-black">?</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-amber-400">Select</span>
                  </div>
                </div>
              )}

              {/* Pattern Series Indicator */}
              {currentQuestion.diagramType === 'pattern-series' && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                    Step 1
                  </div>
                  <span className="text-slate-500 font-bold">→</span>
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                    Step 2
                  </div>
                  <span className="text-slate-500 font-bold">→</span>
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                    Step 3
                  </div>
                  <span className="text-slate-500 font-bold">→</span>
                  <div className="w-14 h-14 rounded-xl bg-amber-400/10 border-2 border-dashed border-amber-400 flex items-center justify-center text-base font-black text-amber-300">
                    ?
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Options Grid (Supports up to 8 options A-H & visual SVGs) */}
          <div className={`grid gap-3 pt-2 ${
            currentQuestion.options.length > 5
              ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = answers[currentQIndex] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
              const hasSvg = currentQuestion.optionSvgs && currentQuestion.optionSvgs[optIdx];

              return (
                <motion.div
                  key={optIdx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleOptionSelect(currentQIndex, optIdx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-lg shadow-emerald-950/40'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors flex-shrink-0 ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {optionLetters[optIdx]}
                    </div>

                    <span className="font-bold text-sm leading-snug flex-grow">
                      {option.startsWith('(') ? `Option ${option}` : option}
                    </span>
                  </div>

                  {/* Visual SVG Diagram for Non-Verbal Option */}
                  {hasSvg && (
                    <div 
                      className="bg-slate-900/90 rounded-xl p-2 border border-slate-800/80 flex items-center justify-center self-center my-1"
                      dangerouslySetInnerHTML={{ __html: currentQuestion.optionSvgs![optIdx] }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Question Footer Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-4">
          <button
            onClick={goToPrev}
            disabled={currentQIndex === 0}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              currentQIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-600 bg-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous (←)</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden md:inline">
              Shortcuts: [1-4] Select • [F] Flag • [→] Next
            </span>
          </div>

          {currentQIndex < questions.length - 1 ? (
            <button
              onClick={goToNext}
              className="px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <span>Next (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              <span>Finish & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* 4. SUBMIT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Submit 100 IQ Exam?</h3>
                  <span className="text-xs text-slate-400 font-bold">b20ISSB Simulation Assessment</span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Answered</span>
                  <span className="text-lg font-black text-emerald-400">{answeredCount}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Flagged</span>
                  <span className="text-lg font-black text-amber-400">{flaggedCount}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Unanswered</span>
                  <span className="text-lg font-black text-rose-400">{questions.length - answeredCount}</span>
                </div>
              </div>

              {questions.length - answeredCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300 font-medium">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>You have {questions.length - answeredCount} unanswered questions remaining.</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer border border-slate-700"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleManualSubmit}
                  className="w-1/2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-emerald-950/60"
                >
                  Confirm Submission
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 5. FULL TEST PAPER LIGHTBOX MODAL */}
        {viewingFullPage && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setViewingFullPage(null)}
          >
            <div 
              className="relative max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-4 overflow-hidden flex flex-col items-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  Authentic ISSB Non-Verbal Examination Paper
                </span>
                <button
                  onClick={() => setViewingFullPage(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-auto max-h-[78vh] w-full flex justify-center bg-white p-2 rounded-2xl">
                <img 
                  src={viewingFullPage} 
                  alt="Full Authentic Test Page" 
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
