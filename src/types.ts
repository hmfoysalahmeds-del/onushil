export type IQTestType = 'verbal' | 'non-verbal';

export interface Question {
  id: number;
  testType?: IQTestType;
  category: 'verbal' | 'non-verbal' | 'mathematical' | 'logical';
  topic: string;
  difficulty: 'low' | 'medium' | 'hard';
  question: string;
  diagramType?: 'matrix-3x3' | 'matrix-2x2' | 'pattern-series' | 'shape-rotation' | 'odd-shape' | 'shape-analogy' | 'matrix' | 'series' | 'analogy' | string;
  diagramSvg?: string;
  imageUrl?: string;
  pageImageUrl?: string;
  matrixData?: {
    grid: string[][]; // 2x2 or 3x3 cells or shape identifiers
    ruleDescription?: string;
  };
  options: string[];
  optionSvgs?: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export type ExamMode = 
  | 'verbal-set-1' 
  | 'verbal-100' 
  | 'non-verbal-set-1'
  | 'non-verbal-50'
  | 'non-verbal-38' 
  | 'sprint-50' 
  | '50-sprint' 
  | '100-issb' 
  | 'topic-drill' 
  | 'rapid';

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
  mode: ExamMode;
  testType?: IQTestType;
  issbStatus: 'Outstanding' | 'Recommended' | 'Marginal / Borderline' | 'Not Recommended' | string;
  speedPerQuestion: number;
  topicBreakdown?: Record<string, { correct: number; total: number }>;
}
