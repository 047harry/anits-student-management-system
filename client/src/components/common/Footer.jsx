import React from 'react';
import { Terminal, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t-4 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkBg py-8 transition-colors select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <span className="font-display font-black text-lg text-slate-900 dark:text-white">
              ANITS // CAMPUS DIGITAL CORE
            </span>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-cyber-yellow text-black border border-black">
              AUTONOMOUS B.TECH PORTAL
            </span>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 text-center md:text-left">
            <span>Anil Neerukonda Institute of Technology & Sciences (ANITS) • Full Stack MERN Architecture</span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-cyber-cyan" />
              JWT Auth 256-bit
            </span>
            <span className="flex items-center">
              <Terminal className="w-4 h-4 mr-1 text-cyber-yellow" />
              Atlas Cloud Online
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
