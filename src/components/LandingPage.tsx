import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Award, 
  Zap, 
  Layers, 
  Compass,
  CheckCircle2,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onStartPracticing: () => void;
  onStartNonVerbal?: () => void;
  username: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPracticing, onStartNonVerbal, username }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive mini preview on landing page
  const [selectedDemoAnswer, setSelectedDemoAnswer] = useState<number | null>(null);
  const [hasCheckedDemo, setHasCheckedDemo] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the ISSB-style Verbal IQ format?",
      a: "In verbal intelligence testing, candidates face 100 questions within 30 minutes (an average of 18 seconds per question). Questions include 5 options, (a) to (e), covering number and letter series, analogies, coding, and logical deductions."
    },
    {
      q: "What is the ISSB-style Non-Verbal IQ format?",
      a: "The Non-Verbal IQ test allows 26 minutes to complete 50 questions (or visual patterns). Candidates solve progressive matrices, shape rotations, folding cube nets, and visual pattern logic."
    },
    {
      q: "How does the Unlimited IQ Practice engine work?",
      a: "b20ISSB provides extensive practice question banks combined with randomized generation algorithms, allowing you to practice fresh sets of verbal and non-verbal test papers."
    },
    {
      q: "How does the answer review work?",
      a: "After completing a drill, you receive a detailed answer review displaying your score, skipped questions, and comprehensive explanations with step-by-step logic for every question."
    }
  ];

  return (
    <div className="space-y-24 pb-12 overflow-x-hidden text-slate-100">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-6 sm:pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bangladesh Armed Forces ISSB Preparation</span>
            </motion.div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                b20<span className="text-emerald-400">ISSB</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-200 tracking-tight">
                Unlimited IQ Practice with b20ISSB
              </h2>
              <p className="text-emerald-400 font-bold text-lg sm:text-xl tracking-wide flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Time-Locked: 100 IQ Questions in 30 Minutes
              </p>
            </div>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Master the relentless pace of ISSB preliminary screening. Experience authentic military-standard verbal, numerical, coding, and spatial matrix reasoning drills with strict time-lock simulation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartPracticing}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-8 py-5 rounded-2xl shadow-xl shadow-emerald-950/70 transition-all flex items-center justify-center gap-3 text-lg cursor-pointer"
              >
                <span>{username ? 'Launch Cadet Portal' : 'Start 100 IQ Practice'}</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </motion.button>
              
              <button
                onClick={onStartNonVerbal || onStartPracticing}
                className="border-2 border-slate-700 hover:border-emerald-500/50 bg-slate-900/90 hover:bg-slate-850 text-slate-200 font-bold px-8 py-5 rounded-2xl transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                Start Non-Verbal Practice
              </button>

              <a 
                href="#features"
                className="border-2 border-slate-700 hover:border-emerald-500/50 bg-slate-900/90 hover:bg-slate-850 text-slate-200 font-bold px-8 py-5 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
              >
                Inspect ISSB Format
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> Strict 30:00 Auto-Submit
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> Verbal & Non-Verbal Matrices
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> Infinite Practice Sets
              </span>
            </div>
          </div>

          {/* Right: Interactive Military HUD Preview */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl shadow-emerald-950/40 text-left space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-300">Live Simulation HUD</span>
                </div>
                <div className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Time-Locked: 29:42
                </div>
              </div>

              {/* Sample Question Box */}
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>Question 42 of 100</span>
                  <span className="text-emerald-400 font-mono">Pace: 16.8s/item</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-sm font-extrabold text-white leading-snug">
                    Which number completes the sequence: <br/>
                    <span className="text-emerald-400 font-mono text-base">2, 6, 12, 20, 30, 42, ?</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {['52', '54', '56', '58'].map((opt, i) => {
                      const isSelected = selectedDemoAnswer === i;
                      const isCorrect = i === 2;
                      let btnStyle = "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700";
                      
                      if (hasCheckedDemo) {
                        if (isCorrect) btnStyle = "border-emerald-400 bg-emerald-500/20 text-emerald-200 font-bold";
                        else if (isSelected) btnStyle = "border-rose-400 bg-rose-500/20 text-rose-200";
                      } else if (isSelected) {
                        btnStyle = "border-emerald-500 bg-emerald-500/20 text-white font-bold";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedDemoAnswer(i);
                            setHasCheckedDemo(true);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {hasCheckedDemo && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs space-y-1"
                  >
                    <span className="font-bold text-emerald-400">Rule Analysis:</span>
                    <p className="text-slate-300 text-[11px]">
                      Difference grows by +2: +4, +6, +8, +10, +12, +14. Thus 42 + 14 = <strong>56</strong> (or n(n+1): 7×8=56).
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Status pill */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">1-100 Matrix Navigator</span>
                <span className="text-emerald-400 font-bold">Unlimited Drills Active</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. WHY b20ISSB (FEATURES GRID) */}
      <section id="features" className="scroll-mt-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
            Cadet Preparation Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why b20ISSB Is Essential for Screening
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            ISSB-style intelligence screening demands speed and precision under strict time limits. b20ISSB ingrains instinctive speed and pattern precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Verbal IQ Examination */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-left space-y-5 hover:border-slate-700 transition-all shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                Verbal IQ (100 Q • 30 Min)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Experience ISSB-style verbal drills. 100 questions with 5 options, (a) to (e), number series, jumbled letters, and analogies locked to 30 minutes.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-2">
              18s / Question Target <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Non-Verbal Progressive Matrices */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-left space-y-5 hover:border-slate-700 transition-all shadow-xl">
            <div className="w-14 h-14 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                Non-Verbal IQ (50 Q • 26 Min)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The ISSB-style Non-Verbal standard allows strictly 26 minutes for 50 questions. Practice 3×3 Raven matrices, shape rotations, folding nets, and overlay subtraction logic.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-2">
              26-Min Time-Locked <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Detailed Answer Review */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-left space-y-5 hover:border-slate-700 transition-all shadow-xl">
            <div className="w-14 h-14 bg-teal-500/15 text-teal-400 border border-teal-500/30 rounded-2xl flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                Detailed Answer Review
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                See your score, skipped questions, and the correct answer with an explanation for every question.
              </p>
            </div>
            <div className="text-xs font-bold text-teal-400 flex items-center gap-1 pt-2">
              Full solution logic <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: PPDT */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-left space-y-5 shadow-xl select-none">
            <div className="w-14 h-14 bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded-2xl flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                PPDT
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Picture Perception and Discussion Test simulation with timed picture exposure, individual story writing, and group discussion preparation.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1 pt-2">
              Coming soon
            </div>
          </div>

          {/* Card 5: WAT */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-left space-y-5 shadow-xl select-none">
            <div className="w-14 h-14 bg-purple-500/15 text-purple-400 border border-purple-500/30 rounded-2xl flex items-center justify-center">
              <Zap className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                WAT (80 words, 10 seconds each)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Word Association Test drill displaying 80 words consecutively for 10 seconds each to practice immediate sentence construction under pressure.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1 pt-2">
              Coming soon
            </div>
          </div>

        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section id="faq" className="scroll-mt-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
            Candidate Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about preparing for the ISSB intelligence test with b20ISSB.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-white text-sm sm:text-base hover:bg-slate-850 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4 text-left">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="pt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-500 font-medium text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-400">b20ISSB — Unlimited IQ Practice Portal</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-semibold text-xs">
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms</a>
        </div>
        <p className="text-slate-500 text-xs text-center sm:text-right">
          b20ISSB is an independent practice platform and is not affiliated with ISSB or any armed force.
        </p>
      </footer>

    </div>
  );
};
