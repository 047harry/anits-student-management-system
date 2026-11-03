import React from 'react';

export const RetroButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'cyan', // 'cyan' | 'yellow' | 'pink' | 'green' | 'dark' | 'outline'
  size = 'md',     // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  icon: Icon
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm font-bold',
    lg: 'px-6 py-3.5 text-base font-extrabold'
  };

  const variantClasses = {
    cyan: 'bg-cyber-cyan text-black border-2 border-black dark:border-black shadow-retro hover:bg-cyan-300',
    yellow: 'bg-cyber-yellow text-black border-2 border-black dark:border-black shadow-retro hover:bg-yellow-300',
    pink: 'bg-cyber-pink text-white border-2 border-black dark:border-black shadow-retro hover:bg-pink-600',
    green: 'bg-cyber-green text-black border-2 border-black dark:border-black shadow-retro hover:bg-emerald-300',
    dark: 'bg-slate-900 text-white border-2 border-cyber-cyan shadow-retro-cyan hover:bg-slate-800',
    outline: 'bg-transparent text-black dark:text-white border-2 border-black dark:border-slate-500 shadow-retro dark:shadow-retro-sm hover:bg-black/5 dark:hover:bg-white/5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`retro-btn font-mono tracking-wider ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'cursor-pointer'
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 inline-block shrink-0" />}
      {children}
    </button>
  );
};

export default RetroButton;
