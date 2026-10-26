import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Target, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

interface LoginScreenProps {
  onLoginSuccess: (user: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        console.warn('Google Sign-In popup was closed by user.');
        setError('Sign-in was cancelled. Click "Continue with Google" whenever you are ready.');
      } else if (err.code === 'auth/popup-blocked') {
        console.warn('Popup was blocked by the browser.');
        setError('Sign-in popup was blocked by your browser. Please allow popups for this site and try again.');
      } else {
        console.error('Google Sign-In Error:', err);
        setError(err.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
            Sign in with your Google account to track your test history, view the competitive leaderboard, and take simulation drills.
          </p>
        </div>

        {/* Authentication Form */}
        <div className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2.5"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-rose-600/30 hover:bg-rose-600/50 text-white font-bold py-2 px-3 rounded-xl border border-rose-500/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try again</span>
              </button>
            </motion.div>
          )}

          <motion.button
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-3 text-base cursor-pointer group ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin text-white" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
          </motion.button>

          {/* Quick Specs */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Persistent cloud progress sync across devices</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full access to competitive Verbal & Non-Verbal Leaderboards</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Privacy settings: customizable display name & public visibility</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
