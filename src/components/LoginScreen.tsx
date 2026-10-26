import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Zap, User, Target, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setError('Please enter your name or cadet ID to begin!');
      return;
    }
    setError('');
    onLoginSuccess(trimmed);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Tactical Banner */}
        <div className="bg-gradient-to-b from-slate-800/80 to-slate-900 p-8 text-center border-b border-slate-800 relative">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-950/60 border border-emerald-400/40"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cadet Portal</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">b20ISSB Candidate Access</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
            Enter your candidate name to launch unlimited 100-IQ 30-minute time-locked simulation tests.
          </p>
        </div>

        {/* Input Form */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="cadetName" className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Candidate Full Name / Cadet Call Sign:
              </label>

              <input
                type="text"
                id="cadetName"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (e.target.value.trim()) setError('');
                }}
                placeholder="e.g. Cadet Tanvir Ahmed"
                className={`w-full px-4 py-3.5 rounded-xl border bg-slate-950 text-white font-medium outline-none transition-all placeholder:text-slate-500 text-base ${
                  error 
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30' 
                    : 'border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                }`}
                maxLength={45}
                autoFocus
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-400 text-xs mt-2 font-medium flex items-center gap-1"
                >
                  <span>⚠️</span> {error}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 text-base cursor-pointer group"
            >
              <span>Enter b20ISSB Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {/* Quick Specs */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Strict 30-Minute Time-Lock countdown with auto-submit</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100 Standard Verbal & Non-Verbal IQ Questions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Unlimited procedural test generation for non-stop drills</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
