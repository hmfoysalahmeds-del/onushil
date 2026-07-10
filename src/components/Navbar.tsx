import React from 'react';
import { LogOut, Play, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  username: string | null;
  currentScreen: 'landing' | 'login' | 'dashboard' | 'quiz' | 'results';
  onLogout: () => void;
  onNavigate: (screen: 'landing' | 'login' | 'dashboard' | 'quiz' | 'results') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ username, currentScreen, onLogout, onNavigate }) => {
  return (
    <nav className="bg-[#0d9488] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-white p-1 rounded-xl shadow-inner border border-teal-500/30">
            <img 
              src="https://nowzyplus.live/upload/ChatGPT%20Image%20Jul%2010%2C%202026%2C%2011_17_04%20PM.png" 
              alt="Onushil Logo" 
              className="w-8 h-8 rounded-lg object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black tracking-tight leading-none">Onushil</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-teal-100 font-bold">HSC প্রস্তুতি</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* If the user is on landing page and already has username */}
          {username && currentScreen === 'landing' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer text-sm flex items-center gap-1.5 border border-white/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ড্যাশবোর্ড</span>
            </button>
          )}

          {/* If they are NOT logged in and on landing, show the requested Start CTA */}
          {!username && currentScreen === 'landing' && (
            <button
              onClick={() => onNavigate('login')}
              className="bg-white text-[#0d9488] hover:bg-teal-50 font-extrabold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-sm shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start</span>
            </button>
          )}

          {username && (
            <div className="flex items-center gap-3">
              <div className="bg-teal-800/50 px-4 py-2 rounded-xl border border-teal-600/30 hidden sm:flex items-center gap-3 shadow-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium tracking-wide">পরীক্ষার্থী: {username}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="p-2 text-teal-100 hover:text-white hover:bg-teal-800/60 rounded-xl transition-all duration-200 group relative cursor-pointer"
                title="লগআউট করুন"
              >
                <LogOut className="w-5 h-5" />
                <span className="absolute hidden group-hover:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                  লগআউট
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
