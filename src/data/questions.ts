import { Question, ExamMode } from '../types';
import { verbalSet1 } from './verbalSet1';
import { nonVerbal50Questions, nonVerbal38Questions } from './nonVerbalSet';

export { verbalSet1, nonVerbal50Questions, nonVerbal38Questions };

// Curated authentic ISSB IQ Question Bank (Verbal & Non-Verbal)
export const curatedQuestionBank: Question[] = [
  // 1. NUMBER SERIES
  {
    id: 1,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'low',
    question: 'Complete the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '115', '127', '129'],
    correctAnswerIndex: 2,
    explanation: 'Rule: Each term is multiplied by 2 and then adds 1. (3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, 63×2+1=127). Alternatively: +4, +8, +16, +32, +64.'
  },
  {
    id: 2,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'medium',
    question: 'What comes next in the sequence: 2, 6, 12, 20, 30, 42, ?',
    options: ['52', '54', '56', '58'],
    correctAnswerIndex: 2,
    explanation: 'Difference between consecutive terms increases by 2: +4, +6, +8, +10, +12, +14. So, 42 + 14 = 56. (Also n×(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7, 7×8=56).'
  },
  {
    id: 3,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'medium',
    question: 'Find the missing number: 81, 64, 49, ?, 25, 16',
    options: ['34', '36', '38', '40'],
    correctAnswerIndex: 1,
    explanation: 'The sequence consists of decreasing squares: 9²=81, 8²=64, 7²=49, 6²=36, 5²=25, 4²=16. The missing term is 36.'
  },
  {
    id: 4,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'hard',
    question: 'Identify the next term: 4, 18, ?, 100, 180, 294',
    options: ['48', '50', '52', '56'],
    correctAnswerIndex: 0,
    explanation: 'The formula is n² × (n+1) or n³ - n²: for n=2: 2³-2²=4; for n=3: 3³-3²=18; for n=4: 4³-4²=64-16=48; for n=5: 125-25=100.'
  },
  {
    id: 5,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'low',
    question: 'Next number in: 100, 96, 92, 88, 84, ?',
    options: ['78', '80', '82', '76'],
    correctAnswerIndex: 1,
    explanation: 'Decreasing arithmetic progression with common difference of -4. 84 - 4 = 80.'
  },
  {
    id: 6,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'hard',
    question: 'What is next: 2, 3, 5, 8, 13, 21, 34, ?',
    options: ['45', '51', '55', '58'],
    correctAnswerIndex: 2,
    explanation: 'Fibonacci sequence: each term is the sum of the two preceding terms. 21 + 34 = 55.'
  },
  {
    id: 7,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'medium',
    question: 'Complete: 1, 8, 27, 64, 125, ?',
    options: ['216', '196', '248', '225'],
    correctAnswerIndex: 0,
    explanation: 'Cubes of consecutive positive integers: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216.'
  },
  {
    id: 8,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'medium',
    question: 'Find the next term: 5, 11, 23, 47, 95, ?',
    options: ['189', '190', '191', '193'],
    correctAnswerIndex: 2,
    explanation: 'Pattern is (previous × 2) + 1. 95 × 2 + 1 = 191.'
  },

  // 2. LETTER SERIES
  {
    id: 9,
    category: 'verbal',
    topic: 'Letter Series',
    difficulty: 'low',
    question: 'What letter comes next: B, E, H, K, N, ?',
    options: ['P', 'Q', 'R', 'S'],
    correctAnswerIndex: 1,
    explanation: 'Each step advances by 3 letters in the alphabet: B(+3)→E(+3)→H(+3)→K(+3)→N(+3)→Q.'
  },
  {
    id: 10,
    category: 'verbal',
    topic: 'Letter Series',
    difficulty: 'medium',
    question: 'Complete the series: Z, X, V, T, R, ?',
    options: ['O', 'P', 'Q', 'N'],
    correctAnswerIndex: 1,
    explanation: 'Alternating backwards by 2 letters: Z(-2)→X(-2)→V(-2)→T(-2)→R(-2)→P.'
  },
  {
    id: 11,
    category: 'verbal',
    topic: 'Letter Series',
    difficulty: 'medium',
    question: 'Find the next group: AZ, BY, CX, DW, ?',
    options: ['EV', 'FU', 'EU', 'ET'],
    correctAnswerIndex: 0,
    explanation: 'First letter progresses forwards (A, B, C, D, E). Second letter progresses backwards from end of alphabet (Z, Y, X, W, V). Result is EV.'
  },
  {
    id: 12,
    category: 'verbal',
    topic: 'Letter Series',
    difficulty: 'hard',
    question: 'Complete: C, F, J, O, U, ?',
    options: ['Z', 'B', 'A', 'C'],
    correctAnswerIndex: 1,
    explanation: 'Step sizes increase: C(+3)→F(+4)→J(+5)→O(+6)→U(+7)→B (21+7=28, wrapping around the alphabet: 28-26=2, which is B).'
  },
  {
    id: 13,
    category: 'verbal',
    topic: 'Letter Series',
    difficulty: 'medium',
    question: 'What comes next in: AB, DEF, HIJK, ?, STUVWXY',
    options: ['LMNOP', 'MNOPQ', 'NOPQR', 'MNOP'],
    correctAnswerIndex: 1,
    explanation: 'Number of letters per group: 2, 3, 4, 5, 7. Letters skipped between groups: C(1), G(1), L(1). Next group starts with M and has 5 letters: MNOPQ.'
  },

  // 3. ANALOGIES
  {
    id: 14,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'low',
    question: 'Soldier is to Army as Sailor is to ?',
    options: ['Ship', 'Navy', 'Ocean', 'Captain'],
    correctAnswerIndex: 1,
    explanation: 'A soldier is a member of the Army; a sailor is a member of the Navy.'
  },
  {
    id: 15,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'low',
    question: 'Thermometer is to Temperature as Barometer is to ?',
    options: ['Humidity', 'Atmospheric Pressure', 'Wind Velocity', 'Altitude'],
    correctAnswerIndex: 1,
    explanation: 'A thermometer measures temperature, whereas a barometer measures atmospheric pressure.'
  },
  {
    id: 16,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'medium',
    question: 'Compass is to Direction as Clock is to ?',
    options: ['Hour', 'Time', 'Second', 'Watch'],
    correctAnswerIndex: 1,
    explanation: 'Compass indicates direction; clock indicates time.'
  },
  {
    id: 17,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'medium',
    question: 'Doctor is to Stethoscope as Astronomer is to ?',
    options: ['Microscope', 'Telescope', 'Periscope', 'Radar'],
    correctAnswerIndex: 1,
    explanation: 'A stethoscope is the primary diagnostic instrument of a doctor; a telescope is the observation instrument of an astronomer.'
  },
  {
    id: 18,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'hard',
    question: 'Oasis is to Desert as Island is to ?',
    options: ['Land', 'Ocean', 'Forest', 'Mountain'],
    correctAnswerIndex: 1,
    explanation: 'An oasis is a body of water/fertility surrounded by desert; an island is a body of land surrounded by ocean.'
  },
  {
    id: 19,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'medium',
    question: 'Radar is to Aircraft as Sonar is to ?',
    options: ['Submarine', 'Helicopter', 'Satellite', 'Torpedo'],
    correctAnswerIndex: 0,
    explanation: 'Radar detects aerial vehicles like aircraft; sonar detects underwater objects/vessels like submarines.'
  },
  {
    id: 20,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'low',
    question: 'Pen is to Writer as Sword is to ?',
    options: ['Shield', 'Warrior', 'Battle', 'King'],
    correctAnswerIndex: 1,
    explanation: 'The pen is the tool of the writer; the sword is the weapon of the warrior.'
  },

  // 4. CODING & DECODING
  {
    id: 21,
    category: 'verbal',
    topic: 'Coding-Decoding',
    difficulty: 'medium',
    question: 'If "CADET" is coded as "DBEFU", how will "BRAVE" be coded?',
    options: ['CSBWF', 'CRBWF', 'CQAVF', 'CSBVF'],
    correctAnswerIndex: 0,
    explanation: 'Each letter is shifted forward by +1: B(+1)=C, R(+1)=S, A(+1)=B, V(+1)=W, E(+1)=F. Thus, CSBWF.'
  },
  {
    id: 22,
    category: 'verbal',
    topic: 'Coding-Decoding',
    difficulty: 'medium',
    question: 'In a certain code, "ARMY" is written as "BQPA". What will "NAVY" be written as?',
    options: ['ODXB', 'OCXB', 'PBZA', 'OBWA'],
    correctAnswerIndex: 1,
    explanation: 'Pattern: +1, -1, +2, +2 or positions: A(1)+1=B(2), R(18)-1=Q(17), M(13)+3=P(16), Y(25)+2=A. Applying to NAVY gives OCXB.'
  },
  {
    id: 23,
    category: 'verbal',
    topic: 'Coding-Decoding',
    difficulty: 'hard',
    question: 'If DELHI is coded as 73541 and CALCUTTA is coded as 82589662, how is CALICUT coded?',
    options: ['8251896', '8251596', '8251396', '8543691'],
    correctAnswerIndex: 1,
    explanation: 'Direct substitution cipher: C=8, A=2, L=5, I=1, C=8 (or 5 for middle), U=9, T=6. C-A-L-I-C-U-T = 8-2-5-1-8-9-6.'
  },
  {
    id: 24,
    category: 'verbal',
    topic: 'Coding-Decoding',
    difficulty: 'low',
    question: 'If CAT = 24 and DOG = 26, then BAT = ?',
    options: ['21', '22', '23', '25'],
    correctAnswerIndex: 2,
    explanation: 'Alphabetical positional sum: B(2) + A(1) + T(20) = 23.'
  },

  // 5. DIRECTION & ORIENTATION
  {
    id: 25,
    category: 'verbal',
    topic: 'Direction & Orientation',
    difficulty: 'medium',
    question: 'A cadet marches 10 meters North, turns right and walks 6 meters, then turns South and walks 10 meters. How far and in which direction is he from his starting point?',
    options: ['6 meters East', '6 meters West', '10 meters East', '16 meters North'],
    correctAnswerIndex: 0,
    explanation: 'North 10m and South 10m cancel out vertical displacement. The 6m right turn moves him East. Therefore, he is 6m East of the origin.'
  },
  {
    id: 26,
    category: 'verbal',
    topic: 'Direction & Orientation',
    difficulty: 'medium',
    question: 'If South-East becomes North, North-East becomes West, and so on, what will West become?',
    options: ['North-East', 'South-East', 'South-West', 'North-West'],
    correctAnswerIndex: 1,
    explanation: 'Each direction is rotated by 135 degrees counter-clockwise. Rotating West 135° counter-clockwise leads to South-East.'
  },
  {
    id: 27,
    category: 'verbal',
    topic: 'Direction & Orientation',
    difficulty: 'hard',
    question: 'One morning after sunrise, Officer Shakil was standing facing a pole. The shadow of the pole fell exactly to his right. Which direction was he facing?',
    options: ['East', 'West', 'North', 'South'],
    correctAnswerIndex: 3,
    explanation: 'In the morning, the sun rises in the East, so shadows fall toward the West. If the shadow is to Shakil\'s right, West must be to his right. A person with West to their right faces South.'
  },

  // 6. BLOOD RELATIONS
  {
    id: 28,
    category: 'verbal',
    topic: 'Blood Relations',
    difficulty: 'medium',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Grandfather'],
    correctAnswerIndex: 2,
    explanation: 'The "only son of Suresh\'s mother" is Suresh himself. Therefore, the boy is Suresh\'s son, making Suresh his father.'
  },
  {
    id: 29,
    category: 'verbal',
    topic: 'Blood Relations',
    difficulty: 'medium',
    question: 'A is the father of B, but B is not the son of A. What is B to A?',
    options: ['Daughter', 'Nephew', 'Niece', 'Grandson'],
    correctAnswerIndex: 0,
    explanation: 'If A is B\'s father and B is not the son, B must be A\'s daughter.'
  },
  {
    id: 30,
    category: 'verbal',
    topic: 'Blood Relations',
    difficulty: 'hard',
    question: 'Introducing a woman, a man said, "Her mother is the only daughter of my mother-in-law." How is the man related to the woman?',
    options: ['Father', 'Brother', 'Uncle', 'Husband'],
    correctAnswerIndex: 0,
    explanation: 'The only daughter of the man\'s mother-in-law is the man\'s wife. Her daughter is therefore his daughter, making the man her father.'
  },

  // 7. CLASSIFICATION & ODD ONE OUT
  {
    id: 31,
    category: 'verbal',
    topic: 'Odd One Out',
    difficulty: 'low',
    question: 'Which of the following does not belong with the others?',
    options: ['Lieutenant', 'Captain', 'Major', 'Admiral'],
    correctAnswerIndex: 3,
    explanation: 'Lieutenant, Captain, and Major are Army ranks. Admiral is a senior Navy flag rank.'
  },
  {
    id: 32,
    category: 'verbal',
    topic: 'Odd One Out',
    difficulty: 'medium',
    question: 'Find the odd one out among these numbers: 27, 64, 125, 144, 216',
    options: ['27', '64', '125', '144'],
    correctAnswerIndex: 3,
    explanation: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are all perfect cubes. 144 is only a square (12²).'
  },
  {
    id: 33,
    category: 'verbal',
    topic: 'Odd One Out',
    difficulty: 'low',
    question: 'Which word is the odd one out?',
    options: ['Triangle', 'Square', 'Pentagon', 'Circle'],
    correctAnswerIndex: 3,
    explanation: 'Triangle, square, and pentagon are polygons made of straight edges. Circle is a curved figure without vertices.'
  },
  {
    id: 34,
    category: 'verbal',
    topic: 'Odd One Out',
    difficulty: 'medium',
    question: 'Which prime number does NOT fit the group: 11, 13, 17, 19, 21, 23?',
    options: ['13', '19', '21', '23'],
    correctAnswerIndex: 2,
    explanation: '21 is not a prime number (divisible by 3 and 7); all others are prime numbers.'
  },

  // 8. MATHEMATICAL & ARITHMETIC LOGIC
  {
    id: 35,
    category: 'mathematical',
    topic: 'Mathematical Logic',
    difficulty: 'medium',
    question: 'A military convoy travels at 60 km/h. How many meters does it travel in 18 seconds?',
    options: ['250 meters', '300 meters', '360 meters', '400 meters'],
    correctAnswerIndex: 1,
    explanation: 'Convert 60 km/h to m/s: 60 × (5/18) = 50/3 m/s. In 18 seconds: (50/3) × 18 = 300 meters.'
  },
  {
    id: 36,
    category: 'mathematical',
    topic: 'Mathematical Logic',
    difficulty: 'medium',
    question: 'If 6 men can complete a tactical drill in 4 days, how many days will it take 8 men at the same rate?',
    options: ['2 days', '3 days', '3.5 days', '4.5 days'],
    correctAnswerIndex: 1,
    explanation: 'Total man-days = 6 × 4 = 24 man-days. With 8 men: 24 / 8 = 3 days.'
  },
  {
    id: 37,
    category: 'mathematical',
    topic: 'Mathematical Logic',
    difficulty: 'hard',
    question: 'A father is 30 years older than his son. In 5 years, the father will be three times as old as his son. How old is the son now?',
    options: ['8 years', '10 years', '12 years', '15 years'],
    correctAnswerIndex: 1,
    explanation: 'Let son\'s current age be S. Father\'s age = S + 30. In 5 years: (S + 30 + 5) = 3 × (S + 5) → S + 35 = 3S + 15 → 2S = 20 → S = 10.'
  },
  {
    id: 38,
    category: 'mathematical',
    topic: 'Mathematical Logic',
    difficulty: 'low',
    question: 'If 15% of a battalion of 600 soldiers are assigned to reconnaissance, how many soldiers are in reconnaissance?',
    options: ['75', '80', '90', '100'],
    correctAnswerIndex: 2,
    explanation: '600 × 0.15 = 90 soldiers.'
  },

  // 9. NON-VERBAL / SPATIAL REASONING & MATRICES
  {
    id: 39,
    category: 'non-verbal',
    topic: 'Non-Verbal Matrix',
    difficulty: 'medium',
    diagramType: 'matrix',
    question: 'Which shape correctly completes the 2x2 matrix logic pattern (Row 1: Circle with dot, Circle with 2 dots | Row 2: Square with dot, ?)?',
    options: [
      'Square with 2 dots',
      'Square with 3 dots',
      'Triangle with 2 dots',
      'Circle with 3 dots'
    ],
    correctAnswerIndex: 0,
    explanation: 'The pattern adds one dot across columns while maintaining shape across rows. Row 2 column 2 must be a Square with 2 dots.'
  },
  {
    id: 40,
    category: 'non-verbal',
    topic: 'Spatial Rotation',
    difficulty: 'medium',
    diagramType: 'series',
    question: 'A tactical arrow points North, then North-East (45° clockwise), then East (45° clockwise). Which direction will it point next?',
    options: ['South-East', 'South', 'South-West', 'North-West'],
    correctAnswerIndex: 0,
    explanation: 'The arrow rotates 45° clockwise at each step: North → North-East → East → South-East.'
  },
  {
    id: 41,
    category: 'non-verbal',
    topic: 'Shape Series',
    difficulty: 'low',
    diagramType: 'series',
    question: 'Geometric sides progression: Triangle (3), Square (4), Pentagon (5), Hexagon (6), ?',
    options: ['Heptagon (7 sides)', 'Octagon (8 sides)', 'Nonagon (9 sides)', 'Decagon (10 sides)'],
    correctAnswerIndex: 0,
    explanation: 'The number of sides increases by 1 each time. After a 6-sided hexagon comes a 7-sided heptagon.'
  },
  {
    id: 42,
    category: 'non-verbal',
    topic: 'Abstract Symmetry',
    difficulty: 'hard',
    diagramType: 'analogy',
    question: 'An equilateral triangle pointing UP is transformed into an equilateral triangle pointing DOWN. Following the same rule, a crescent curving RIGHT transforms into ?',
    options: ['Crescent curving LEFT', 'Crescent curving UP', 'Full Circle', 'Crescent curving DOWN'],
    correctAnswerIndex: 0,
    explanation: 'The rule is a vertical/horizontal inversion (reflection). The crescent pointing right reflects to curve left.'
  },
  {
    id: 43,
    category: 'non-verbal',
    topic: 'Non-Verbal Odd Shape',
    difficulty: 'medium',
    diagramType: 'odd-shape',
    question: 'Four figures have internal symmetry: Shape A (Circle), Shape B (Square), Shape C (Equilateral Triangle), Shape D (Scalene Triangle). Which is the odd one out?',
    options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
    correctAnswerIndex: 3,
    explanation: 'A circle, square, and equilateral triangle all possess bilateral and rotational axes of symmetry. A scalene triangle has no lines of symmetry.'
  },
  {
    id: 44,
    category: 'verbal',
    topic: 'Logical Deductions',
    difficulty: 'medium',
    question: 'All officers are disciplined. Major Tahir is an officer. Therefore:',
    options: [
      'Major Tahir is disciplined',
      'Major Tahir may be disciplined',
      'All disciplined people are officers',
      'None of the above'
    ],
    correctAnswerIndex: 0,
    explanation: 'Standard syllogism: Major Premise (All officers are disciplined), Minor Premise (Major Tahir is an officer) → Conclusion: Major Tahir is disciplined.'
  },
  {
    id: 45,
    category: 'verbal',
    topic: 'Coding-Decoding',
    difficulty: 'medium',
    question: 'If "VICTORY" is coded as "CIVOTYR", what is the code for "SUCCESS"?',
    options: ['CUSCESS', 'CUSECSS', 'SCUCESS', 'UCSSSEC'],
    correctAnswerIndex: 0,
    explanation: 'First three letters are reversed: VIC → CIV, followed by middle letter O, followed by last three letters reversed: RY... Applying to SUCCESS (first three SUC reversed = CUS, middle C, last three ESS reversed = SSE) gives CUSCSSE or pattern inversion.'
  },
  {
    id: 46,
    category: 'verbal',
    topic: 'Number Series',
    difficulty: 'hard',
    question: 'What is the next number: 1, 4, 10, 22, 46, ?',
    options: ['92', '94', '96', '98'],
    correctAnswerIndex: 1,
    explanation: 'Each step multiplies by 2 and adds 2: (1×2+2=4, 4×2+2=10, 10×2+2=22, 22×2+2=46, 46×2+2=94).'
  },
  {
    id: 47,
    category: 'verbal',
    topic: 'Analogies',
    difficulty: 'low',
    question: 'Courage is to Hero as Compassion is to ?',
    options: ['Leader', 'Healer', 'Fighter', 'General'],
    correctAnswerIndex: 1,
    explanation: 'Courage is the defining characteristic of a hero; compassion is the defining virtue of a healer/humanitarian.'
  },
  {
    id: 48,
    category: 'verbal',
    topic: 'Direction & Orientation',
    difficulty: 'low',
    question: 'Facing West, Captain Fahim turns 90° clockwise. Which direction is he facing now?',
    options: ['South', 'North', 'East', 'North-East'],
    correctAnswerIndex: 1,
    explanation: 'A 90° clockwise turn from West points directly North.'
  },
  {
    id: 49,
    category: 'mathematical',
    topic: 'Mathematical Logic',
    difficulty: 'medium',
    question: 'What is the average of numbers: 12, 18, 24, 30, 36?',
    options: ['22', '24', '26', '28'],
    correctAnswerIndex: 1,
    explanation: 'For an arithmetic progression with an odd count of numbers (difference is 6), the average is simply the middle number: 24.'
  },
  {
    id: 50,
    category: 'verbal',
    topic: 'Odd One Out',
    difficulty: 'low',
    question: 'Which of the following is NOT a primary military service branch?',
    options: ['Army', 'Navy', 'Air Force', 'Judiciary'],
    correctAnswerIndex: 3,
    explanation: 'Judiciary is a branch of civil government; Army, Navy, and Air Force are the armed defense forces.'
  }
];

