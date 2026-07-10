export interface Question {
  id: number;
  chapter: string;
  difficulty: 'low' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ExamHistory {
  id: string;
  date: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  timeTakenSeconds: number;
  totalQuestions: number;
  negativeMarks: number;
  obtainedMarks: number;
  difficultySelection: string;
}
