import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Clock, 
  Keyboard, 
  FileEdit, 
  AlertCircle, 
  ArrowLeft, 
  Play, 
  ShieldAlert, 
  CheckCircle2, 
  Settings,
  Sparkles
} from 'lucide-react';
import { WatMode, UserProfile } from '../types';
import { fetchActiveWatWords } from '../lib/firebase';

interface WatInstructionsScreenProps {
  userProfile: UserProfile | null;
  onStartWat: (mode: WatMode, selectedWords: string[]) => void;
  onBackToDashboard: () => void;
  onOpenAdmin?: () => void;
  lastAttemptWords?: string[];
}

export const WatInstructionsScreen: React.FC<WatInstructionsScreenProps> = ({
  userProfile,
  onStartWat,
  onBackToDashboard,
  onOpenAdmin,
  lastAttemptWords = [],
}) => {
  const [mode, setMode] = useState<WatMode>('type');
  const [loading, setLoading] = useState<boolean>(true);
  const [activeWordsCount, setActiveWordsCount] = useState<number>(0);
  const [preparedWords, setPreparedWords] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isAdmin = userProfile?.role === 'admin' || userProfile?.email === 'hmfoysalahmeds@gmail.com';

  useEffect(() => {
    async function loadWords() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const words = await fetchActiveWatWords();
        setActiveWordsCount(words.length);

        if (words.length < 80) {
          setErrorMsg('Not enough words yet. Please try again later.');
          setPreparedWords([]);
          return;
        }

        // Selection algorithm:
        // Pick 80 random active words with no repeats, shown in random order.
        // Prefer words that were not in user's previous attempt, then fill the rest randomly.
        const prevSet = new Set(lastAttemptWords.map((w) => w.toLowerCase()));
        const unseen = words.filter((w) => !prevSet.has(w.word.toLowerCase()));
        const seen = words.filter((w) => prevSet.has(w.word.toLowerCase()));

        // Fisher-Yates shuffle helper
        const shuffle = <T,>(arr: T[]): T[] => {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        };

        const shuffledUnseen = shuffle(unseen);
        const shuffledSeen = shuffle(seen);

        const chosen: string[] = [];
        // Take from unseen first
        for (const item of shuffledUnseen) {
          if (chosen.length < 80) {
            chosen.push(item.word);
          }
        }
        // If not enough unseen, fill remainder from seen
        if (chosen.length < 80) {
          for (const item of shuffledSeen) {
            if (chosen.length < 80 && !chosen.includes(item.word)) {
              chosen.push(item.word);
            }
          }
        }

        // Final shuffle of the 80 selected words
        const final80 = shuffle(chosen);
        setPreparedWords(final80);
      } catch (err) {
        console.warn('Failed to load active WAT words:', err);
        setErrorMsg('Unable to connect to the word bank. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadWords();
  }, [lastAttemptWords]);

  const handleStart = () => {
    if (preparedWords.length < 80) return;
    onStartWat(mode, preparedWords);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-8 text-slate-100 text-left">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {isAdmin && onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 text-xs font-black transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage WAT Words ({activeWordsCount})</span>
          </button>
        )}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Title Section */}
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>ISSB Psychological Battery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Word Association Test (WAT)
          </h1>
          <p className="text-emerald-400 font-bold text-sm sm:text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>80 Words • 10 Seconds Per Word • Total Time: 13 Min 20 Sec</span>
          </p>
        </div>

        {/* Instructions Briefing */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-300 uppercase tracking-wider">
            Standard Instructions
          </h2>
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 text-slate-300 text-sm leading-relaxed">
            <p className="font-semibold text-white">
              80 words will appear one at a time. Each word stays for 10 seconds. Write the first sentence that comes to your mind. You cannot go back. Total time: 13 min 20 sec.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc list-inside">
              <li>Keep your sentences short, spontaneous, and natural.</li>
              <li>Avoid clichés, memorized proverbs, or negative thoughts.</li>
              <li>There are no next, back, or skip buttons—the test advances automatically every 10 seconds.</li>
            </ul>
          </div>
        </div>

        {/* Mode Choice Selection */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-300 uppercase tracking-wider block">
            Choose Your Execution Mode:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mode 1: Type Mode */}
            <button
              type="button"
              onClick={() => setMode('type')}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                mode === 'type'
                  ? 'bg-purple-950/30 border-purple-500 shadow-lg shadow-purple-950/40 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${mode === 'type' ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-base text-white">Type Mode</h3>
                </div>
                {mode === 'type' && (
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                )}
              </div>
              <p className="text-xs leading-relaxed text-slate-400 mt-2">
                Type your sentences into a focused text box. Saved automatically after 10s, or press Enter to advance early.
              </p>
            </button>

            {/* Mode 2: Paper Mode */}
            <button
              type="button"
              onClick={() => setMode('paper')}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                mode === 'paper'
                  ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-950/40 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${mode === 'paper' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <FileEdit className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-base text-white">Paper Mode</h3>
                </div>
                {mode === 'paper' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <p className="text-xs leading-relaxed text-slate-400 mt-2">
                Simulate authentic ISSB examination room conditions. Words flash on screen while you write on physical paper.
              </p>
            </button>
          </div>
        </div>

        {/* Word Bank Status / Error message */}
        {errorMsg ? (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">{errorMsg}</p>
              {isAdmin && (
                <p className="text-xs text-amber-400/80">
                  As an admin, click "Manage WAT Words" above to import the 153 sample words into the bank.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Word bank loaded: <strong>{activeWordsCount}</strong> active words available</span>
            </div>
            {lastAttemptWords.length > 0 && (
              <span className="text-emerald-400 font-medium">Rotation prioritizes unseen words</span>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <motion.button
            whileHover={!loading && !errorMsg ? { scale: 1.02 } : {}}
            whileTap={!loading && !errorMsg ? { scale: 0.98 } : {}}
            type="button"
            disabled={loading || Boolean(errorMsg)}
            onClick={handleStart}
            className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${
              loading || Boolean(errorMsg)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-purple-950/60'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{loading ? 'Preparing Word Bank...' : 'Start WAT Simulation'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
