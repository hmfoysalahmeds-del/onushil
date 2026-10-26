import React from 'react';
import { LogOut, LayoutDashboard, Shield, Zap, Award, Compass } from 'lucide-react';

interface NavbarProps {
  username: string | null;
  currentScreen: 'landing' | 'login' | 'dashboard' | 'quiz' | 'results';
  onLogout: () => void;
  onNavigate: (screen: 'landing' | 'login' | 'dashboard' | 'quiz' | 'results') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ username, currentScreen, onLogout, onNavigate }) => {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                b20<span className="text-emerald-400">ISSB</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider hidden sm:inline-block">
                IQ Portal
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-bold">
              Unlimited IQ Practice
            </span>
          </div>
        </div>

        {/* Center Pill: 100 IQ / 30 Min Reminder */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-semibold text-slate-300 shadow-inner">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>ISSB-style simulation: <strong className="text-emerald-400">100 IQ</strong> in <strong className="text-amber-300">30 min</strong></span>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          {/* Candidate Dashboard Link */}
          {username && currentScreen !== 'dashboard' && currentScreen !== 'quiz' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer text-xs sm:text-sm flex items-center gap-1.5 border border-slate-700 hover:border-emerald-500/50"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Portal</span>
            </button>
          )}

          {/* If NOT logged in and on landing, Start CTA */}
          {!username && currentScreen === 'landing' && (
            <button
              onClick={() => onNavigate('login')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold px-5 py-2 rounded-xl transition-all duration-200 cursor-pointer text-xs sm:text-sm shadow-md shadow-emerald-950/40 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Join Drill</span>
            </button>
          )}

          {/* Logged in state */}
          {username && (
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700 hidden sm:flex items-center gap-2.5 shadow-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400"></div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Cadet</span>
                  <span className="text-xs font-bold text-white tracking-wide truncate max-w-[120px]">{username}</span>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-all duration-200 group relative cursor-pointer border border-transparent hover:border-slate-700"
                title="Exit / Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="absolute hidden group-hover:block bg-slate-950 text-slate-200 text-[10px] px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20 border border-slate-800">
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
