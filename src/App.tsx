import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { questionPool } from './data/questions';
import { Question, ExamHistory } from './types';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'login' | 'dashboard' | 'quiz' | 'results'>('landing');
  const [username, setUsername] = useState<string | null>(null);
  const [history, setHistory] = useState<ExamHistory[]>([]);
  
  // Test specific states
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [testDifficultySelection, setTestDifficultySelection] = useState<'balanced' | 'easy' | 'hard'>('balanced');
  const [testChapterSelection, setTestChapterSelection] = useState<string>('all');

  // Load username and exam history on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('onushil_user');
    if (cachedUser) {
      setUsername(cachedUser);
      setScreen('dashboard');
    }

    const cachedHistory = localStorage.getItem('onushil_history');
    if (cachedHistory) {
      try {
        setHistory(JSON.parse(cachedHistory));
      } catch (e) {
        console.error('Failed to parse history from local storage', e);
      }
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    localStorage.setItem('onushil_user', name);
    setUsername(name);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('onushil_user');
    setUsername(null);
    setScreen('landing');
  };

  const handleClearHistory = () => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে পরীক্ষার ইতিহাস মুছে ফেলতে চান?')) {
      localStorage.removeItem('onushil_history');
      setHistory([]);
    }
  };

  // Dynamic Shuffling and Extraction Engine
  const startExam = (difficultyMode: 'balanced' | 'easy' | 'hard', chapterFilter: string) => {
    setTestDifficultySelection(difficultyMode);
    setTestChapterSelection(chapterFilter);
    setUserAnswers({});

    // 1. Filter by chapter if requested
    let pool = [...questionPool];
    if (chapterFilter !== 'all') {
      pool = pool.filter((q) => q.chapter.includes(chapterFilter));
    }

    // 2. Shuffle helper
    const shuffle = <T,>(arr: T[]): T[] => {
      return [...arr].sort(() => 0.5 - Math.random());
    };

    // Split pool by difficulty
    const lowPool = shuffle(pool.filter((q) => q.difficulty === 'low'));
    const mediumPool = shuffle(pool.filter((q) => q.difficulty === 'medium'));
    const hardPool = shuffle(pool.filter((q) => q.difficulty === 'hard'));

    // Define target counts based on the mode
    let targetLow = 10;
    let targetMed = 10;
    let targetHard = 5;

    if (difficultyMode === 'easy') {
      targetLow = 15;
      targetMed = 10;
      targetHard = 0;
    } else if (difficultyMode === 'hard') {
      targetLow = 5;
      targetMed = 10;
      targetHard = 10;
    }

    const selected: Question[] = [];

    // Safe draw helper
    const draw = (subPool: Question[], count: number) => {
      const drawn = subPool.splice(0, count);
      selected.push(...drawn);
      return count - drawn.length; // Return slots remaining if pool was too small
    };

    // Draw from precise pools first
    let remainingLow = draw(lowPool, targetLow);
    let remainingMed = draw(mediumPool, targetMed);
    let remainingHard = draw(hardPool, targetHard);

    // If there's unfulfilled quota, fill using any leftovers from the filtered chapter pool
    let totalRemaining = remainingLow + remainingMed + remainingHard;
    if (totalRemaining > 0) {
      const leftoverPool = [...lowPool, ...mediumPool, ...hardPool];
      draw(shuffle(leftoverPool), totalRemaining);
    }

    // If the selected list is still less than 25 (e.g., chapter filter has fewer than 25 questions in total)
    if (selected.length < 25) {
      const fallbackPool = questionPool.filter(
        (qp) => !selected.some((s) => s.id === qp.id)
      );
      const needed = 25 - selected.length;
      draw(shuffle(fallbackPool), needed);
    }

    // Final shuffle to blend difficulties smoothly, slice exactly 25 questions
    const finalSet = shuffle(selected).slice(0, 25);
    setCurrentQuestions(finalSet);
    setScreen('quiz');
  };

  const handleExamSubmit = (answers: Record<number, number>) => {
    setUserAnswers(answers);

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

    // Create history entry
    const newHistoryEntry: ExamHistory = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      date: new Date().toISOString(),
      score: correct,
      correctAnswers: correct,
      wrongAnswers: wrong,
      unanswered: unanswered,
      timeTakenSeconds: 0, // Placeholder
      totalQuestions: currentQuestions.length,
      negativeMarks: negativeMarks,
      obtainedMarks: obtainedMarks,
      difficultySelection: testDifficultySelection,
      chapterFilter: testChapterSelection,
    } as any; // Cast in case of property additions

    const updatedHistory = [newHistoryEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('onushil_history', JSON.stringify(updatedHistory));

    setScreen('results');
  };

  return (
    <div className="bg-[#e6f4f1]/30 min-h-screen font-sans antialiased text-slate-800 flex flex-col justify-between">
      <Navbar 
        username={username} 
        currentScreen={screen} 
        onLogout={handleLogout} 
        onNavigate={(targetScreen) => setScreen(targetScreen)} 
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {screen === 'landing' && (
          <LandingPage 
            onStartPracticing={() => {
              if (username) {
                setScreen('dashboard');
              } else {
                setScreen('login');
              }
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
            onExamSubmit={handleExamSubmit}
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            questions={currentQuestions}
            answers={userAnswers}
            onRestart={() => setScreen('dashboard')}
            onBack={() => setScreen('dashboard')}
          />
        )}
      </main>
    </div>
  );
}
