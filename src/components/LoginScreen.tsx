import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, Sparkles, User } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    if (!trimmedName) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন!');
      return;
    }
    setError('');
    onLoginSuccess(trimmedName);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="bg-[#0d9488] p-8 text-white text-center relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-800 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-900 rounded-full blur-2xl opacity-40"></div>
          
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg"
          >
            <GraduationCap className="w-9 h-9 text-emerald-300" />
          </motion.div>
          
          <h2 className="text-2xl font-bold tracking-tight mb-2">পরীক্ষার্থী লগইন</h2>
          <p className="text-teal-100 text-sm font-medium">
            বোর্ড স্ট্যান্ডার্ড নৈর্ব্যক্তিক অনুশীলনীতে অংশগ্রহণের জন্য আপনার নামটি দিন।
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0d9488]" />
                আপনার সম্পূর্ণ নাম:
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (e.target.value.trim()) setError('');
                  }}
                  placeholder="উদা: আবদুল্লাহ আল মামুন"
                  className={`w-full pl-5 pr-5 py-4 rounded-2xl border-2 bg-slate-50/50 text-slate-800 font-medium outline-none transition-all duration-200 placeholder:text-slate-400 text-lg ${
                    error ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-slate-100 focus:border-[#0d9488] focus:bg-white focus:ring-4 focus:ring-[#0d9488]/10'
                  }`}
                  maxLength={50}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 font-semibold flex items-center gap-1"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-[#0d9488] hover:bg-[#0b7e74] text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-700/20 hover:shadow-teal-800/30 transition-all duration-200 flex items-center justify-center gap-2 text-lg group cursor-pointer"
            >
              পরীক্ষা শুরু করুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            অনলাইন অটো-র‍্যান্ডমাইজড কুয়েশ্চন প্রিপারেশন ইঞ্জিন
          </div>
        </div>
      </motion.div>
    </div>
  );
};
