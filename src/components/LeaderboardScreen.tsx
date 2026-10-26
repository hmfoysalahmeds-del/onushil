import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Medal, 
  Calendar, 
  Clock, 
  Target, 
  Shield, 
  Sparkles, 
  RefreshCw,
  UserCheck,
  Settings,
  Flame,
  ArrowRight
} from 'lucide-react';
import { LeaderboardEntry, LeaderboardPeriod, UserProfile } from '../types';
import { fetchLeaderboardEntries } from '../lib/firebase';

interface LeaderboardScreenProps {
  userProfile: UserProfile | null;
  onOpenSettings: () => void;
  onStartExam: (type: 'verbal' | 'non-verbal') => void;
  onNavigateLogin: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  userProfile,
  onOpenSettings,
  onStartExam,
  onNavigateLogin,
}) => {
  const [testType, setTestType] = useState<'verbal' | 'non-verbal'>('verbal');
  const [period, setPeriod] = useState<LeaderboardPeriod>('week');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchLeaderboardEntries(testType, userProfile?.uid);
      setEntries(data);
    } catch (err) {
      console.warn('Failed to load leaderboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [testType, userProfile?.uid]);

  // Compute Period threshold
  const periodFilteredEntries = useMemo(() => {
    const now = Date.now();
    let threshold = 0;
    if (period === 'week') {
      threshold = now - 7 * 24 * 60 * 60 * 1000;
    } else if (period === 'month') {
      threshold = now - 30 * 24 * 60 * 60 * 1000;
    }

    return entries.filter((e) => {
      if (threshold === 0) return true;
      const t = new Date(e.createdAt).getTime();
      return t >= threshold;
    });
  }, [entries, period]);

  // Ranking calculation:
  // 1. Group by user UID, keeping only their BEST attempt in the selected period.
  //    Best attempt is determined by: highest score, then lower timeTaken, then earlier attempt.
  // 2. Rank all candidates.
  // 3. For public list, exclude hidden entries (unless user is the author, but public board shows non-hidden).
  const { rankedList, userRankInfo } = useMemo(() => {
    const userBestMap = new Map<string, LeaderboardEntry>();

    periodFilteredEntries.forEach((entry) => {
      const existing = userBestMap.get(entry.uid);
      if (!existing) {
        userBestMap.set(entry.uid, entry);
      } else {
        // Compare with existing best
        let isBetter = false;
        if (entry.score > existing.score) {
          isBetter = true;
        } else if (entry.score === existing.score) {
          if (entry.timeTaken < existing.timeTaken) {
            isBetter = true;
          } else if (entry.timeTaken === existing.timeTaken) {
            if (new Date(entry.createdAt).getTime() < new Date(existing.createdAt).getTime()) {
              isBetter = true;
            }
          }
        }

        if (isBetter) {
          userBestMap.set(entry.uid, entry);
        }
      }
    });

    // Array of each user's single best attempt
    const allBestAttempts = Array.from(userBestMap.values());

    // Sort all best attempts: highest score -> lower timeTaken -> earlier date
    allBestAttempts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (a.timeTaken !== b.timeTaken) {
        return a.timeTaken - b.timeTaken;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    // Calculate logged in user's rank (even if hidden)
    let userRank: number | null = null;
    let userEntry: LeaderboardEntry | null = null;

    if (userProfile) {
      const idx = allBestAttempts.findIndex((e) => e.uid === userProfile.uid);
      if (idx !== -1) {
        userRank = idx + 1;
        userEntry = allBestAttempts[idx];
      }
    }

    // Public list excludes hidden unless the entry is not hidden. Limit to top 50.
    const publicList = allBestAttempts.filter((e) => !e.hidden).slice(0, 50);

    return {
      rankedList: publicList,
      userRankInfo: {
        rank: userRank,
        entry: userEntry,
        totalParticipants: allBestAttempts.length,
      },
    };
  }, [periodFilteredEntries, userProfile]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8 py-4 text-slate-100 max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>ISSB Competitive Standings</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Candidate Leaderboard
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Top 50 best performances ranked by highest score, fastest completion time, and earliest attempt.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userProfile && (
              <button
                onClick={onOpenSettings}
                className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Privacy / Name</span>
              </button>
            )}

            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-center transition-all cursor-pointer shadow-sm disabled:opacity-50"
              title="Refresh Standings"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Top "Your Rank" Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-amber-950/50 flex-shrink-0">
              <Medal className="w-6 h-6" />
            </div>

            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Your Standings ({testType === 'verbal' ? 'Verbal IQ' : 'Non-Verbal IQ'} • {period === 'week' ? 'This week' : period === 'month' ? 'This month' : 'All time'})
              </span>

              {userProfile ? (
                userRankInfo.rank ? (
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">
                      Rank #{userRankInfo.rank}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      of {userRankInfo.totalParticipants} candidates
                    </span>
                    {userRankInfo.entry && (
                      <span className="text-xs font-bold text-emerald-400 ml-2 hidden md:inline-block">
                        • Best: {userRankInfo.entry.score}/{userRankInfo.entry.total} ({userRankInfo.entry.accuracy}% in {formatTime(userRankInfo.entry.timeTaken)})
                      </span>
                    )}
                    {!userProfile.showOnLeaderboard && (
                      <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold ml-1">
                        Private View
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-slate-300 mt-1">
                    Take a test to get ranked
                  </div>
                )
              ) : (
                <div className="text-sm font-semibold text-slate-300 mt-1">
                  Sign in with Google to view your rank
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userProfile ? (
              <button
                onClick={() => onStartExam(testType)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Take Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onNavigateLogin}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* 3. Filter Controls: Tabs & Period Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Test Type Tabs */}
        <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
          <button
            onClick={() => setTestType('verbal')}
            className={`px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
              testType === 'verbal'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Verbal IQ
          </button>
          <button
            onClick={() => setTestType('non-verbal')}
            className={`px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
              testType === 'non-verbal'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Non-Verbal IQ
          </button>
        </div>

        {/* Period Filter: This week, This month, All time */}
        <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
          <button
            onClick={() => setPeriod('week')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === 'week'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === 'month'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            This month
          </button>
          <button
            onClick={() => setPeriod('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === 'all'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All time
          </button>
        </div>
      </div>

      {/* 4. Leaderboard Table / Rankings List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
            <p className="text-sm font-semibold">Loading official rankings...</p>
          </div>
        ) : rankedList.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-amber-400">
              <Trophy className="w-8 h-8 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No scores yet. Be the first on the board.</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Complete a {testType === 'verbal' ? 'Verbal IQ' : 'Non-Verbal IQ'} test (answering at least 10 questions) to appear on the competitive ranking.
              </p>
            </div>
            <button
              onClick={() => onStartExam(testType)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-950/60 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Take {testType === 'verbal' ? 'Verbal' : 'Non-Verbal'} Drill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-850/80 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4 text-center">Score</th>
                  <th className="py-3.5 px-4 text-center">Accuracy</th>
                  <th className="py-3.5 px-4 text-center">Time Taken</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {rankedList.map((entry, index) => {
                  const rank = index + 1;
                  const isGold = rank === 1;
                  const isSilver = rank === 2;
                  const isBronze = rank === 3;
                  const isCurrentUser = userProfile && userProfile.uid === entry.uid;

                  let rowStyle = 'hover:bg-slate-850/50 transition-colors';
                  if (isGold) rowStyle = 'bg-amber-500/[0.07] border-l-4 border-l-amber-400 hover:bg-amber-500/[0.12]';
                  else if (isSilver) rowStyle = 'bg-slate-300/[0.05] border-l-4 border-l-slate-300 hover:bg-slate-300/[0.1]';
                  else if (isBronze) rowStyle = 'bg-amber-700/[0.06] border-l-4 border-l-amber-600 hover:bg-amber-700/[0.1]';
                  else if (isCurrentUser) rowStyle = 'bg-emerald-500/[0.08] hover:bg-emerald-500/[0.12]';

                  return (
                    <tr key={entry.id || `${entry.uid}-${index}`} className={rowStyle}>
                      {/* Rank Column */}
                      <td className="py-4 px-4 sm:px-6 text-center font-black">
                        {isGold ? (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-sm mx-auto shadow-md shadow-amber-950/50">
                            1
                          </div>
                        ) : isSilver ? (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-950 flex items-center justify-center font-black text-sm mx-auto shadow-md">
                            2
                          </div>
                        ) : isBronze ? (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center font-black text-sm mx-auto shadow-md">
                            3
                          </div>
                        ) : (
                          <span className="text-slate-400 font-bold text-sm">#{rank}</span>
                        )}
                      </td>

                      {/* Candidate Column: Photo & Display Name (NEVER email) */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {entry.photo ? (
                            <img
                              src={entry.photo}
                              alt={entry.displayName}
                              className={`w-9 h-9 rounded-xl object-cover ring-1 ${
                                isGold
                                  ? 'ring-amber-400'
                                  : isSilver
                                  ? 'ring-slate-300'
                                  : isBronze
                                  ? 'ring-amber-600'
                                  : 'ring-slate-700'
                              }`}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 font-black flex items-center justify-center text-xs ring-1 ring-slate-700">
                              {entry.displayName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="text-left">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm tracking-wide">
                                {entry.displayName}
                              </span>
                              {isCurrentUser && (
                                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-500/30">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {entry.setName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Score Column */}
                      <td className="py-4 px-4 text-center">
                        <span className={`font-black text-base ${
                          isGold ? 'text-amber-300' : 'text-emerald-400'
                        }`}>
                          {entry.score}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">/{entry.total}</span>
                      </td>

                      {/* Accuracy */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-teal-300">
                          {entry.accuracy}%
                        </span>
                      </td>

                      {/* Time Taken */}
                      <td className="py-4 px-4 text-center font-medium text-slate-300 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formatTime(entry.timeTaken)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 text-right font-medium text-slate-400 text-xs">
                        {formatDate(entry.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
