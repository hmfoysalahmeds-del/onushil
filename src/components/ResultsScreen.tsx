import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Trophy, 
  Clock, 
  Award, 
  Shield, 
  Zap, 
  Target, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  BarChart2,
  Filter,
  Sparkles
} from 'lucide-react';
import { Question } from '../types';

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<number, number>;
  timeTakenSeconds?: number;
  onRestart: () => void;
  onBack?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  answers,
  timeTakenSeconds = 1800,
  onRestart,
  onBack,
}) => {
  const [filter, setFilter] = useState<'all' | 'wrong' | 'unanswered' | 'correct'>('all');
  const [openExplanations, setOpenExplanations] = useState<Record<number, boolean>>({});

  // Calculations
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  const topicStats: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q, idx) => {
    // Topic aggregation
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { correct: 0, total: 0 };
    }
    topicStats[q.topic].total += 1;

    const userAns = answers[idx];
    if (userAns === undefined) {
      unanswered++;
    } else if (userAns === q.correctAnswerIndex) {
      correct++;
      topicStats[q.topic].correct += 1;
    } else {
      wrong++;
    }
  });

  const correctMarks = correct * 1.0;
  const negativeMarks = wrong * 0.25;
  const netScore = Math.max(0, correctMarks - negativeMarks);
  const percentage = Math.round((correct / questions.length) * 100);

  // ISSB-style Grading logic (percentage-based so it works seamlessly for 50 or 100 questions)
  let gradeBadge = {
    title: 'Not Recommended',
    color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    headerBg: 'from-rose-950 via-slate-900 to-slate-900',
    description: 'Drastic speed and logic improvement needed to pass ISSB preliminary intelligence screening.'
  };

  if (percentage >= 75) {
    gradeBadge = {
      title: 'Outstanding',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      headerBg: 'from-emerald-950 via-slate-900 to-slate-900',
      description: 'Exceptional intellectual reflex! You possess the quick decision-making and pattern recognition of top cadet material.'
    };
  } else if (percentage >= 60) {
    gradeBadge = {
      title: 'Recommended Candidate',
      color: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      headerBg: 'from-teal-950 via-slate-900 to-slate-900',
      description: 'Solid performance clearing the ISSB-style cutoff benchmark. Ready for psychologist and obstacle phases.'
    };
  } else if (percentage >= 45) {
    gradeBadge = {
      title: 'Marginal / Borderline',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      headerBg: 'from-amber-950 via-slate-900 to-slate-900',
      description: 'Close to passing. Hone your speed on non-verbal matrices and number series to cross the benchmark mark safely.'
    };
  }

  // Pace formatting
  const avgSecondsPerItem = answers && Object.keys(answers).length > 0 
    ? (timeTakenSeconds / Object.keys(answers).length).toFixed(1)
    : '0';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const toggleExplanation = (idx: number) => {
    setOpenExplanations(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Filtered review list
  const filteredQuestions = questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
    const userAns = answers[idx];
    if (filter === 'wrong') return userAns !== undefined && userAns !== q.correctAnswerIndex;
    if (filter === 'unanswered') return userAns === undefined;
    if (filter === 'correct') return userAns === q.correctAnswerIndex;
    return true;
  });

  return (
    <div className="space-y-8 py-4 text-slate-100">
      {/* Top back button: Subtle 'Back' button in top-left corner */}
      {onBack && (
        <div className="flex items-center justify-start -mb-2">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-emerald-400 flex items-center font-semibold text-xs sm:text-sm transition-colors cursor-pointer py-1.5 px-3 rounded-xl hover:bg-slate-900 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1 text-slate-400" />
            <span>ফিরে যান</span>
          </button>
        </div>
      )}

      {/* 1. CELEBRATION & ISSB STANDING HERO BANNER */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-gradient-to-br ${gradeBadge.headerBg} rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-black uppercase tracking-wider text-slate-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISSB-style Evaluation Report</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Assessment: <span className="text-emerald-400">{gradeBadge.title}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {gradeBadge.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Time: {formatTime(timeTakenSeconds)}
              </span>
              <span className="flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Pace: {avgSecondsPerItem}s / item
              </span>
            </div>
          </div>

          {/* Primary Score Ring */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-3xl border border-slate-800 text-center min-w-[200px] shadow-inner">
            <span className="text-xs uppercase font-black text-slate-400 tracking-widest mb-1">Raw Score</span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 tracking-tight">
              {correct}
            </div>
            <span className="text-xs font-bold text-slate-400 mt-1">out of {questions.length} questions</span>
            <div className="mt-3 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {percentage}% Accuracy
            </div>
          </div>

        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct Answers</span>
            </div>
            <span className="text-2xl font-black text-white font-mono">{correct}</span>
            <span className="block text-[11px] text-slate-400 mt-0.5">+1.0 per item</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-1">
              <XCircle className="w-4 h-4" />
              <span>Wrong Answers</span>
            </div>
            <span className="text-2xl font-black text-white font-mono">{wrong}</span>
            <span className="block text-[11px] text-rose-400 mt-0.5">-{negativeMarks.toFixed(2)} penalty</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Skipped</span>
            </div>
            <span className="text-2xl font-black text-white font-mono">{unanswered}</span>
            <span className="block text-[11px] text-slate-400 mt-0.5">0.0 penalty</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>Net Marks</span>
            </div>
            <span className="text-2xl font-black text-amber-400 font-mono">{netScore.toFixed(2)}</span>
            <span className="block text-[11px] text-slate-400 mt-0.5">Standard Score</span>
          </div>
        </div>
      </motion.div>

      {/* 2. CATEGORY BREAKDOWN TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-black text-white">Performance by IQ Category</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Identifies strengths & drill priorities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(topicStats).map(([topic, stat]) => {
            const topicPercent = Math.round((stat.correct / stat.total) * 100);
            return (
              <div key={topic} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white truncate max-w-[180px]">{topic}</span>
                  <span className="font-mono font-bold text-emerald-400">{stat.correct}/{stat.total}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${topicPercent}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Accuracy</span>
                  <span className="font-bold text-slate-300">{topicPercent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. QUESTION-BY-QUESTION REVIEW ACCORDION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-black text-white">Detailed Solutions & Explanations</h3>
            <p className="text-xs text-slate-400">Review step-by-step logic for every question tested.</p>
          </div>

          {/* Review Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                filter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                filter === 'wrong' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Incorrect ({wrong})
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                filter === 'unanswered' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Skipped ({unanswered})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                filter === 'correct' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Correct ({correct})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map(({ q, idx }) => {
            const userAns = answers[idx];
            const isCorrect = userAns === q.correctAnswerIndex;
            const isUnanswered = userAns === undefined;
            const isOpen = openExplanations[idx] || false;

            return (
              <div 
                key={q.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-colors"
              >
                {/* Header Row */}
                <div 
                  onClick={() => toggleExplanation(idx)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isUnanswered
                          ? 'bg-slate-800 text-slate-400 border border-slate-700'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {isCorrect ? 'Correct' : isUnanswered ? 'Skipped' : 'Incorrect'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Question {idx + 1}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">• {q.topic}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Details Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-800 px-5 pb-5 pt-3 space-y-4"
                    >
                      {/* Pattern Diagram Preview if available */}
                      {q.imageUrl && (
                        <div className="bg-white p-3 rounded-2xl border border-slate-700 flex flex-col items-center justify-center max-w-sm mx-auto shadow-md">
                          <img 
                            src={q.imageUrl} 
                            alt={`Question ${idx + 1} pattern`}
                            className="max-h-56 w-auto object-contain rounded-lg"
                          />
                        </div>
                      )}

                      {/* Options listing */}
                      <div className={`grid gap-2 ${
                        q.options.length > 5 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'
                      }`}>
                        {q.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.correctAnswerIndex;
                          const isOptionChosen = userAns === oIdx;

                          let optClass = "bg-slate-900 border-slate-800 text-slate-400";
                          if (isOptionCorrect) {
                            optClass = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                          } else if (isOptionChosen && !isOptionCorrect) {
                            optClass = "bg-rose-500/20 border-rose-500 text-rose-200 font-bold";
                          }

                          const hasSvg = q.optionSvgs && q.optionSvgs[oIdx];

                          return (
                            <div key={oIdx} className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-2 ${optClass}`}>
                              <div className="flex items-center justify-between gap-2">
                                <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                {isOptionCorrect && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                                {isOptionChosen && !isOptionCorrect && <X className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                              </div>
                              {hasSvg && (
                                <div 
                                  className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center justify-center self-center"
                                  dangerouslySetInnerHTML={{ __html: q.optionSvgs![oIdx] }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Solution & Logic:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Launch Fresh 100 IQ Test (Unlimited Generator)</span>
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-8 py-4 rounded-2xl border border-slate-700 transition-all text-base cursor-pointer"
          >
            <span>Back to Candidate Portal</span>
          </button>
        )}
      </div>
    </div>
  );
};
