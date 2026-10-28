import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar, ScreenType } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { WatInstructionsScreen } from './components/WatInstructionsScreen';
import { WatTestScreen } from './components/WatTestScreen';
import { WatReviewScreen } from './components/WatReviewScreen';
import { WatAdminModal } from './components/WatAdminModal';
import { generateISSBExam } from './data/questions';
import { Question, ExamHistory, ExamMode, UserProfile, WatAttempt, WatMode } from './types';
import { 
  auth, 
  syncUserProfile, 
  logOutUser, 
  fetchUserHistory, 
  saveExamResultToFirestore,
  fetchLeaderboardEntries,
  fetchUserWatHistory,
  saveWatAttempt,
  checkRedirectResult
} from './lib/firebase';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<ExamHistory[]>([]);
  const [watHistory, setWatHistory] = useState<WatAttempt[]>([]);
  const [bestRank, setBestRank] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWatAdminOpen, setIsWatAdminOpen] = useState(false);

  // Active WAT test states
  const [watTestWords, setWatTestWords] = useState<string[]>([]);
  const [watTestMode, setWatTestMode] = useState<WatMode>('type');
  const [activeWatAttempt, setActiveWatAttempt] = useState<WatAttempt | null>(null);
  
  // Current test state
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examMode, setExamMode] = useState<ExamMode>('100-issb');
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(30);
  const [lastExamTimeSeconds, setLastExamTimeSeconds] = useState<number>(1800);

  // Helper to calculate user's best rank across both categories
  const calculateBestRank = async (uid: string) => {
    try {
      const [verbalEntries, nonVerbalEntries] = await Promise.all([
        fetchLeaderboardEntries('verbal', uid),
        fetchLeaderboardEntries('non-verbal', uid),
      ]);

      const getRankForEntries = (entries: typeof verbalEntries) => {
        const userBestMap = new Map<string, typeof entries[0]>();
        entries.forEach((e) => {
          const ex = userBestMap.get(e.uid);
          if (!ex || e.score > ex.score || (e.score === ex.score && e.timeTaken < ex.timeTaken)) {
            userBestMap.set(e.uid, e);
          }
        });
        const sorted = Array.from(userBestMap.values()).sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          if (a.timeTaken !== b.timeTaken) return a.timeTaken - b.timeTaken;
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        const index = sorted.findIndex((e) => e.uid === uid);
        return index !== -1 ? index + 1 : null;
      };

      const vRank = getRankForEntries(verbalEntries);
      const nvRank = getRankForEntries(nonVerbalEntries);

      if (vRank !== null && nvRank !== null) {
        setBestRank(Math.min(vRank, nvRank));
      } else if (vRank !== null) {
        setBestRank(vRank);
      } else if (nvRank !== null) {
        setBestRank(nvRank);
      } else {
        setBestRank(null);
      }
    } catch (err) {
      console.warn('Failed to calculate best rank:', err);
    }
  };

  // Firebase Auth persistence & redirect result listener
  useEffect(() => {
    // 1. Process redirect sign-in result if returning from a page redirect
    checkRedirectResult()
      .then(async (user) => {
        if (user) {
          try {
            const profile = await syncUserProfile(user);
            setUserProfile(profile);
            const [cloudHistory, userWatHistory] = await Promise.all([
              fetchUserHistory(user.uid),
              fetchUserWatHistory(user.uid)
            ]);
            setHistory(cloudHistory);
            setWatHistory(userWatHistory);
            await calculateBestRank(user.uid);
            setScreen('dashboard');
          } catch (e) {
            console.error('Error handling redirect user sync:', e);
          }
        }
      })
      .catch((err) => {
        console.error('Redirect sign-in error:', err);
      });

    // 2. Auth state change listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await syncUserProfile(firebaseUser);
          setUserProfile(profile);

          // Fetch cloud history & WAT history concurrently
          const [cloudHistory, userWatHistory] = await Promise.all([
            fetchUserHistory(firebaseUser.uid),
            fetchUserWatHistory(firebaseUser.uid)
          ]);
          setHistory(cloudHistory);
          setWatHistory(userWatHistory);

          // Compute user's best rank
          await calculateBestRank(firebaseUser.uid);

          // If on login screen or first load with active session, redirect to dashboard
          setScreen((prev) => (prev === 'login' ? 'dashboard' : prev));
        } catch (error) {
          console.error('Error synchronizing candidate profile:', error);
        }
      } else {
        setUserProfile(null);
        setHistory([]);
        setWatHistory([]);
        setActiveWatAttempt(null);
        setBestRank(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = async (firebaseUser: any) => {
    try {
      const profile = await syncUserProfile(firebaseUser);
      setUserProfile(profile);
      const [cloudHistory, userWatHistory] = await Promise.all([
        fetchUserHistory(firebaseUser.uid),
        fetchUserWatHistory(firebaseUser.uid)
      ]);
      setHistory(cloudHistory);
      setWatHistory(userWatHistory);
      await calculateBestRank(firebaseUser.uid);
      setScreen('dashboard');
    } catch (e) {
      console.error('Login sync failure:', e);
      setScreen('dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
    } catch (e) {
      console.error('Logout error:', e);
    }
    setUserProfile(null);
    setHistory([]);
    setWatHistory([]);
    setActiveWatAttempt(null);
    setBestRank(null);
    setScreen('landing');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local session history view?')) {
      setHistory([]);
    }
  };

  // Launch fresh test from Unlimited Engine
  const startExam = (mode: ExamMode = 'verbal-set-1', topicFilter?: string) => {
    // If not authenticated, require login first
    if (!userProfile) {
      setScreen('login');
      return;
    }

    if (userProfile.blocked) {
      alert('Your candidate account is currently blocked from starting exams. Please contact administration.');
      return;
    }

    setExamMode(mode);
    setUserAnswers({});

    let duration = 30; // 30 minutes for 100 questions
    if (mode === 'non-verbal-50' || mode === 'non-verbal-set-1' || mode === 'non-verbal-38') {
      duration = 26; // 26 minutes for non-verbal questions
    } else if (mode === '50-sprint' || mode === 'sprint-50') {
      duration = 15;
    } else if (mode === 'topic-drill') {
      duration = 10;
    } else if (mode === 'rapid') {
      duration = 15;
    }

    setExamDurationMinutes(duration);

    // Call procedural & curated generator
    const examQuestions = generateISSBExam(mode, topicFilter);
    setCurrentQuestions(examQuestions);
    setScreen('quiz');
  };

  const handleExamSubmit = async (answers: Record<number, number>, timeTakenSeconds: number) => {
    setUserAnswers(answers);
    setLastExamTimeSeconds(timeTakenSeconds);

    // Compute Metrics
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    currentQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns === undefined) {
        unanswered++;
      } else if (userAns === q.correctAnswerIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const correctMarks = correct * 1.0;
    const negativeMarks = wrong * 0.25;
    const obtainedMarks = Math.max(0, correctMarks - negativeMarks);

    // Determine ISSB Standing
    const percentage = Math.round((correct / currentQuestions.length) * 100);
    let issbStatus: ExamHistory['issbStatus'] = 'Not Recommended';
    if (percentage >= 75) {
      issbStatus = 'Outstanding';
    } else if (percentage >= 60) {
      issbStatus = 'Recommended';
    } else if (percentage >= 45) {
      issbStatus = 'Marginal / Borderline';
    }

    const speedPerQuestion = answers && Object.keys(answers).length > 0
      ? Number((timeTakenSeconds / Object.keys(answers).length).toFixed(1))
      : 0;

    const newHistoryEntry: ExamHistory = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      date: new Date().toISOString(),
      score: correct,
      correctAnswers: correct,
      wrongAnswers: wrong,
      unanswered: unanswered,
      timeTakenSeconds,
      totalQuestions: currentQuestions.length,
      negativeMarks,
      obtainedMarks,
      mode: examMode,
      issbStatus,
      speedPerQuestion
    };

    const updatedHistory = [newHistoryEntry, ...history];
    setHistory(updatedHistory);

    // Persist to Firestore and post to Leaderboard (if answered >= 10)
    if (userProfile) {
      const answeredCount = correct + wrong;
      await saveExamResultToFirestore(userProfile, newHistoryEntry, answeredCount);
      // Recompute rank
      await calculateBestRank(userProfile.uid);
    }

    setScreen('results');
  };

  const isAdmin = userProfile ? (userProfile.role === 'admin' || userProfile.email === 'hmfoysalahmeds@gmail.com') : false;

  const handleStartWat = () => {
    if (!userProfile) {
      setScreen('login');
      return;
    }
    if (userProfile.blocked) {
      alert('Your candidate account is currently blocked from taking tests. Please contact administration.');
      return;
    }
    setScreen('wat-instructions');
  };

  const handleBeginWatTest = (mode: WatMode, selectedWords: string[]) => {
    setWatTestMode(mode);
    setWatTestWords(selectedWords);
    setScreen('wat-test');
  };

  const handleCompleteWatTest = async (attempt: WatAttempt) => {
    try {
      await saveWatAttempt(attempt);
    } catch (e) {
      console.error('Failed to save WAT attempt to cloud:', e);
    }
    setWatHistory((prev) => [attempt, ...prev]);
    setActiveWatAttempt(attempt);
    setScreen('wat-review');
  };

  const handleViewWatReview = (attempt: WatAttempt) => {
    setActiveWatAttempt(attempt);
    setScreen('wat-review');
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans antialiased text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Navbar 
        userProfile={userProfile} 
        currentScreen={screen} 
        onLogout={handleLogout} 
        onNavigate={(targetScreen) => setScreen(targetScreen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAdmin={isAdmin}
        onOpenWatAdmin={() => setIsWatAdminOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">
        {screen === 'landing' && (
          <LandingPage 
            onStartPracticing={() => {
              if (userProfile) {
                setScreen('dashboard');
              } else {
                setScreen('login');
              }
            }}
            onStartNonVerbal={() => {
              if (userProfile) {
                startExam('non-verbal-set-1');
              } else {
                setScreen('login');
              }
            }}
            onStartWat={handleStartWat}
            username={userProfile ? userProfile.name : null}
          />
        )}

        {screen === 'login' && (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}

        {screen === 'leaderboard' && (
          <LeaderboardScreen
            userProfile={userProfile}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onStartExam={(type) => {
              if (type === 'verbal') startExam('verbal-set-1');
              else startExam('non-verbal-set-1');
            }}
            onNavigateLogin={() => setScreen('login')}
          />
        )}

        {screen === 'dashboard' && userProfile && (
          <DashboardScreen
            username={userProfile.displayName || userProfile.name}
            history={history}
            bestRank={bestRank}
            isBlocked={userProfile.blocked}
            onStartExam={startExam}
            onClearHistory={handleClearHistory}
            onViewLeaderboard={() => setScreen('leaderboard')}
            onStartWat={handleStartWat}
            watHistory={watHistory}
            onViewWatReview={handleViewWatReview}
            isAdmin={isAdmin}
            onOpenWatAdmin={() => setIsWatAdminOpen(true)}
          />
        )}

        {screen === 'wat-instructions' && userProfile && (
          <WatInstructionsScreen
            userProfile={userProfile}
            previousAttempts={watHistory}
            onStartTest={handleBeginWatTest}
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'wat-test' && userProfile && (
          <WatTestScreen
            userProfile={userProfile}
            words={watTestWords}
            mode={watTestMode}
            onFinish={handleCompleteWatTest}
            onExitToDashboard={() => setScreen('dashboard')}
          />
        )}

        {screen === 'wat-review' && activeWatAttempt && (
          <WatReviewScreen
            attempt={activeWatAttempt}
            onRetry={() => setScreen('wat-instructions')}
            onBackToDashboard={() => setScreen('dashboard')}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            questions={currentQuestions}
            durationMinutes={examDurationMinutes}
            onExamSubmit={handleExamSubmit}
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            questions={currentQuestions}
            answers={userAnswers}
            timeTakenSeconds={lastExamTimeSeconds}
            onRestart={() => startExam('100-issb', 'all')}
            onBack={() => setScreen('dashboard')}
          />
        )}
      </main>

      {/* Profile & Privacy Settings Modal */}
      {userProfile && (
        <ProfileSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userProfile={userProfile}
          onProfileUpdated={(updated) => {
            setUserProfile(updated);
            if (userProfile) {
              calculateBestRank(userProfile.uid);
            }
          }}
        />
      )}

      {/* WAT Admin Word Bank Modal */}
      {isAdmin && (
        <WatAdminModal
          isOpen={isWatAdminOpen}
          onClose={() => setIsWatAdminOpen(false)}
        />
      )}
    </div>
  );
}
