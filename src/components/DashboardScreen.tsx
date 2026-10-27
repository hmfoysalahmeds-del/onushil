import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Clock, 
  Shield, 
  Zap, 
  Target, 
  Layers, 
  Grid,
  CheckCircle, 
  Flame, 
  BookOpen, 
  Trash2, 
  Compass, 
  Sparkles,
  BarChart3,
  HelpCircle,
  Shapes
} from 'lucide-react';
import { ExamHistory, ExamMode, WatAttempt } from '../types';
import { ISSB_TOPICS } from '../data/questions';

interface DashboardScreenProps {
  username: string;
  history: ExamHistory[];
  bestRank?: number | null;
  isBlocked?: boolean;
  onStartExam: (mode: ExamMode, topicFilter?: string) => void;
  onClearHistory: () => void;
  onViewLeaderboard?: () => void;
  onStartWat: () => void;
  watHistory?: WatAttempt[];
  onViewWatReview?: (attempt: WatAttempt) => void;
  isAdmin?: boolean;
  onOpenWatAdmin?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  username,
  history,
  bestRank,
  isBlocked = false,
  onStartExam,
  onClearHistory,
  onViewLeaderboard,
  onStartWat,
  watHistory = [],
  onViewWatReview,
  isAdmin = false,
  onOpenWatAdmin,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'verbal' | 'non-verbal' | 'wat' | 'modes' | 'topics' | 'history'>('verbal');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'iq' | 'wat'>('all');