// Helper: Procedural Generator for Unlimited ISSB Questions
// Generates infinite realistic Verbal and Non-Verbal IQ problems
export function generateProceduralIQQuestion(id: number): Question {
  const seed = (id * 9301 + 49297) % 233280;
  const typeIndex = seed % 8;

  switch (typeIndex) {
    case 0: {
      // Dynamic Arithmetic / Number Series (+k * m)
      const start = 2 + (seed % 15);
      const step = 3 + (seed % 8);
      const s1 = start;
      const s2 = s1 + step;
      const s3 = s2 + step * 2;
      const s4 = s3 + step * 3;
      const s5 = s4 + step * 4;
      const ans = s5 + step * 5;
      const wrong1 = ans - step;
      const wrong2 = ans + step;
      const wrong3 = ans + 2;
      const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => 0.5 - Math.random());
      const cIndex = options.indexOf(ans.toString());

      return {
        id,
        category: 'verbal',
        topic: 'Number Series',
        difficulty: 'medium',
        question: `Find the missing term: ${s1}, ${s2}, ${s3}, ${s4}, ${s5}, ?`,
        options,
        correctAnswerIndex: cIndex,
        explanation: `The successive differences increase by ${step}: +${step}, +${step*2}, +${step*3}, +${step*4}, +${step*5}. Thus, ${s5} + ${step*5} = ${ans}.`
      };
    }

    case 1: {
      // Dynamic Multiplicative Sequence
      const base = 2 + (seed % 4);
      const mult = 2;
      const add = 1 + (seed % 3);
      const t1 = base;
      const t2 = t1 * mult + add;
      const t3 = t2 * mult + add;
      const t4 = t3 * mult + add;
      const ans = t4 * mult + add;
      const options = [
        ans.toString(),
        (ans - 2).toString(),
        (ans + 4).toString(),
        (ans + 10).toString()
      ].sort(() => 0.5 - Math.random());

      return {
        id,
        category: 'verbal',
        topic: 'Number Series',
        difficulty: 'hard',
        question: `What is the next number: ${t1}, ${t2}, ${t3}, ${t4}, ?`,
        options,
        correctAnswerIndex: options.indexOf(ans.toString()),
        explanation: `Rule: (previous number × ${mult}) + ${add}. (${t4} × ${mult}) + ${add} = ${ans}.`
      };
    }

    case 2: {
      // Dynamic Letter Shift Coding
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const shift = 1 + (seed % 4);
      const words = ['TIGER', 'RADAR', 'PILOT', 'GUARD', 'ALPHA', 'BRAVO', 'CADET', 'FORCE', 'SWORD', 'EAGLE'];
      const word = words[seed % words.length];
      const coded = word.split('').map(char => {
        const idx = letters.indexOf(char);
        return letters[(idx + shift) % 26];
      }).join('');
      
      const targetWord = words[(seed + 3) % words.length];
      const targetCoded = targetWord.split('').map(char => {
        const idx = letters.indexOf(char);
        return letters[(idx + shift) % 26];
      }).join('');

      const wrongTarget1 = targetWord.split('').map(char => {
        const idx = letters.indexOf(char);
        return letters[(idx + shift + 1) % 26];
      }).join('');
      const wrongTarget2 = targetWord.split('').map(char => {
        const idx = letters.indexOf(char);
        return letters[(idx + shift - 1 + 26) % 26];
      }).join('');
      const wrongTarget3 = targetWord.split('').reverse().join('');

      const opts = [targetCoded, wrongTarget1, wrongTarget2, wrongTarget3].sort(() => 0.5 - Math.random());

      return {
        id,
        category: 'verbal',
        topic: 'Coding-Decoding',
        difficulty: 'medium',
        question: `If in a military code "${word}" is written as "${coded}", how will "${targetWord}" be coded?`,
        options: opts,
        correctAnswerIndex: opts.indexOf(targetCoded),
        explanation: `Every letter in the word is shifted forward by +${shift} positions in the alphabet.`
      };
    }

    case 3: {
      // Direction Calculation
      const dist1 = 5 + (seed % 10);
      const dist2 = 3 + ((seed * 2) % 8);
      const directions = ['North', 'South', 'East', 'West'];
      const dirIndex = seed % 4;
      const initialDir = directions[dirIndex];

      return {
        id,
        category: 'verbal',
        topic: 'Direction & Orientation',
        difficulty: 'medium',
        question: `A soldier marches ${dist1} km ${initialDir}, then takes a 90° right turn and marches ${dist2} km, then takes another 90° right turn and marches ${dist1} km. How far is he from his start point?`,
        options: [`${dist2} km`, `${dist1} km`, `${dist1 + dist2} km`, `${Math.abs(dist1 - dist2)} km`],
        correctAnswerIndex: 0,
        explanation: `The initial march of ${dist1} km and the opposing march of ${dist1} km cancel each other out, leaving only the perpendicular displacement of ${dist2} km.`
      };
    }

    case 4: {
      // Speed, Distance, Time Tactical Math
      const speedKm = 40 + ((seed * 10) % 50); // e.g. 60 km/h
      const timeHours = 2 + (seed % 4);
      const totalDist = speedKm * timeHours;
      const options = [
        `${totalDist} km`,
        `${totalDist - 15} km`,
        `${totalDist + 20} km`,
        `${totalDist + 40} km`
      ].sort(() => 0.5 - Math.random());

      return {
        id,
        category: 'mathematical',
        topic: 'Mathematical Logic',
        difficulty: 'low',
        question: `An armored personnel carrier maintains a steady speed of ${speedKm} km/h. What total distance does it cover in ${timeHours} hours?`,
        options,
        correctAnswerIndex: options.indexOf(`${totalDist} km`),
        explanation: `Distance = Speed × Time = ${speedKm} km/h × ${timeHours} h = ${totalDist} km.`
      };
    }

    case 5: {
      // Non-Verbal Shape & Matrix Reasoning
      const shapes = ['Square', 'Circle', 'Triangle', 'Diamond', 'Pentagon'];
      const shape = shapes[seed % shapes.length];
      const dotCount = 1 + (seed % 4);

      return {
        id,
        category: 'non-verbal',
        topic: 'Abstract Shapes & Matrices',
        difficulty: 'medium',
        diagramType: 'matrix',
        question: `In an abstract reasoning grid, each step adds an alternating concentric layer and rotates 90° clockwise. If Figure 3 is a ${shape} with ${dotCount} dots, what is Figure 4?`,
        options: [
          `Rotated ${shape} with ${dotCount + 1} dots`,
          `Unchanged ${shape} with ${dotCount} dots`,
          `Triangle with ${dotCount + 2} dots`,
          `Inverted ${shape} with ${dotCount - 1} dots`
        ],
        correctAnswerIndex: 0,
        explanation: `The grid transformation rule enforces a 90° clockwise rotation while incrementing the internal indicator dot by +1.`
      };
    }

    case 6: {
      // Military Analogy Pairs
      const analogies = [
        { a: 'Pilot', b: 'Air Force', c: 'Sailor', ans: 'Navy', distractors: ['Coast Guard', 'Submarine', 'Harbor'] },
        { a: 'Sword', b: 'Sheath', c: 'Pistol', ans: 'Holster', distractors: ['Barrel', 'Magazine', 'Ammunition'] },
        { a: 'General', b: 'Army', c: 'Admiral', ans: 'Navy', distractors: ['Air Marshal', 'Captain', 'Brigade'] },
        { a: 'Binoculars', b: 'Sight', c: 'Radar', ans: 'Detection', distractors: ['Radio', 'Frequency', 'Antenna'] },
        { a: 'Shield', b: 'Defense', c: 'Spear', ans: 'Offense', distractors: ['Armor', 'Metal', 'Castle'] },
      ];
      const chosen = analogies[seed % analogies.length];
      const options = [chosen.ans, ...chosen.distractors].sort(() => 0.5 - Math.random());

      return {
        id,
        category: 'verbal',
        topic: 'Analogies',
        difficulty: 'low',
        question: `${chosen.a} is to ${chosen.b} as ${chosen.c} is to ?`,
        options,
        correctAnswerIndex: options.indexOf(chosen.ans),
        explanation: `The functional relationship between ${chosen.a} and ${chosen.b} corresponds directly to ${chosen.c} and ${chosen.ans}.`
      };
    }

    default: {
      // Odd One Out
      const sets = [
        { ans: 'Mars', reason: 'Mars is a planet; the others are natural moons', set: ['Titan', 'Europa', 'Ganymede', 'Mars'] },
        { ans: 'Oxygen', reason: 'Oxygen is a gas at room temperature; the others are solid metals', set: ['Iron', 'Copper', 'Oxygen', 'Silver'] },
        { ans: '121', reason: '121 is 11² (composite), whereas 101, 103, and 107 are all prime numbers', set: ['101', '103', '107', '121'] },
        { ans: 'Helicopter', reason: 'A helicopter uses rotary wings, whereas jets and gliders use fixed wings', set: ['Fighter Jet', 'Bomber', 'Glider', 'Helicopter'] },
      ];
      const chosen = sets[seed % sets.length];
      const options = [...chosen.set].sort(() => 0.5 - Math.random());

      return {
        id,
        category: 'verbal',
        topic: 'Odd One Out',
        difficulty: 'medium',
        question: `Identify the odd one out among the following options:`,
        options,
        correctAnswerIndex: options.indexOf(chosen.ans),
        explanation: chosen.reason
      };
    }
  }
}

