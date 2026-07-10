import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  RotateCcw, 
  ThumbsUp, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Info 
} from 'lucide-react';
import { Question } from '../types';

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<number, number>;
  onRestart: () => void;
}

// Accordion Component for Solution and Explanation
const QuestionReviewCard: React.FC<{
  q: Question;
  qIdx: number;
  userAnswer: number | undefined;
}> = ({ q, qIdx, userAnswer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCorrect = userAnswer === q.correctAnswerIndex;
  const isUnanswered = userAnswer === undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-all duration-200 ${
        isCorrect 
          ? 'border-emerald-300 bg-emerald-50/10' 
          : isUnanswered 
            ? 'border-slate-200 bg-white' 
            : 'border-red-200 bg-rose-50/10'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
            isCorrect 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : isUnanswered 
                ? 'bg-slate-50 text-slate-500 border-slate-200' 
                : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            প্রশ্ন {qIdx + 1}
          </span>
          <span className="text-slate-400 text-xs font-semibold">
            {q.chapter.split(':')[0]}
          </span>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          isCorrect 
            ? 'bg-emerald-55 text-emerald-700' 
            : isUnanswered 
              ? 'bg-amber-50 text-amber-600' 
              : 'bg-red-50 text-red-600'
        }`}>
          {isCorrect ? 'সঠিক উত্তর' : isUnanswered ? 'উত্তর করা হয়নি' : 'ভুল উত্তর'}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-6 leading-relaxed">
        {q.question}
      </h3>

      {/* Options Listing with precise borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {q.options.map((opt, oIdx) => {
          const isCurrentCorrect = oIdx === q.correctAnswerIndex;
          const isUserSelection = userAnswer === oIdx;

          let optionStyle = 'border-slate-200 bg-slate-50/40 text-slate-700';
          let icon = null;

          if (isCurrentCorrect) {
            // Correct answer: green border/background, check icon
            optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
            icon = (
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            );
          } else if (isUserSelection && !isCorrect) {
            // Wrong user selection: red border/background, X icon
            optionStyle = 'border-[#f43f5e] bg-red-50/80 text-red-950 font-semibold';
            icon = (
              <span className="w-6 h-6 rounded-full bg-[#f43f5e] text-white flex items-center justify-center shadow-sm">
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            );
          }

          return (
            <div
              key={oIdx}
              className={`p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 text-sm sm:text-base transition duration-150 ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                  isCurrentCorrect 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : isUserSelection 
                      ? 'bg-[#f43f5e] border-[#f43f5e] text-white' 
                      : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {String.fromCharCode(0x995 + oIdx)}
                </span>
                <span className="font-semibold">{opt}</span>
              </div>
              {icon}
            </div>
          );
        })}
      </div>

      {/* Accordion Block: Show Answer and Solution */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mt-4 shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-100 hover:bg-slate-150 px-4 py-2.5 text-xs font-black uppercase text-slate-500 tracking-widest flex justify-between items-center transition cursor-pointer"
        >
          <span>Show Answer and Solution</span>
          <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden bg-white text-sm border-t border-slate-200"
            >
              <div className="p-4 space-y-3">
                <div>
                  <strong className="text-[#0d9488] font-bold uppercase text-[10px] tracking-wider block mb-1">Answer:</strong>
                  <span className="text-slate-800 font-bold">{q.options[q.correctAnswerIndex]}</span>
                </div>
                <div className="h-px bg-slate-150"></div>
                <div>
                  <strong className="text-[#0d9488] font-bold uppercase text-[10px] tracking-wider block mb-1">Explanation:</strong>
                  <span className="text-slate-600 font-medium leading-relaxed">{q.explanation}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  answers,
  onRestart,
}) => {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((q, idx) => {
    const userAns = answers[idx];
    if (userAns === undefined) {
      unanswered++;
    } else if (userAns === q.correctAnswerIndex) {
      correct++;
    } else {
      wrong++;
    }
  });

  // Calculate Marks
  const correctMarks = correct * 1.0;
  const negativeMarks = wrong * 0.25;
  const obtainedMarks = Math.max(0, correctMarks - negativeMarks);
  const highestMarks = 25.0;

  // Position calculations (Simulated peer metrics)
  let position = 1;
  let peerCount = 150;
  let performanceTitle = 'মেধাতালিকায় চমৎকার অবস্থান';
  let performanceDesc = 'আপনি সমস্ত প্রশ্নের উত্তর দিয়ে দারুণ মেধার পরিচয় দিয়েছেন!';
  let ratingPercent = 99;

  if (obtainedMarks >= 20) {
    position = Math.floor(Math.random() * 3) + 1; // 1 to 3
    ratingPercent = 98;
    performanceTitle = 'অসাধারণ পারফরম্যান্স!';
    performanceDesc = 'আপনার আইসিটি প্রিপারেশন অত্যন্ত মজবুত। বোর্ড পরীক্ষায় এ প্লাস নিশ্চিত!';
  } else if (obtainedMarks >= 15) {
    position = Math.floor(Math.random() * 8) + 4; // 4 to 11
    ratingPercent = 91;
    performanceTitle = 'দারুণ প্রিপারেশন!';
    performanceDesc = 'সামান্য কিছু ভুলের কারণে অল্প মার্ক কাটা গেছে। নিয়মিত অনুশীলনে এটিও কাটিয়ে ওঠা সম্ভব।';
  } else if (obtainedMarks >= 10) {
    position = Math.floor(Math.random() * 20) + 12; // 12 to 31
    ratingPercent = 78;
    performanceTitle = 'সন্তোষজনক ফলাফল';
    performanceDesc = 'আপনার প্রস্তুতি বেশ ভালো, তবে কঠিন প্রশ্নগুলোতে আরেকটু দক্ষতা বাড়ানো দরকার।';
  } else {
    position = Math.floor(Math.random() * 40) + 32; // 32 to 71
    ratingPercent = 54;
    performanceTitle = 'আরও অনুশীলন প্রয়োজন';
    performanceDesc = 'ভয় পাওয়ার কিছু নেই! ভুলগুলো সমাধান দেখে শিখে নিন এবং পুনরায় অনুশীলনে বসুন।';
  }

  return (
    <div className="space-y-8 py-4">
      {/* Dynamic Celebration Hero banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-48 h-48 bg-teal-50/40 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 -translate-x-12 translate-y-12 w-48 h-48 bg-emerald-50/40 rounded-full blur-3xl -z-10 opacity-50"></div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
          className="w-20 h-20 bg-teal-50 text-[#0d9488] border border-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-md"
        >
          <Award className="w-10 h-10" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
          অনুশীলনী সম্পন্ন হয়েছে!
        </h1>
        <p className="text-[#0d9488] font-bold text-sm sm:text-base mt-1.5 flex items-center justify-center gap-1">
          <ThumbsUp className="w-4 h-4 text-amber-500" />
          {performanceTitle}
        </p>
        <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {performanceDesc}
        </p>
      </motion.div>

      {/* Specific 3-Column Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Your Answer */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0d9488] rounded-full"></div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-tight">Your Answer</h3>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-md">পরিসংখ্যান</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                Total Questions:
              </span>
              <span className="font-bold text-slate-800 text-base">{questions.length}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Correct Answers:
              </span>
              <span className="font-bold text-emerald-600 text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">{correct}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Wrong Answers:
              </span>
              <span className="font-bold text-red-500 text-base bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-100">{wrong}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-amber-500" />
                Unanswered:
              </span>
              <span className="font-bold text-amber-600 text-base bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-100">{unanswered}</span>
            </div>
          </div>
        </motion.div>

        {/* Column 2: Your Marks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0d9488] rounded-full"></div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-tight">Your Marks</h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-extrabold px-2 py-0.5 rounded-md">মার্ক শিট</span>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Correct Marks:</span>
              <span className="font-bold text-slate-800 font-mono">+{correctMarks.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Negative Marks (০.২৫):</span>
              <span className="font-bold text-[#f43f5e] font-mono">-{negativeMarks.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-800">Obtained Score:</span>
              <span className="font-black text-xl text-[#0d9488] font-mono">{obtainedMarks.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Highest Score:</span>
              <span className="font-bold text-slate-400 font-mono">{highestMarks.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Your Position */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
        >
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0d9488] rounded-full"></div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-tight">Your Position</h3>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-md">মেধাতালিকা</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 flex-1">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
              className="text-4xl sm:text-5xl font-black text-[#0d9488] tracking-tight font-mono"
            >
              #{position}
            </motion.div>
            <span className="text-[11px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
              {peerCount} জন পরীক্ষার্থীর মধ্যে
            </span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-150 flex items-center gap-2.5 mt-auto">
            <TrendingUp className="w-5 h-5 text-[#0d9488] flex-shrink-0 animate-pulse" />
            <p className="text-xs text-slate-500 leading-snug font-semibold">
              আপনি পরীক্ষায় অংশ নেওয়া প্রায় <strong className="text-[#0d9488] font-extrabold">{ratingPercent}%</strong> শিক্ষার্থীর চেয়ে এগিয়ে আছেন!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Review Section */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 pt-4 border-b border-slate-200 pb-3">
          উত্তরপত্র পর্যালোচনা ও ব্যাখ্যাসমূহ
        </h2>

        <div className="space-y-5">
          {questions.map((q, idx) => (
            <QuestionReviewCard
              key={q.id}
              q={q}
              qIdx={idx}
              userAnswer={answers[idx]}
            />
          ))}
        </div>
      </div>

      {/* Re-Exam Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRestart}
        className="w-full bg-[#0d9488] hover:bg-[#0b7e74] text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-teal-700/20 hover:shadow-teal-800/30 transition-all duration-200 flex items-center justify-center gap-2.5 text-lg cursor-pointer"
      >
        <RotateCcw className="w-5 h-5" />
        পুনরায় পরীক্ষা দিন (নতুন প্রশ্নপত্র তৈরি করুন)
      </motion.button>
    </div>
  );
};
