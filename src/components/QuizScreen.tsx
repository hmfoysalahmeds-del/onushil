import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, CheckSquare, Award, ArrowRight, HelpCircle, Flag } from 'lucide-react';
import { Question } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onExamSubmit: (answers: Record<number, number>) => void;
  onBack?: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onExamSubmit, onBack }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Timer Countdown Logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto submit
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

  const handleAutoSubmit = () => {
    // Collect answers as they are and force submit
    onExamSubmit(answers);
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

  const handleToggleFlag = (qIdx: number) => {
    setFlagged((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx],
    }));
  };

  const scrollToQuestion = (idx: number) => {
    const target = questionRefs.current[idx];
    if (target) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  const isTimeLow = timeLeft < 3 * 60; // Less than 3 minutes remaining

  return (
    <div className="relative pb-24">
      {/* Back Button */}
      {onBack && (
        <div className="flex items-center justify-start mb-4">
          <button
            onClick={() => {
              if (window.confirm("আপনি কি পরীক্ষাটি বাতিল করতে চান?")) {
                onBack();
              }
            }}
            className="text-slate-500 hover:text-teal-700 flex items-center gap-1.5 font-bold text-sm transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            <span>ফিরে যান</span>
          </button>
        </div>
      )}

      {/* Sticky Top Status Bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-4 px-4 sm:px-6 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 transition-all">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-6">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isTimeLow ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-teal-50 text-[#0d9488]'
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">অবশিষ্ট সময়</span>
                <span className={`text-2xl font-mono font-black tracking-tight leading-none ${
                  isTimeLow ? 'text-rose-500 animate-pulse' : 'text-slate-700'
                }`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

            <div className="space-y-1 flex-1 sm:flex-none">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>উত্তর করা হয়েছে:</span>
                <span className="text-[#0d9488] font-mono">{answeredCount} / {questions.length}</span>
              </div>
              <div className="w-40 sm:w-48 bg-slate-150 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0d9488] h-full rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="w-full sm:w-auto bg-[#0d9488] hover:bg-[#0b7e74] text-white font-extrabold px-6 py-3 rounded-xl shadow-md shadow-teal-700/20 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckSquare className="w-5 h-5" />
            উত্তরপত্র জমা দিন
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Questions List */}
        <div className="lg:col-span-3 space-y-6">
          {questions.map((q, qIdx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.04, duration: 0.4 }}
              key={q.id}
              ref={(el) => { questionRefs.current[qIdx] = el; }}
              className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border transition-all duration-300 relative ${
                answers[qIdx] !== undefined 
                  ? 'border-[#0d9488]/40 ring-1 ring-[#0d9488]/10 bg-teal-50/5' 
                  : flagged[qIdx] 
                    ? 'border-amber-400 bg-amber-50/10'
                    : 'border-slate-200'
              }`}
            >
              {/* Question header */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-50 text-[#0d9488] text-xs font-bold px-2.5 py-1 rounded-lg border border-teal-100">
                    প্রশ্ন {qIdx + 1}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">
                    {q.chapter.split(':')[0]}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    q.difficulty === 'hard' 
                      ? 'bg-red-50 text-red-600 border border-red-100' 
                      : q.difficulty === 'medium' 
                        ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {q.difficulty === 'hard' ? 'কঠিন' : q.difficulty === 'medium' ? 'মাঝারি' : 'সহজ'}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleFlag(qIdx)}
                  className={`p-1.5 rounded-lg border transition cursor-pointer ${
                    flagged[qIdx] 
                      ? 'bg-amber-50 border-amber-200 text-amber-500' 
                      : 'border-slate-200 text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                  }`}
                  title={flagged[qIdx] ? "চিহ্নিত করা হয়েছে" : "পর্যালোচনার জন্য চিহ্নিত করুন"}
                >
                  <Flag className={`w-4 h-4 ${flagged[qIdx] ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed mb-6">
                {q.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(qIdx, oIdx)}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-3.5 group relative cursor-pointer ${
                        isSelected
                          ? 'border-[#0d9488] bg-teal-50/50 text-teal-955 ring-4 ring-[#0d9488]/10'
                          : 'border-slate-200 hover:border-[#0d9488] hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className={`w-8 h-8 flex-shrink-0 rounded-full border flex items-center justify-center text-sm font-bold transition duration-150 ${
                        isSelected
                          ? 'bg-[#0d9488] text-white border-[#0d9488]'
                          : 'bg-white border-slate-200 text-slate-500 group-hover:border-[#0d9488] group-hover:text-[#0d9488]'
                      }`}>
                        {String.fromCharCode(0x995 + oIdx)}
                      </span>
                      <span className={`font-semibold text-sm sm:text-base leading-snug ${isSelected ? 'text-teal-950 font-bold' : ''}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Floating Navigation Tray */}
        <div className="space-y-6 lg:sticky lg:top-48 z-20">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0d9488]" />
                প্রশ্ন প্যালেট
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold">যেকোনো প্রশ্নে সরাসরি স্ক্রোল করতে নম্বরে ক্লিক করুন।</p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = flagged[idx];
                
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToQuestion(idx)}
                    className={`h-9 w-full rounded-lg text-xs font-bold transition flex items-center justify-center border-2 cursor-pointer ${
                      isAnswered
                        ? 'bg-[#0d9488] border-[#0d9488] text-white shadow-sm shadow-teal-600/10'
                        : isFlagged
                          ? 'bg-amber-500 border-amber-500 text-white'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-[#0d9488] hover:text-[#0d9488]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Color Labels legend */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-[#0d9488] block"></span>
                <span>উত্তর করা হয়েছে ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-amber-500 block"></span>
                <span>পর্যালোচনার জন্য চিহ্নিত ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3 h-3 rounded bg-white border-2 border-slate-200 block"></span>
                <span>উত্তরের অপেক্ষায় ({questions.length - answeredCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmitConfirm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-200 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckSquare className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">আপনি কি নিশ্চিতভাবে উত্তরপত্র জমা দিতে চান?</h3>
                <p className="text-sm text-slate-500">
                  আপনি মোট ২৫টি প্রশ্নের মধ্যে <strong className="text-teal-700 font-bold">{answeredCount}</strong>টি প্রশ্নের উত্তর প্রদান করেছেন। বাকি <strong className="text-amber-600 font-bold">{questions.length - answeredCount}</strong>টি প্রশ্নের কোনো উত্তর পাওয়া যায়নি।
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition cursor-pointer"
                >
                  পরীক্ষায় ফিরে যান
                </button>
                <button
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    onExamSubmit(answers);
                  }}
                  className="py-3.5 px-4 bg-[#0d9488] hover:bg-[#0b7e74] text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-700/10 cursor-pointer"
                >
                  হ্যাঁ, জমা দিন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
