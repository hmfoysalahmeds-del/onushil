import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Clock, Keyboard, FileEdit } from 'lucide-react';
import { WatMode, WatAttempt, UserProfile } from '../types';
import { saveWatAttempt } from '../lib/firebase';

interface WatTestScreenProps {
  userProfile: UserProfile;
  words: string[]; // Exactly 80 words
  mode: WatMode;
  onFinishTest: (attempt: WatAttempt) => void;
  onAbort?: () => void;
}

export const WatTestScreen: React.FC<WatTestScreenProps> = ({
  userProfile,
  words,
  mode,
  onFinishTest,
}) => {
  // Phase 1: 'ready' (3-second countdown), Phase 2: 'testing'
  const [phase, setPhase] = useState<'ready' | 'testing'>('ready');
  const [readyCount, setReadyCount] = useState<number>(3);

  // Active word index (0 to 79)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Time remaining on current word (10.0s down to 0s, updated every 100ms for smooth progress)
  const [timeLeftMs, setTimeLeftMs] = useState<number>(10000);

  // User responses
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const sentencesRef = useRef<string[]>(new Array(words.length).fill(''));

  // Test session state
  const attemptIdRef = useRef<string>(`wat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
  const isFinishedRef = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to save attempt (complete or incomplete)
  const persistAttempt = async (isCompleted: boolean) => {
    if (isFinishedRef.current && !isCompleted) return;

    // Count non-empty answers
    const answeredCount = sentencesRef.current.filter((s) => s.trim().length > 0).length;

    const attempt: WatAttempt = {
      id: attemptIdRef.current,
      uid: userProfile.uid,
      mode,
      date: new Date().toISOString(),
      words,
      sentences: [...sentencesRef.current],
      answeredCount,
      completed: isCompleted,
      totalWords: words.length,
    };

    try {
      await saveWatAttempt(attempt);
    } catch (err) {
      console.warn('Failed to persist WAT attempt:', err);
    }

    return attempt;
  };

  // 1. Refresh safety: beforeunload listener to persist partial answers if tab/window closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isFinishedRef.current) {
        // Save latest typed sentence into ref before exit
        if (mode === 'type' && currentSentence.trim()) {
          sentencesRef.current[currentIndex] = currentSentence.trim();
        }
        persistAttempt(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // If component unmounts mid-test without finish
      if (!isFinishedRef.current) {
        persistAttempt(false);
      }
    };
  }, [currentIndex, currentSentence, mode]);

  // 2. 3-Second "Get Ready" countdown
  useEffect(() => {
    if (phase !== 'ready') return;

    if (readyCount > 1) {
      const timer = setTimeout(() => {
        setReadyCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('testing');
        setTimeLeftMs(10000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, readyCount]);

  // 3. Word timer (10 seconds per word)
  useEffect(() => {
    if (phase !== 'testing' || isFinishedRef.current) return;

    // Auto-focus input on word change in type mode
    if (mode === 'type') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }

    const interval = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (prev <= 100) {
          // Time expired for this word
          handleAdvanceWord(false);
          return 10000;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase, currentIndex, mode]);

  // Advance to next word or complete test
  const handleAdvanceWord = (fromEnterKey = false) => {
    // Save current sentence
    if (mode === 'type') {
      sentencesRef.current[currentIndex] = currentSentence.trim();
      setCurrentSentence('');
    }

    if (currentIndex + 1 < words.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeftMs(10000);
    } else {
      // 80th word finished!
      isFinishedRef.current = true;
      persistAttempt(true).then((finalAttempt) => {
        if (finalAttempt) {
          onFinishTest(finalAttempt);
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdvanceWord(true);
    }
  };

  // Progress fraction for 10-second countdown (1 down to 0)
  const timerFraction = Math.max(0, timeLeftMs / 10000);
  const secondsDisplay = Math.ceil(timeLeftMs / 1000);

  // Ready Phase Screen
  if (phase === 'ready') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          key={readyCount}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>WAT Simulation Initializing</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-300">
            Get Ready
          </h2>

          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-purple-500/30 bg-slate-900 flex items-center justify-center mx-auto shadow-2xl shadow-purple-950/80">
            <span className="text-6xl sm:text-7xl font-black text-purple-400 font-mono">
              {readyCount}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            {mode === 'type' ? 'Place your fingers on keyboard. First word is incoming.' : 'Hold your pen ready. First word is incoming.'}
          </p>
        </motion.div>
      </div>
    );
  }

  const currentWord = words[currentIndex] || '';

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 flex flex-col justify-between min-h-[calc(100vh-10rem)] text-slate-100">
      {/* Top HUD: Counter & Mode badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400">
            Word
          </span>
          <span className="text-base sm:text-lg font-black text-purple-400 font-mono">
            {currentIndex + 1}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-500">
            of {words.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-bold text-slate-300">
            {mode === 'type' ? (
              <>
                <Keyboard className="w-3 h-3 text-purple-400" />
                <span>Type Mode</span>
              </>
            ) : (
              <>
                <FileEdit className="w-3 h-3 text-emerald-400" />
                <span>Paper Mode</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{secondsDisplay}s</span>
          </div>
        </div>
      </div>

      {/* 10-Second Countdown Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-4 relative">
        <div
          className={`h-full transition-all duration-100 ease-linear ${
            secondsDisplay <= 3 ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
          }`}
          style={{ width: `${timerFraction * 100}%` }}
        ></div>
      </div>

      {/* Main Flash Area: The Word Display */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-12 space-y-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Stimulus Word
            </span>
            <div className="px-6 py-4 rounded-3xl bg-slate-900/90 border-2 border-slate-800 shadow-2xl shadow-purple-950/30 inline-block min-w-[280px] sm:min-w-[360px]">
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                {currentWord}
              </h1>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Input Box for Type Mode */}
        {mode === 'type' && (
          <div className="w-full max-w-lg mx-auto space-y-2 text-left">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Your spontaneous sentence:
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={currentSentence}
                onChange={(e) => setCurrentSentence(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your sentence here..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                autoFocus
                className="w-full bg-slate-950 border-2 border-purple-500/40 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-white font-medium text-base sm:text-lg px-4 py-3.5 rounded-2xl shadow-inner transition-all placeholder:text-slate-600"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Press <strong className="text-slate-300">Enter</strong> to advance early</span>
              <span>Auto-saves in <strong>{secondsDisplay}s</strong></span>
            </div>
          </div>
        )}

        {/* Paper Mode guidance */}
        {mode === 'paper' && (
          <div className="text-xs sm:text-sm text-slate-400 bg-slate-900/60 border border-slate-800 px-6 py-3 rounded-2xl">
            Write your sentence for <strong>"{currentWord}"</strong> on your paper sheet now.
          </div>
        )}
      </div>

      {/* Bottom HUD: Progress Dots / Overview */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>No skip or back permitted</span>
        <span>
          Auto-advancing: <strong className="text-purple-400 font-mono">{secondsDisplay}s</strong>
        </span>
      </div>
    </div>
  );
};
