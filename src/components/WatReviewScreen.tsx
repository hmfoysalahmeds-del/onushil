import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  LayoutDashboard, 
  Sparkles, 
  Keyboard, 
  FileEdit,
  Lightbulb,
  Calendar
} from 'lucide-react';
import { WatAttempt } from '../types';

interface WatReviewScreenProps {
  attempt: WatAttempt;
  onRetry: () => void;
  onBackToDashboard: () => void;
}

export const WatReviewScreen: React.FC<WatReviewScreenProps> = ({
  attempt,
  onRetry,
  onBackToDashboard,
}) => {
  const isTypeMode = attempt.mode === 'type';
  const totalWords = attempt.words?.length || 80;
  
  // Calculate answered vs skipped in type mode
  const answeredCount = attempt.sentences 
    ? attempt.sentences.filter((s) => s && s.trim().length > 0).length 
    : (attempt.answeredCount || 0);
  const skippedCount = Math.max(0, totalWords - answeredCount);

  const formattedDate = (() => {
    try {
      return new Date(attempt.date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return attempt.date;
    }
  })();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 text-slate-100 text-left">
      {/* 1. Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>WAT Review Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Word Association Test Review
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="capitalize">{attempt.mode} Mode</span>
              {!attempt.completed && (
                <span className="text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded">
                  Incomplete Attempt
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRetry}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-950/40 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry with new words</span>
            </button>
            <button
              onClick={onBackToDashboard}
              className="border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Stats Row (No marks or score, as specified) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Stimulus Words
            </span>
            <span className="text-2xl font-black text-white">{totalWords}</span>
          </div>

          {isTypeMode ? (
            <>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Sentences Written
                </span>
                <span className="text-2xl font-black text-emerald-400">{answeredCount}</span>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Skipped Words
                </span>
                <span className={`text-2xl font-black ${skippedCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {skippedCount}
                </span>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Execution Mode
                </span>
                <span className="text-base font-black text-purple-300 flex items-center gap-1.5 mt-1">
                  <Keyboard className="w-4 h-4" /> Type Box
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 col-span-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Execution Mode
                </span>
                <span className="text-base font-black text-emerald-300 flex items-center gap-1.5 mt-1">
                  <FileEdit className="w-4 h-4" /> Physical Pen & Paper Simulation
                </span>
              </div>
            </>
          )}
        </div>

        {/* 2. Official Psychological Guidance Tips Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <h3 className="font-black text-sm uppercase tracking-wide text-white">
              Psychological Evaluation Guidance
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            "Write short, positive, complete sentences. Avoid negative or vague answers. Be natural and honest."
          </p>
        </div>
      </motion.div>

      {/* 3. Words and Responses Table */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-black text-white">
              {isTypeMode ? 'Consecutive Responses (80 Words)' : 'Consecutive Stimulus Words'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isTypeMode 
                ? 'Review your instant subconscious associations exactly as recorded.'
                : 'Check your paper answers against this list.'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            {attempt.words.length} Items
          </span>
        </div>

        {/* Paper mode banner */}
        {!isTypeMode && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-xs sm:text-sm text-emerald-300 font-medium">
            Check your paper answers against this list. Compare each response against the psychological guidance principles above.
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {attempt.words.map((word, idx) => {
            const sentence = attempt.sentences?.[idx]?.trim();
            const hasSentence = Boolean(sentence);

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  hasSentence
                    ? 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                    : isTypeMode
                    ? 'bg-slate-950/40 border-rose-900/30'
                    : 'bg-slate-950/70 border-slate-800/80'
                }`}
              >
                {/* Index & Stimulus Word */}
                <div className="flex items-center gap-3.5 sm:w-1/3 min-w-[200px]">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                      Word
                    </span>
                    <strong className="text-base sm:text-lg font-black text-white tracking-wide">
                      {word}
                    </strong>
                  </div>
                </div>

                {/* Candidate's Typed Sentence */}
                {isTypeMode ? (
                  <div className="flex-1 sm:px-4">
                    {hasSentence ? (
                      <p className="text-sm font-medium text-slate-200 leading-snug">
                        "{sentence}"
                      </p>
                    ) : (
                      <span className="italic text-xs text-rose-400/80 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Skipped (No sentence entered in 10s)
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-xs font-mono text-slate-500 sm:text-right">
                    Word #{idx + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Psychologists assess quick temperament, leadership orientation, and emotional resilience.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onRetry}
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry with new words</span>
            </button>
            <button
              onClick={onBackToDashboard}
              className="flex-1 sm:flex-none border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
