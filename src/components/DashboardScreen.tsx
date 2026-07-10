import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ClipboardList, Clock, Sparkles, BookOpen, Trash2, Award, ShieldAlert } from 'lucide-react';
import { ExamHistory } from '../types';

interface DashboardScreenProps {
  username: string;
  history: ExamHistory[];
  onStartExam: (difficultyMode: 'balanced' | 'easy' | 'hard', chapterFilter: string) => void;
  onClearHistory: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  username,
  history,
  onStartExam,
  onClearHistory,
}) => {
  const [difficultyMode, setDifficultyMode] = useState<'balanced' | 'easy' | 'hard'>('balanced');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  const getDifficultyBadgeColor = (diff: 'balanced' | 'easy' | 'hard') => {
    switch (diff) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-teal-100 text-teal-800 border-teal-200';
    }
  };

  const getDifficultyLabel = (diff: 'balanced' | 'easy' | 'hard') => {
    switch (diff) {
      case 'easy': return 'সহজ ফোকাস (১৫টি সহজ, ১০টি মাঝারি)';
      case 'hard': return 'চ্যালেঞ্জার মোড (৫টি সহজ, ১০টি মাঝারি, ১০টি কঠিন)';
      default: return 'সুষম মিশ্রণ (১০টি সহজ, ১০টি মাঝারি, ৫টি কঠিন)';
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Intro Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-50/40 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#0d9488] font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>এইচএসসি আইসিটি নৈর্ব্যক্তিক অনুশীলন পোর্টাল</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
              স্বাগতম, <span className="text-[#0d9488] font-extrabold">{username}</span>!
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
              বোর্ড স্ট্যান্ডার্ড ২৫টি প্রশ্নের সঠিক উত্তরের জন্য ২৫ মিনিট সময় পাবেন। প্রতিটি ভুল উত্তরের জন্য <span className="text-[#f43f5e] font-semibold">০.২৫</span> নেগেটিভ মার্ক কাটা হবে। নিজের সক্ষমতা বাড়াতে আজই শুরু করুন!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onStartExam(difficultyMode, selectedChapter)}
            className="flex-shrink-0 bg-[#0d9488] hover:bg-[#0b7e74] text-white font-extrabold px-8 py-5 rounded-2xl shadow-lg shadow-teal-700/20 hover:shadow-teal-800/30 transition-all duration-200 flex items-center justify-center gap-3 text-lg cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            পরীক্ষা শুরু করুন
          </motion.button>
        </div>

        {/* Quick parameters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-[#0d9488] border border-teal-100">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wide">মোট প্রশ্ন</span>
              <span className="text-sm sm:text-base font-bold text-slate-700">২৫টি বহুনির্বাচনী (MCQ)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 border border-amber-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wide">বরাদ্দকৃত সময়</span>
              <span className="text-sm sm:text-base font-bold text-slate-700">২৫ মিনিট (কাউন্টডাউন)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 border border-rose-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-wide">নেগেটিভ মার্ক</span>
              <span className="text-sm sm:text-base font-bold text-slate-700">০.২৫ প্রতি ভুলের জন্য</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customizable Setup Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Chooser */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-1 h-5 bg-[#0d9488] rounded-full"></div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base tracking-tight">অসুবিধা স্তর র্যান্ডমাইজার সেটআপ</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'balanced', 'hard'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDifficultyMode(mode)}
                className={`py-3 px-2 text-center rounded-xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                  difficultyMode === mode
                    ? 'border-[#0d9488] bg-teal-50/50 text-teal-900 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {mode === 'easy' ? 'সহজ' : mode === 'hard' ? 'কঠিন' : 'সুষম'}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 italic bg-slate-50/60 p-3 rounded-xl border border-slate-100">
            বর্তমান নির্বাচন: <strong className="text-teal-800 font-semibold">{getDifficultyLabel(difficultyMode)}</strong>। আমাদের র্যান্ডমাইজেশন ইঞ্জিন সিলেক্টেড চ্যাপ্টারের উপর ভিত্তি করে এই ডিস্ট্রিবিউশন অনুসারে প্রশ্ন তৈরি করবে।
          </p>
        </div>

        {/* Chapter Selective Focus */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="w-1 h-5 bg-[#0d9488] rounded-full"></div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base tracking-tight">অধ্যায়ভিত্তিক নির্দিষ্ট অনুশীলন</h3>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">নির্দিষ্ট অধ্যায় সিলেক্ট করুন:</label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-slate-700 font-semibold outline-none focus:border-[#0d9488] focus:bg-white transition"
            >
              <option value="all">সকল অধ্যায় মিলিয়ে (সম্পূর্ণ সিলেবাস)</option>
              <option value="অধ্যায় ১">অধ্যায় ১: বিশ্ব ও বাংলাদেশ প্রেক্ষিত</option>
              <option value="অধ্যায় ২">অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং</option>
              <option value="অধ্যায় ৩">অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস</option>
              <option value="অধ্যায় ৪">অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি এবং HTML</option>
              <option value="অধ্যায় ৫">অধ্যায় ৫: প্রোগ্রামিং ভাষা</option>
              <option value="অধ্যায় ৬">অধ্যায় ৬: ডেটাবেজ ম্যানেজমেন্ট সিস্টেম</option>
            </select>
          </div>

          <p className="text-xs text-slate-400">
            আপনি চাইলে নির্দিষ্ট কোনো অধ্যায়ের উপর পরীক্ষা দিয়ে নিজেকে শাণিত করতে পারেন, অথবা পুরো সিলেবাস দিয়ে বোর্ড পরীক্ষার বাস্তব স্বাদ নিতে পারেন।
          </p>
        </div>
      </div>

      {/* History Track Segment */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-150 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#0d9488] rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">আপনার পূর্ববর্তী পরীক্ষার ইতিহাস</h2>
              <p className="text-xs text-slate-400">এখানে আপনার পূর্ববর্তী সকল প্রচেষ্টার সামগ্রিক অগ্রগতি সংরক্ষণ করা থাকে।</p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-bold hover:bg-red-50 px-3 py-2 rounded-xl transition duration-150 border border-transparent hover:border-red-100 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              ইতিহাস মুছুন
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
              <ClipboardList className="w-8 h-8" />
            </div>
            <p className="text-slate-500 font-semibold mb-1">কোনো পূর্ববর্তী পরীক্ষার রেকর্ড পাওয়া যায়নি।</p>
            <p className="text-xs text-slate-400">আপনার প্রথম পরীক্ষা দিতে উপরে "পরীক্ষা শুরু করুন" বাটনে ক্লিক করুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">তারিখ</th>
                  <th className="py-3 px-4">অধ্যায় ও অসুবিধা</th>
                  <th className="py-3 px-4">প্রশ্নের তথ্য (সঠিক/ভুল/ফাঁকা)</th>
                  <th className="py-3 px-4">নেগেティブ মার্ক</th>
                  <th className="py-3 px-4 text-right">প্রাপ্ত স্কোর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((record) => (
                  <tr key={record.id} className="text-slate-700 text-sm hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 font-medium text-slate-500">
                      {new Date(record.date).toLocaleDateString('bn-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">
                        {record.difficultySelection === 'easy' ? 'সহজ' : record.difficultySelection === 'hard' ? 'কঠিন' : 'সুষম'}
                      </div>
                      <div className="text-xs text-teal-600 font-semibold">
                        {record.chapterFilter === 'all' ? 'সকল অধ্যায়' : record.chapterFilter}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg text-xs border border-emerald-100">
                          {record.correctAnswers} সঠিক
                        </span>
                        <span className="text-red-500 font-bold bg-red-50 px-2.5 py-0.5 rounded-lg text-xs border border-red-100">
                          {record.wrongAnswers} ভুল
                        </span>
                        <span className="text-slate-400 font-bold bg-slate-50 px-2.5 py-0.5 rounded-lg text-xs border border-slate-100">
                          {record.unanswered} ফাঁকা
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-red-400">
                      -{record.negativeMarks.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-lg font-black text-[#0d9488] font-mono">
                        {record.obtainedMarks.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono"> / {record.totalQuestions}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