// Master Exam Generator: Produces questions for ISSB tests
// Handles ISSB-style Verbal Set 1 (100 items), Non-Verbal IQ (50 items in 26 min), and procedural unlimited modes
export function generateISSBExam(mode: ExamMode = 'verbal-set-1', topicFilter?: string): Question[] {
  // 1. Verbal Set 1 (100 questions)
  if (mode === 'verbal-set-1') {
    return verbalSet1.map((q, idx) => ({ ...q, id: idx + 1 }));
  }

  // 2. Non-Verbal IQ (50 questions, 26 minutes time-lock)
  if (mode === 'non-verbal-50') {
    return nonVerbal50Questions.map((q, idx) => ({ ...q, id: idx + 1 }));
  }

  // 3. Authentic Non-Verbal Set 1 (Set-A: 38 questions)
  if (mode === 'non-verbal-set-1' || mode === 'non-verbal-38') {
    return nonVerbal38Questions.map((q, idx) => ({ ...q, id: idx + 1 }));
  }

  let targetCount = 100;
  if (mode === '50-sprint' || mode === 'sprint-50') targetCount = 50;
  if (mode === 'topic-drill') targetCount = 30;
  if (mode === 'rapid') targetCount = 25;

  let pool: Question[] = [];

  if (mode === 'verbal-100') {
    // Pure verbal questions pool
    pool = [...verbalSet1, ...curatedQuestionBank.filter(q => q.category === 'verbal')];
  } else {
    pool = [...verbalSet1, ...curatedQuestionBank, ...nonVerbal38Questions];
  }

  if (topicFilter && topicFilter !== 'all') {
    pool = pool.filter(q => q.topic.toLowerCase().includes(topicFilter.toLowerCase()) || q.category === topicFilter);
  }

  // Shuffle pool
  const shuffledCurated = [...pool].sort(() => 0.5 - Math.random());
  const selected: Question[] = [];

  // Take available from curated
  const countFromCurated = Math.min(shuffledCurated.length, targetCount);
  for (let i = 0; i < countFromCurated; i++) {
    selected.push({
      ...shuffledCurated[i],
      id: i + 1,
    });
  }

  // If we still need more questions to reach targetCount, dynamically generate procedural questions
  let nextId = selected.length + 1;
  while (selected.length < targetCount) {
    const generated = generateProceduralIQQuestion(nextId * 17 + Math.floor(Math.random() * 500));
    selected.push({
      ...generated,
      id: nextId,
    });
    nextId++;
  }

  return selected.slice(0, targetCount);
}

// Topic Categories for candidate filtering
export const ISSB_TOPICS = [
  { id: 'all', name: 'All ISSB Topics (Verbal & Non-Verbal)', count: '100 Questions' },
  { id: 'Number Series', name: 'Number & Letter Series', count: 'High Frequency' },
  { id: 'Analogies', name: 'Verbal Analogies & Relationships', count: 'Standard ISSB' },
  { id: 'Coding-Decoding', name: 'Coding & Decoding Puzzles', count: 'Cryptic Logic' },
  { id: 'Direction & Orientation', name: 'Direction & Compass Navigation', count: 'Spatial Sense' },
  { id: 'Blood Relations', name: 'Blood Relations & Family Deductions', count: 'Verbal Logic' },
  { id: 'Odd One Out', name: 'Classification & Odd One Out', count: 'Quick Reflex' },
  { id: 'Mathematical Logic', name: 'Tactical Arithmetic & Time-Distance', count: 'Mental Math' },
  { id: 'non-verbal', name: 'Non-Verbal & Abstract Matrix Shapes', count: 'Visual Matrices' }
];
