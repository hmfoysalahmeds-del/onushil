import { Question } from '../types';
import { nonVerbalSetA } from './nonVerbalSetA';

export { nonVerbalSetA };

// The authentic 38-question ISSB paper test from Set-A
export const nonVerbal38Questions: Question[] = nonVerbalSetA;

// 12 Supplementary Progressive Matrix questions to complete the 50-question format
const supplementary12Questions: Question[] = [
  {
    id: 39,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Nested Polygons',
    difficulty: 'medium',
    question: 'Progressive Pattern 39: Nested polygon sequence: Triangle inside Square -> Square inside Pentagon -> Pentagon inside Hexagon. What comes next?',
    diagramType: 'pattern-series',
    options: [
      'Hexagon inside Heptagon (7 sides)',
      'Octagon inside Heptagon',
      'Circle inside Hexagon',
      'Triangle inside Octagon',
      'Square inside Hexagon'
    ],
    optionSvgs: [
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polygon points="40,12 66,24 74,51 55,73 25,73 6,51 14,24" fill="none" stroke="#10b981" stroke-width="2"/><polygon points="40,24 58,34 58,56 40,66 22,56 22,34" fill="none" stroke="#10b981" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><circle cx="40" cy="40" r="28" fill="none" stroke="#94a3b8" stroke-width="2"/><polygon points="40,25 55,55 25,55" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="18" y="18" width="44" height="44" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="40" cy="40" r="14" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polygon points="40,15 65,65 15,65" fill="none" stroke="#94a3b8" stroke-width="2"/><rect x="30" y="35" width="20" height="20" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><circle cx="40" cy="40" r="26" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="40" cy="40" r="14" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`
    ],
    correctAnswerIndex: 0,
    explanation: 'At each progression step, inner polygon sides = n and outer polygon sides = n+1. After Pentagon (5) inside Hexagon (6), next must be Hexagon (6) inside Heptagon (7).'
  },
  {
    id: 40,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Progressive Matrices',
    difficulty: 'medium',
    question: 'Progressive Matrix 40: Row 1 is shaded with horizontal hatch lines; Row 2 with vertical hatch lines; Row 3 with crosshatch. If Col 1 has 1 bar, Col 2 has 2 bars, what does Col 3 have?',
    diagramType: 'matrix-3x3',
    options: ['3 crosshatched bars', '1 plain bar', '4 vertical bars', '2 horizontal bars', 'Empty grid'],
    correctAnswerIndex: 0,
    explanation: 'Row attribute sets the hatch texture (crosshatch in Row 3) while column attribute sets the bar count (1, 2, 3 bars). Col 3 in Row 3 requires 3 crosshatched bars.'
  },
  {
    id: 41,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Shape Rotation',
    difficulty: 'low',
    question: 'Progressive Pattern 41: An L-bracket rotates clockwise by 90° at each step: pointing Up-Right, Down-Right, Down-Left. What is the 4th position?',
    diagramType: 'pattern-series',
    options: [
      'Up-Left',
      'Down-Right',
      'Up-Right',
      'Straight Up',
      'Inverted T'
    ],
    optionSvgs: [
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polyline points="25,55 25,25 55,25" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polyline points="25,25 55,25 55,55" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polyline points="55,25 55,55 25,55" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polyline points="40,55 40,25 60,25" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><polyline points="25,40 55,40 40,40 40,20" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/></svg>`
    ],
    correctAnswerIndex: 0,
    explanation: 'Sequential 90° clockwise rotation: (1) Up-Right -> (2) Down-Right -> (3) Down-Left -> (4) Up-Left.'
  },
  {
    id: 42,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Clock Progression',
    difficulty: 'medium',
    question: 'Progressive Pattern 42: A single pointer moves around a clock face: 1 o\'clock, 4 o\'clock, 7 o\'clock. What is the next position in the sequence?',
    diagramType: 'pattern-series',
    options: [
      '10 o\'clock',
      '9 o\'clock',
      '11 o\'clock',
      '8 o\'clock',
      '12 o\'clock'
    ],
    correctAnswerIndex: 0,
    explanation: 'Constant interval progression of +3 hours: 1 + 3 = 4, 4 + 3 = 7, 7 + 3 = 10 o\'clock.'
  },
  {
    id: 43,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Geometric Subtraction',
    difficulty: 'medium',
    question: 'Progressive Matrix 43: Cell 1 has a circle with an inscribed cross. Cell 2 has just the cross. When Cell 2 is subtracted from Cell 1, what remains in Cell 3?',
    diagramType: 'matrix-3x3',
    options: [
      'Empty Circle',
      'Cross only',
      'Square with dot',
      'Divided semicircle',
      'Solid circle'
    ],
    optionSvgs: [
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><circle cx="40" cy="40" r="26" fill="none" stroke="#10b981" stroke-width="3"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><line x1="40" y1="16" x2="40" y2="64" stroke="#94a3b8" stroke-width="3"/><line x1="16" y1="40" x2="64" y2="40" stroke="#94a3b8" stroke-width="3"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="20" y="20" width="40" height="40" fill="none" stroke="#94a3b8" stroke-width="3"/><circle cx="40" cy="40" r="3" fill="#94a3b8"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><path d="M 16,40 A 24,24 0 0,1 64,40 Z" fill="none" stroke="#94a3b8" stroke-width="3"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><circle cx="40" cy="40" r="26" fill="#94a3b8"/></svg>`
    ],
    correctAnswerIndex: 0,
    explanation: 'Boolean subtraction rule: Figure A (Circle + Cross) MINUS Figure B (Cross) leaves Figure C (Empty Circle).'
  },
  {
    id: 44,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Cube Folding Nets',
    difficulty: 'hard',
    question: 'Progressive Pattern 44: When a standard cross-shaped cube net with faces 1 to 6 is folded, which face is directly opposite to Face 1 (top square of vertical column)?',
    diagramType: 'shape-rotation',
    options: [
      'Face 5 (third square down the vertical column)',
      'Face 2 (adjacent square)',
      'Face 3 (right flap)',
      'Face 4 (left flap)',
      'Face 6 (bottom square)'
    ],
    correctAnswerIndex: 0,
    explanation: 'In an unfolded cube net column, alternating faces fold into opposite sides. Therefore, the face separated by exactly one square is directly opposite.'
  },
  {
    id: 45,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Progressive Matrices',
    difficulty: 'medium',
    question: 'Progressive Matrix 45: 3×3 Grid: Row 1 figures have 3, 4, 5 outer sides (Triangle, Square, Pentagon). Row 2 has 4, 5, 6 sides. Row 3 has 5, 6, ? sides.',
    diagramType: 'matrix-3x3',
    options: [
      '7 sides (Heptagon)',
      '8 sides (Octagon)',
      '6 sides (Hexagon)',
      '4 sides (Square)',
      'Circle'
    ],
    correctAnswerIndex: 0,
    explanation: 'Arithmetic sequence of vertices/sides: In Row 3: 5 (pentagon), 6 (hexagon), next must be 7 sides (heptagon).'
  },
  {
    id: 46,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Reflection Symmetry',
    difficulty: 'low',
    question: 'Progressive Pattern 46: A flag pointing to the Right with an asymmetric star is reflected across a vertical mirror line. What is the reflected image?',
    diagramType: 'pattern-series',
    options: [
      'Flag pointing Left with laterally inverted star',
      'Flag pointing Up',
      'Flag pointing Down',
      'Flag pointing Right unchanged',
      'Upside down flag pointing Right'
    ],
    correctAnswerIndex: 0,
    explanation: 'Vertical reflection reverses left-right orientation while preserving top-bottom orientation.'
  },
  {
    id: 47,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Water Image / Vertical Inversion',
    difficulty: 'low',
    question: 'Progressive Pattern 47: A pyramid pointing Upwards reflects in water below it. Which figure is its water image?',
    diagramType: 'pattern-series',
    options: [
      'Inverted pyramid pointing Downwards',
      'Pyramid pointing to the Right',
      'Pyramid pointing to the Left',
      'Identical Upright pyramid',
      'Diamond shape'
    ],
    correctAnswerIndex: 0,
    explanation: 'Water reflection flips shapes vertically across a horizontal baseline; the apex points downwards.'
  },
  {
    id: 48,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Overlapping Shapes',
    difficulty: 'medium',
    question: 'Progressive Matrix 48: Frame 1: Two separate circles. Frame 2: Circles touching at a point. Frame 3: Circles intersecting to form a lens overlap. What is the pattern?',
    diagramType: 'matrix-3x3',
    options: [
      'Translational convergence toward full concentric overlap',
      'Shape divergence moving apart',
      'Random rotation',
      'Inversion of radius',
      'Alternating colors'
    ],
    correctAnswerIndex: 0,
    explanation: 'Continuous translation along horizontal axis moving the centers closer together until they overlap.'
  },
  {
    id: 49,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Quadrant Rotation',
    difficulty: 'medium',
    question: 'Progressive Pattern 49: A square is divided into 4 quadrants. A shaded black quadrant travels clockwise: Top-Left -> Top-Right -> Bottom-Right. Which quadrant is shaded next?',
    diagramType: 'pattern-series',
    options: [
      'Bottom-Left quadrant',
      'Top-Left quadrant',
      'Center circle',
      'All 4 quadrants shaded',
      'Top-Right quadrant'
    ],
    optionSvgs: [
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="15" y="15" width="50" height="50" fill="none" stroke="#10b981" stroke-width="2"/><line x1="40" y1="15" x2="40" y2="65" stroke="#10b981" stroke-width="2"/><line x1="15" y1="40" x2="65" y2="40" stroke="#10b981" stroke-width="2"/><rect x="15" y="40" width="25" height="25" fill="#10b981"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="15" y="15" width="50" height="50" fill="none" stroke="#94a3b8" stroke-width="2"/><line x1="40" y1="15" x2="40" y2="65" stroke="#94a3b8" stroke-width="2"/><line x1="15" y1="40" x2="65" y2="40" stroke="#94a3b8" stroke-width="2"/><rect x="15" y="15" width="25" height="25" fill="#94a3b8"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="15" y="15" width="50" height="50" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="40" cy="40" r="12" fill="#94a3b8"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="15" y="15" width="50" height="50" fill="#94a3b8"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="15" y="15" width="50" height="50" fill="none" stroke="#94a3b8" stroke-width="2"/><line x1="40" y1="15" x2="40" y2="65" stroke="#94a3b8" stroke-width="2"/><line x1="15" y1="40" x2="65" y2="40" stroke="#94a3b8" stroke-width="2"/><rect x="40" y="15" width="25" height="25" fill="#94a3b8"/></svg>`
    ],
    correctAnswerIndex: 0,
    explanation: 'Clockwise quadrant stepping: Step 1 (TL) -> Step 2 (TR) -> Step 3 (BR) -> Step 4 (BL).'
  },
  {
    id: 50,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Progressive Matrices Master',
    difficulty: 'hard',
    question: 'Progressive Matrix 50 (Master Pattern): In Row 3, an arrow points Down-Left with 3 tails and an open circle head. Combining 180° inversion and head fill, the missing figure is:',
    diagramType: 'matrix-3x3',
    options: [
      'Arrow pointing Up-Right with 3 tails and solid circle head',
      'Arrow pointing Down-Right with 2 tails',
      'Double horizontal arrow with no tails',
      'Arrow pointing Down-Left unchanged',
      'Circle with 4 outward spokes'
    ],
    optionSvgs: [
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><line x1="25" y1="55" x2="55" y2="25" stroke="#10b981" stroke-width="4"/><circle cx="55" cy="25" r="5" fill="#10b981"/><line x1="20" y1="50" x2="30" y2="60" stroke="#10b981" stroke-width="2"/><line x1="25" y1="45" x2="35" y2="55" stroke="#10b981" stroke-width="2"/><line x1="30" y1="40" x2="40" y2="50" stroke="#10b981" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><line x1="25" y1="25" x2="55" y2="55" stroke="#94a3b8" stroke-width="4"/><circle cx="55" cy="55" r="5" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><line x1="15" y1="40" x2="65" y2="40" stroke="#94a3b8" stroke-width="4"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><line x1="55" y1="25" x2="25" y2="55" stroke="#94a3b8" stroke-width="4"/><circle cx="25" cy="55" r="5" fill="none" stroke="#94a3b8" stroke-width="2"/></svg>`,
      `<svg viewBox="0 0 80 80" class="w-16 h-16"><circle cx="40" cy="40" r="16" fill="none" stroke="#94a3b8" stroke-width="3"/><line x1="40" y1="12" x2="40" y2="68" stroke="#94a3b8" stroke-width="2"/><line x1="12" y1="40" x2="68" y2="40" stroke="#94a3b8" stroke-width="2"/></svg>`
    ],
    correctAnswerIndex: 0,
    explanation: 'Master matrix transformation: 180° rotation (Down-Left becomes Up-Right), tail count conserved (3 tails), and head changes from open to solid circle.'
  }
];

// Full 50-Question Non-Verbal IQ exam: Authentic 38 questions from Set-A + 12 progressive matrix questions
export const nonVerbal50Questions: Question[] = [
  ...nonVerbalSetA,
  ...supplementary12Questions.map((q, idx) => ({ ...q, id: nonVerbalSetA.length + idx + 1 }))
];