  // Compute Cadet stats
  const totalTests = history.length;
  const bestScore = history.reduce((max, h) => Math.max(max, h.obtainedMarks || h.score), 0);
  const totalCorrect = history.reduce((acc, h) => acc + h.correctAnswers, 0);
  const totalQuestionsAnswered = history.reduce((acc, h) => acc + (h.correctAnswers + h.wrongAnswers), 0);
  const avgAccuracy = totalQuestionsAnswered > 0 ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) : 0;
  
  const topScoringCount = history.filter(h => {
    const total = h.totalQuestions || 100;
    return ((h.obtainedMarks || h.score) / total) >= 0.75;
  }).length;

  return (
    <div className="space-y-8 py-2 text-slate-100">
      {/* 1. HERO BANNER: b20ISSB TIME-LOCKED DRILL CENTER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>b20ISSB • Unlimited IQ Practice</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Candidate <span className="text-emerald-400">{username}</span>, Choose Your Exam
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Master the ISSB-style intelligence tests. Choose between <strong className="text-white">Verbal IQ (100 Questions in 30 Min)</strong> and <strong className="text-white">Non-Verbal IQ (50 Questions in 26 Min)</strong> with strict time-locked countdowns.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-4 h-4 text-emerald-400" /> Verbal: 100 Q • 30 Min
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-4 h-4 text-amber-400" /> Non-Verbal: 50 Questions • 26 Min
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <Sparkles className="w-4 h-4 text-teal-400" /> Unlimited Practice
              </span>
            </div>
          </div>

          {/* Primary Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartExam('verbal-set-1')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/70 transition-all flex items-center justify-between gap-4 text-left cursor-pointer border border-emerald-400/30 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="block text-sm font-black leading-tight">Start Verbal Set 1 (Set-A)</span>
                  <span className="block text-[10px] font-semibold text-emerald-100 uppercase tracking-wider">100 Q • 30 Min</span>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartExam('verbal-set-2')}
              className="bg-slate-800 hover:bg-slate-750 text-white font-black px-6 py-3.5 rounded-2xl transition-all border border-teal-500/40 hover:border-teal-400 shadow-lg flex items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="block text-sm font-black leading-tight">Start Verbal Set 2 (Set-B)</span>
                  <span className="block text-[10px] font-semibold text-teal-300 uppercase tracking-wider">100 Q • 30 Min</span>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartExam('non-verbal-set-1')}
              className="bg-slate-800 hover:bg-slate-750 text-white font-black px-6 py-3.5 rounded-2xl transition-all border border-amber-500/40 hover:border-amber-400 shadow-lg flex items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Shapes className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="block text-sm font-black leading-tight">Start Non-Verbal Set 1</span>
                  <span className="block text-[10px] font-semibold text-amber-400 uppercase tracking-wider">38 Q • 26 Min</span>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Quick Candidate Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Drills Completed</span>
            <span className="text-xl sm:text-2xl font-black text-white">{totalTests}</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Top Score</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">{bestScore}</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Accuracy</span>
            <span className="text-xl sm:text-2xl font-black text-teal-300">{avgAccuracy}%</span>
          </div>

          <div 
            onClick={onViewLeaderboard}
            className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-left cursor-pointer hover:border-amber-500/40 transition-colors group"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 group-hover:text-amber-300 transition-colors">
              Best Rank
            </span>
            {bestRank ? (
              <span className="text-xl sm:text-2xl font-black text-amber-400">#{bestRank}</span>
            ) : totalTests === 0 ? (
              <span className="text-sm font-bold text-slate-400">No scores yet</span>
            ) : (
              <span className="text-sm font-bold text-slate-400">Unranked</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. MODE NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('verbal')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'verbal'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Verbal IQ (100 Q • 30 Min)</span>
        </button>

        <button
          onClick={() => setActiveTab('non-verbal')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'non-verbal'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Shapes className="w-4 h-4" />
          <span>Non-Verbal IQ (50 Q • 26 Min)</span>
        </button>

        <button
          onClick={() => setActiveTab('modes')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'modes'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Speed Sprints & Mixed</span>
        </button>

        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'topics'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Category Drills</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Test History ({history.length})</span>
        </button>
      </div>

      {/* TAB 1: VERBAL IQ TESTS */}
      {activeTab === 'verbal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: ISSB-style Verbal MCQ Set 1 (Set-A) */}
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-colors">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl shadow">
              ISSB-style Set-A
            </div>

            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Verbal MCQ Set 1 (Set-A)</h3>
                <span className="text-xs font-bold text-emerald-400">100 Questions • 30 Minutes</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The authentic 100-question verbal test transcribed directly from ISSB candidate examination papers. Includes 5 options, (a) to (e), jumbled letters, number & letter series, analogies, defense ranks, and odd man out.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Questions Count:</span>
                  <strong className="text-white">100 Questions (5 Options)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Allowed:</span>
                  <strong className="text-emerald-400">30:00 Min (Time-Locked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pace Target:</span>
                  <strong className="text-slate-300">18 Seconds / Item</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam('verbal-set-1')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Verbal Set 1 (Set-A)</span>
            </button>
          </div>

          {/* Card 2: ISSB-style Verbal MCQ Set 2 (Set-B) */}
          <div className="bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-teal-400 transition-colors">
            <div className="absolute top-0 right-0 bg-teal-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl shadow">
              ISSB-style Set-B
            </div>

            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Verbal MCQ Set 2 (Set-B)</h3>
                <span className="text-xs font-bold text-teal-400">100 Questions • 30 Minutes</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Authentic 100-question Verbal Intelligence Set-B with official solution key. Includes jumbled anagrams (Watch, Volga, Parker, Budapest, Melbourne), antonyms, interleaved numerical series, and military rank hierarchies.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Questions Count:</span>
                  <strong className="text-white">100 Questions (5 Options)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Allowed:</span>
                  <strong className="text-teal-400">30:00 Min (Time-Locked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pace Target:</span>
                  <strong className="text-slate-300">18 Seconds / Item</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam('verbal-set-2')}
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-teal-950/40"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Verbal Set 2 (Set-B)</span>
            </button>
          </div>

          {/* Card 3: Unlimited Verbal IQ Generator */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-colors">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Unlimited Verbal IQ Engine</h3>
                <span className="text-xs font-bold text-indigo-400">100 Questions • 30 Minutes</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Generate an infinite pool of unique 100-question verbal drill sets. Procedurally generated series, cryptic coding puzzles, kinship relations, and situational logical deductions to build reflex speed under pressure.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Questions Count:</span>
                  <strong className="text-white">100 Questions</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Allowed:</span>
                  <strong className="text-indigo-400">30:00 Minutes (Time-Locked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Engine:</span>
                  <strong className="text-slate-300">Infinite Shuffled Sets</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam('verbal-100')}
              className="w-full bg-slate-800 hover:bg-slate-750 text-white font-black py-3.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-indigo-400" />
              <span>Launch Unlimited Verbal Drill</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: NON-VERBAL PROGRESSIVE MATRICES */}
      {activeTab === 'non-verbal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Authentic ISSB Non-Verbal Set 1 (Set-A) */}
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-colors">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl shadow">
              ISSB-style Set-A
            </div>

            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Shapes className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Non-Verbal MCQ Set 1 (Set-A)</h3>
                <span className="text-xs font-bold text-amber-400">Authentic 38 Questions (Patterns) • 26 Minutes Time-Locked</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The authentic Non-Verbal IQ test transcribed directly from ISSB examination test papers. Solve 38 progressive matrices, shape analogies, mesh lattices, and rotational pattern puzzles with high-resolution diagrams and full solution logic.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Pattern Count:</span>
                  <strong className="text-white">38 Authentic Patterns (Set-A)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Allowed:</span>
                  <strong className="text-amber-400">26:00 Minutes (Time-Locked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pace Requirement:</span>
                  <strong className="text-slate-300">~41 Seconds / Pattern</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam('non-verbal-set-1')}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-amber-950/40"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Non-Verbal Set 1 (38 Q • 26 Min)</span>
            </button>
          </div>

          {/* Card 2: 50-Question Full Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-colors">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Non-Verbal IQ (50 Q • 26 Min)</h3>
                <span className="text-xs font-bold text-teal-400">50 Questions • 26 Minutes Time-Locked</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Experience high-speed pattern recognition with 50 questions in 26 minutes (~31.2 seconds per pattern). Includes all 38 authentic patterns from Set-A supplemented with 12 advanced progressive matrix puzzles.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Pattern Count:</span>
                  <strong className="text-white">50 Questions (Set-A + Progressive)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Allowed:</span>
                  <strong className="text-teal-400">26:00 Minutes (Time-Locked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pace Requirement:</span>
                  <strong className="text-slate-300">~31.2 Seconds / Pattern</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartExam('non-verbal-50')}
              className="w-full bg-slate-800 hover:bg-slate-750 text-white font-black py-4 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-amber-400" />
              <span>Launch 50-Question Drill (50 Q • 26 Min)</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ALL PRACTICE MODES & SPRINTS */}
      {activeTab === 'modes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 100 IQ ISSB Full Simulation */}
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-colors">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Full Verbal Set 1</h3>
                <span className="text-xs font-bold text-emerald-400">100 Questions • 30 Minutes</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The ISSB-style Verbal Set 1. 100 questions with strict 30-minute auto-submit.
              </p>
            </div>

            <button
              onClick={() => onStartExam('verbal-set-1')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Verbal Set 1</span>
            </button>
          </div>

          {/* Card 2: 50 IQ Sprint Drill */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-colors">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">50 IQ Speed Blitz</h3>
                <span className="text-xs font-bold text-amber-400">50 Questions • 15 Minutes</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                High-intensity pace drill. Ideal when you want to sharpen your decision speed (18 seconds/question target) in half the time.
              </p>
            </div>

            <button
              onClick={() => onStartExam('50-sprint', 'all')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-3.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-amber-400" />
              <span>Launch 50 IQ Sprint</span>
            </button>
          </div>

          {/* Card 3: Rapid Practice */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-colors">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Rapid Drill</h3>
                <span className="text-xs font-bold text-teal-400">25 Questions • Relaxed Drill</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Continuous drill with full step-by-step logic breakdown to master trick patterns before taking the time-locked exam.
              </p>
            </div>

            <button
              onClick={() => onStartExam('rapid', 'all')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-3.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-teal-400" />
              <span>Launch Rapid Drill</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: TOPIC SPECIFIC DRILLS */}
      {activeTab === 'topics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left">
            <h3 className="text-base font-black text-white mb-2">Select a Focus Topic</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Hone specific competencies with 30-question targeted drills (10 minutes) before challenging the full 100-question or 50-question non-verbal time-locked exams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ISSB_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => onStartExam('topic-drill', topic.id)}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-emerald-500/60 hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                      {topic.name}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 block">
                      {topic.count}
                    </span>
                  </div>
                  <Play className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 fill-current transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TEST HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-black text-white">Cadet Examination Log</h3>
              <p className="text-xs text-slate-400">All completed ISSB screening evaluations and performance records.</p>
            </div>

            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-300">No examination records logged yet.</p>
              <p className="text-xs text-slate-500">Complete your first 100 IQ or 50-Question Non-Verbal test to see detailed ratings and accuracy metrics here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        record.issbStatus === 'Outstanding'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : record.issbStatus === 'Recommended'
                          ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                          : record.issbStatus === 'Marginal / Borderline'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {record.issbStatus}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {record.mode === 'verbal-set-1' ? 'Verbal Set 1' : (record.mode === 'non-verbal-50' || record.mode === 'non-verbal-38') ? 'Non-Verbal IQ (50 Q)' : record.mode}
                      </span>
                      <span className="text-xs text-slate-500">• {new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Score: <strong className="text-white">{record.obtainedMarks || record.score}</strong> / {record.totalQuestions} • Correct: <strong className="text-emerald-400">{record.correctAnswers}</strong> • Wrong: <strong className="text-rose-400">{record.wrongAnswers}</strong>
                    </div>
                  </div>

                  <div className="text-right sm:text-right flex items-center justify-between sm:justify-end gap-4 text-xs font-bold text-slate-400">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Speed</span>
                      <span className="text-white">{record.speedPerQuestion}s / item</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Duration</span>
                      <span className="text-white">{Math.floor(record.timeTakenSeconds / 60)}m {record.timeTakenSeconds % 60}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
