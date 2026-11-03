import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Retro Light Mode' : 'Switch to Cyber Dark Mode'}
      className="p-2 border-2 border-black dark:border-cyber-cyan bg-white dark:bg-cyber-darkSurface text-black dark:text-cyber-cyan shadow-retro dark:shadow-retro-cyan hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-cyber-yellow" />
      ) : (
        <Moon className="w-5 h-5 text-slate-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
