import { Question } from '../types';

// Authentic ISSB Non-Verbal IQ: Set-A
// 38 authentic questions transcribed directly from ISSB examination test papers
// Complete with all high-resolution cropped pattern diagrams and Answer Sheet-A validation
export const nonVerbalSetA: Question[] = [
  {
    id: 1,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Progressive Matrices',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 1: Observe the 3×3 matrix. Which option (a-h) logically replaces the question mark (?) in the bottom-right cell?',
    imageUrl: '/assets/nonverbal/q1.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 2, // c
    explanation: 'Row 1 features single curved loops; Row 2 features horizontal wave elements and dual loops; Row 3 features 4-armed swastika/pinwheels. Column 3 features closed double/quad loops. The intersection of Row 3 and Column 3 requires the 4-petal closed flower (c).'
  },
  {
    id: 2,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Grid Continuity',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 2: Complete the grid by selecting the missing segment (?):',
    imageUrl: '/assets/nonverbal/q2.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 1, // b
    explanation: 'Vertical and horizontal line grid: The bottom-right section requires continuation of the double vertical lines intersecting the double horizontal lines, which is option (b).'
  },
  {
    id: 3,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Pattern Series',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 3: Observe the elements in each row and column. Which pattern belongs in cell (?):',
    imageUrl: '/assets/nonverbal/q3.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 elements: squares, horizontal lines, pluses. Row 2: diagonal hatches, crosses, diamonds. Row 3: clusters of crosses incrementing. Column 2 elements transition from straight lines to diagonal lines to curved parallel lines (b).'
  },
  {
    id: 4,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Curved Mesh Lattice',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 4: Which segment completes the curved mesh lattice (?):',
    imageUrl: '/assets/nonverbal/q4.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 3, // d
    explanation: 'Tracing the undulating ribbons across columns and rows shows the intersecting flow in the lower-right quadrant corresponds to pattern (d).'
  },
  {
    id: 5,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Stripe Progression',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 5: Identify the missing stripe pattern (?):',
    imageUrl: '/assets/nonverbal/q5.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 0, // a
    explanation: 'The vertical stripes progressively widen from left to right. Completing the missing bottom-right segment with matching vertical stripes corresponds to (a).'
  },
  {
    id: 6,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Wedge Band Progression',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 6: Complete the tapered striped field (?):',
    imageUrl: '/assets/nonverbal/q6.png',
    pageImageUrl: '/assets/aistudio/image_1f4d63d0.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 4, // e
    explanation: 'The horizontal black bands taper with opposing triangular white wedges. Completing the lower segment with the matching white wedge cut-outs corresponds to option (e).'
  },
  {
    id: 7,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Shape Analogy',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 7: 2×2 Analogy. Figure 1 is to Figure 2 as Figure 3 is to (?):',
    imageUrl: '/assets/nonverbal/q7.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 maintains the exact same fleur-de-lis motif across both cells. Row 2 maintains the same identical motif in the second cell, which is figure (b).'
  },
  {
    id: 8,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Focal Ray Convergence',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 8: Complete the radiating line convergence (?):',
    imageUrl: '/assets/nonverbal/q8.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 3, // d
    explanation: 'Vertical and horizontal fan lines converge at the nodal focal points. The missing bottom-right quadrant is completed by option (d).'
  },
  {
    id: 9,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Triangle Direction',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 9: Observe the directional orientation of triangles. What completes the sequence (?):',
    imageUrl: '/assets/nonverbal/q9.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 2, // c
    explanation: 'Top row: Left-pointing triangle -> Right-pointing triangle. Bottom row: Right-pointing triangle -> Right-pointing triangle (mirrored/matching directional orientation), which is triangle (c).'
  },
  {
    id: 10,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Segmented Crosses',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 10: Which segmented square completes the 2×2 matrix (?):',
    imageUrl: '/assets/nonverbal/q10.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 1, // b
    explanation: 'Top row has dark centered cross dividing 4 quadrants. Bottom row has outlined square divided by crossbars. The matching lower-right quadrant completes as (b).'
  },
  {
    id: 11,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Corner Framing',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 11: Observe the corner framing geometry. Which option fills cell (?):',
    imageUrl: '/assets/nonverbal/q11.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 0, // a
    explanation: 'Top-left has rounded corner, top-right has square nested corner. Bottom-left has curved corner, bottom-right mirrors the square nested corner (a).'
  },
  {
    id: 12,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Circle Quadrants',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 12: Identify the missing circular sector (?):',
    imageUrl: '/assets/nonverbal/q12.png',
    pageImageUrl: '/assets/aistudio/image_826e519b.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 1, // b
    explanation: 'The shaded quadrant rotates clockwise around the central axis: TL -> TR -> BL -> BR. The missing bottom-right sector is (b).'
  },
  {
    id: 13,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Shape Subtraction',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 13: 2×2 Analogy. Complete the matrix (?):',
    imageUrl: '/assets/nonverbal/q13.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 3, // d
    explanation: 'In row 1, diamond with crossbars has crossbars removed to become empty diamond. In row 2, square with grid crossbars has crossbars removed to become empty square (d).'
  },
  {
    id: 14,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Dot Inscription',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 14: Which shape belongs in cell (?):',
    imageUrl: '/assets/nonverbal/q14.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 2, // c
    explanation: 'Top-left is diamond, top-right is 4-point star. Bottom-left is diamond with centered dot. Following the analogy, bottom-right is 4-point star with centered dot (c).'
  },
  {
    id: 15,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Concentric Rings',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 15: Concentric ring matrix. What completes row 3 (?):',
    imageUrl: '/assets/nonverbal/q15.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 has single circles; Row 2 has double concentric circles; Row 3 has triple concentric circles. Circles decrease in size from left to right. The missing cell requires small triple concentric circle (b).'
  },
  {
    id: 16,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Nested Inversion',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 16: Complete the shape progression (?):',
    imageUrl: '/assets/nonverbal/q16.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'],
    correctAnswerIndex: 4, // e
    explanation: 'Top row: square containing diamond containing circle -> square containing diamond. The innermost shape is eliminated. Bottom row: square containing circle -> square alone (e).'
  },
  {
    id: 17,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Dot Multiplication',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 17: Dot progression matrix. Row 1: 1, 2, 3 dots; Row 2: 2, 4, 6 dots; Row 3: 3, 6, ? dots:',
    imageUrl: '/assets/nonverbal/q17.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 2, // c
    explanation: 'Arithmetic progression: Row 1 = 1×(1,2,3) = 1, 2, 3 dots. Row 2 = 2×(1,2,3) = 2, 4, 6 dots. Row 3 = 3×(1,2,3) = 3, 6, 9 dots, represented by the 3×3 dot cluster in (c).'
  },
  {
    id: 18,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Crossbar Addition',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 18: Cross line increment matrix. Which figure completes the 3×3 matrix (?):',
    imageUrl: '/assets/nonverbal/q18.png',
    pageImageUrl: '/assets/aistudio/image_3cf2091a.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Vertical bar receives horizontal crossbars (+1, +2 bars) and central round node in Row 3. Column 3 has double horizontal crossbars. The missing item is cross with central node and double bars (b).'
  },
  {
    id: 19,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Leaf Petal Progression',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 19: Leaf / petal cluster progression. Which flower fills the final cell (?):',
    imageUrl: '/assets/nonverbal/q19.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 3, // d
    explanation: 'Row 1 has 1, 2, 3 petals. Row 2 has 2, 3, 4 petals. Row 3 has 3, 4, 5 petals. Option (d) displays the 5-petal flower with central stem.'
  },
  {
    id: 20,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Tally Lines',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 20: Tally cross line matrix. What is the missing figure (?):',
    imageUrl: '/assets/nonverbal/q20.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 has 1 vertical line with 1, 2, 3 horizontal bars; Row 2 has 2 vertical lines with 1, 2, 3 horizontal bars; Row 3 has 3 vertical lines with 1, 2, 3 horizontal bars. The final cell requires 3 vertical lines crossed by 3 horizontal bars (b).'
  },
  {
    id: 21,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Corner Shading',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 21: Corner shaded square progression. Identify the figure for (?):',
    imageUrl: '/assets/nonverbal/q21.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 3, // d
    explanation: 'Inner solid square moves clockwise around the framing box. In Row 3: bottom-left -> bottom-center -> bottom-right. Option (d) correctly places the solid square in the bottom-right corner.'
  },
  {
    id: 22,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Line Segment Decomposition',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 22: Line segment matrix. Which option fills cell (?):',
    imageUrl: '/assets/nonverbal/q22.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 2, // c
    explanation: 'Column 1 has corner L-shapes; Column 2 has vertical bars with notch; Column 3 has straight vertical segments reducing to short horizontal base segment (c).'
  },
  {
    id: 23,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Concentric Synthesis',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 23: Shape combination matrix (Separate -> Overlap -> Concentric). What completes Row 3 (?):',
    imageUrl: '/assets/nonverbal/q23.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 0, // a
    explanation: 'Row 1 (Circles): Two separate circles -> Overlapping circles -> Concentric circles. Row 2 (Squares): Separate -> Overlapping -> Concentric squares. Row 3 (Triangles): Separate -> Overlapping -> Concentric nested triangles (a).'
  },
  {
    id: 24,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Texture Synthesis',
    difficulty: 'hard',
    question: 'Non-Verbal Pattern 24: Shading overlay matrix. Which shaded square belongs in (?):',
    imageUrl: '/assets/nonverbal/q24.png',
    pageImageUrl: '/assets/aistudio/image_122ab9db.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Horizontal and vertical hatch patterns overlay to form crosshatch in Row 3. Combining the hatch density of Row 3 Column 1 and Column 2 yields the fully textured square (b).'
  },
  {
    id: 25,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Dot Constellations',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 25: Dot clusters inside rectangular boxes. Which box completes Row 3 (?):',
    imageUrl: '/assets/nonverbal/q25.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 has 3 dots arranged in lines. Row 2 has 4 dots in 2x2. Row 3 has 5 dots arranged in varied groupings. Option (b) displays the matching 5-dot configuration.'
  },
  {
    id: 26,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Motif Duplication',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 26: Shapes inside rounded tablets. What completes cell (?):',
    imageUrl: '/assets/nonverbal/q26.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 2, // c
    explanation: 'Row 1 has single, double, triple concentric dots. Row 2 has floral motifs. Row 3 has interconnected ring chains (1 pair, 2 pairs, 3 pairs). Option (c) provides the matching 3-pair chain.'
  },
  {
    id: 27,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Shape Consistency',
    difficulty: 'low',
    question: 'Non-Verbal Pattern 27: Row 1 = Diamonds, Row 2 = Plus signs, Row 3 = Circles. What completes Column 3 (?):',
    imageUrl: '/assets/nonverbal/q27.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 2, // c
    explanation: 'Row 1 contains solid diamonds, Row 2 contains plus signs, Row 3 contains open circles. The element in Row 3 Column 3 must be the open circle with internal dot (c).'
  },
  {
    id: 28,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Quadrant Hatch Addition',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 28: Diagonal hatch quadrant progression. What fills the final cell (?):',
    imageUrl: '/assets/nonverbal/q28.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 0, // a
    explanation: 'Quadrants progressively fill with diagonal hatching: Row 1 adds top-right and top-left; Row 2 adds bottom quadrants. Row 3 completes all four quadrants into full grid (a).'
  },
  {
    id: 29,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Latin Square Concentric Rings',
    difficulty: 'hard',
    question: 'Non-Verbal Pattern 29: Concentric circles and single dots Latin square. Which option completes Row 3 (?):',
    imageUrl: '/assets/nonverbal/q29.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 3, // d
    explanation: 'Each row and column contains: (1) triple concentric circle, (2) double circle, (3) single dot. Row 3 already contains the single dot and triple circle, so the missing element is the double concentric circle with center dot (d).'
  },
  {
    id: 30,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Latin Square Symbols',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 30: Latin square with Dot, Plus, and Propeller. What completes cell (?):',
    imageUrl: '/assets/nonverbal/q30.png',
    pageImageUrl: '/assets/aistudio/image_bf9d8af3.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 0, // a
    explanation: 'Each row and column contains a Dot (●), a Plus (+), and a 3-blade Propeller (Y). Row 3 has Propeller and Dot, so the missing symbol is the Plus (+) inside frame (a).'
  },
  {
    id: 31,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Star Variations',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 31: Cross and star symbol matrix. Which option fills cell (?):',
    imageUrl: '/assets/nonverbal/q31.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 1, // b
    explanation: 'Row 1 contains plus variations; Row 2 contains diamond variations; Row 3 contains star cross variations. Column 3 has dotted terminal stars. The missing figure is (b).'
  },
  {
    id: 32,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Enclosure Progression',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 32: Symbol framing matrix (Plain -> Inside Circle -> Inside Pill). What completes Row 3 (?):',
    imageUrl: '/assets/nonverbal/q32.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 4, // e
    explanation: 'Row 1: Clover plain -> inside circle -> inside pill. Row 2: Diamond plain -> inside circle -> inside pill. Row 3: Plus sign plain -> inside circle -> inside horizontal pill / rectangle (e).'
  },
  {
    id: 33,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Abstract Matrix Logic',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 33: Abstract glyph matrix. Which option logically replaces the question mark (?):',
    imageUrl: '/assets/nonverbal/q33.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 4, // e
    explanation: 'By column and row distribution of geometric emblems, the bottom-right cell requires cross with circle enclosure (e).'
  },
  {
    id: 34,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Border Framing Styles',
    difficulty: 'hard',
    question: 'Non-Verbal Pattern 34: Nested border styles (Dashed -> Single solid -> Double solid). Complete Row 3 (?):',
    imageUrl: '/assets/nonverbal/q34.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 4, // e
    explanation: 'Row 1 has dashed square borders; Row 2 has single solid borders; Row 3 has double concentric square borders. The interior symbols are Plus, Dot, and Propeller. The missing cell requires double square enclosing the Propeller (e).'
  },
  {
    id: 35,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Segmented Stripes',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 35: Patterned bar matrix. What completes cell (?):',
    imageUrl: '/assets/nonverbal/q35.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 0, // a
    explanation: 'Hatch patterns (vertical, horizontal, cross) rotate and combine across the grid. The missing pattern completes as option (a).'
  },
  {
    id: 36,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Shape and Fill Latin Matrix',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 36: Shape and fill Latin matrix (Square, Oval, Diamond with White, Shaded, Black fills). What belongs in (?):',
    imageUrl: '/assets/nonverbal/q36.png',
    pageImageUrl: '/assets/aistudio/image_f4ce0f73.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)'],
    correctAnswerIndex: 3, // d
    explanation: 'Latin square rule: Shapes = Square, Oval, Diamond. Fills = White, Shaded (hatch), Solid Black. Row 3 has Solid Oval and White Diamond; the missing shape is the Shaded Square (d).'
  },
  {
    id: 37,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Half-Circle Shading Angles',
    difficulty: 'hard',
    question: 'Non-Verbal Pattern 37: 3×3 Circle Shading Matrix. Half-circle shading angles and textures. Which option completes Row 3 (?):',
    imageUrl: '/assets/nonverbal/q37.png',
    pageImageUrl: '/assets/aistudio/image_f4edddb2.png',
    options: ['(a)', '(b)', '(c)', '(d)', '(e)'],
    correctAnswerIndex: 3, // d
    explanation: 'Each row and column contains three fills: Solid Black, Striped (hatch), and White (outline). Row 3 has Striped half-circle (diagonal) and White half-circle (vertical). The missing circle must have Solid Black fill with horizontal midline (d).'
  },
  {
    id: 38,
    testType: 'non-verbal',
    category: 'non-verbal',
    topic: 'Quadrant Symmetry',
    difficulty: 'medium',
    question: 'Non-Verbal Pattern 38: Quadrant pattern puzzle. Which corner piece completes the diamond framing (?):',
    imageUrl: '/assets/nonverbal/q38.png',
    pageImageUrl: '/assets/aistudio/image_f4edddb2.png',
    options: ['(a)', '(b)', '(c)', '(d)'],
    correctAnswerIndex: 3, // d
    explanation: 'The four quadrants form a symmetric nested diamond with internal corner squares. The bottom-left quadrant must provide the matching diagonal band sloping down and nested corner square, which is option (d).'
  }
];
