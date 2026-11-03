import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import LiveClockWidget from '../class/LiveClockWidget';
import RetroButton from './RetroButton';
import { LogOut, User, LayoutDashboard, HelpCircle, Shield, Award } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { user, isAuthenticated, isTeacher, isStudent, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b-4 border-black dark:border-slate-800 bg-white/95 dark:bg-cyber-darkBg/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ANITS College Logo / Brand */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 border-2 border-black bg-cyber-yellow text-black flex items-center justify-center font-display font-black text-xl shadow-retro group-hover:-translate-y-0.5 transition-all">
              🏛️
            </div>
            <div>
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter uppercase text-slate-900 dark:text-white">
                ANITS<span className="text-cyber-pink">.</span>EDU
              </span>
              <span className="hidden sm:block text-[9px] font-mono tracking-widest text-slate-500 dark:text-slate-400">
                ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES
              </span>
            </div>
          </div>

          {/* Center: Live Terminal Heartbeat (React Class Component) */}
          <div className="hidden lg:block">
            <LiveClockWidget />
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1.5 border-2 border-black dark:border-cyber-cyan font-mono text-xs font-bold uppercase transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-cyber-cyan text-black shadow-retro-sm'
                      : 'bg-transparent text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 inline mr-1" />
                  Dashboard
                </button>

                <button
                  onClick={() => setCurrentView('quiz')}
                  className={`px-3 py-1.5 border-2 border-black dark:border-cyber-yellow font-mono text-xs font-bold uppercase transition-all ${
                    currentView === 'quiz'
                      ? 'bg-cyber-yellow text-black shadow-retro-sm'
                      : 'bg-transparent text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 inline mr-1" />
                  Assessment
                </button>

                {/* User Role Tag */}
                <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 border-2 border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono">
                  {isTeacher ? (
                    <Shield className="w-3.5 h-3.5 text-cyber-pink" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-cyber-cyan" />
                  )}
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[100px]">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-black text-white dark:bg-cyber-yellow dark:text-black">
                    {user?.role}
                  </span>
                </div>

                <RetroButton
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  icon={LogOut}
                  title="Sign Out"
                >
                  Exit
                </RetroButton>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <RetroButton
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentView('login')}
                >
                  Sign In
                </RetroButton>
                <RetroButton
                  size="sm"
                  variant="yellow"
                  onClick={() => setCurrentView('register')}
                >
                  Register
                </RetroButton>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
