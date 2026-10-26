import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { generateISSBExam } from './data/questions';
import { Question, ExamHistory, ExamMode } from './types';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'login' | 'dashboard' | 'quiz' | 'results'>('landing');
  const [username, setUsername] = useState<string | null>(null);
  const [history, setHistory] = useState<ExamHistory[]>([]);
  
  // Current test state
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examMode, setExamMode] = useState<ExamMode>('100-issb');
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(30);
  const [lastExamTimeSeconds, setLastExamTimeSeconds] = useState<number>(1800);

  // Load candidate & history on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('b20issb_user');
    if (cachedUser) {
      setUsername(cachedUser);
      setScreen('dashboard');
    }

    const cachedHistory = localStorage.getItem('b20issb_history');
    if (cachedHistory) {
      try {
        setHistory(JSON.parse(cachedHistory));
      } catch (e) {
        console.error('Failed to parse history from local storage', e);
      }
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    localStorage.setItem('b20issb_user', name);
    setUsername(name);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('b20issb_user');
    setUsername(null);
    setScreen('landing');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your ISSB examination log?')) {
      localStorage.removeItem('b20issb_history');
      setHistory([]);
    }
  };

  // Launch fresh test from Unlimited Engine
  const startExam = (mode: ExamMode = 'verbal-set-1', topicFilter?: string) => {
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

  const handleExamSubmit = (answers: Record<number, number>, timeTakenSeconds: number) => {
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

    // Determine ISSB Standing (Score and accuracy based)
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
    localStorage.setItem('b20issb_history', JSON.stringify(updatedHistory));

    setScreen('results');
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans antialiased text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Navbar 
        username={username} 
        currentScreen={screen} 
        onLogout={handleLogout} 
        onNavigate={(targetScreen) => setScreen(targetScreen)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">
        {screen === 'landing' && (
          <LandingPage 
            onStartPracticing={() => {
              if (username) {
                setScreen('dashboard');
              } else {
                setScreen('login');
              }
            }}
            onStartNonVerbal={() => {
              startExam('non-verbal-set-1');
            }}
            username={username}
          />
        )}

        {screen === 'login' && (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}

        {screen === 'dashboard' && username && (
          <DashboardScreen
            username={username}
            history={history}
            onStartExam={startExam}
            onClearHistory={handleClearHistory}
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
    </div>
  );
}
