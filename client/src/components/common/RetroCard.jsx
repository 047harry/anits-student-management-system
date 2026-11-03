import React from 'react';

export const RetroCard = ({
  title,
  subtitle,
  children,
  badge,
  badgeColor = 'yellow', // 'yellow' | 'pink' | 'cyan' | 'green'
  shadow = 'retro',
  className = '',
  action
}) => {
  const badgeClasses = {
    yellow: 'bg-cyber-yellow text-black border border-black',
    pink: 'bg-cyber-pink text-white border border-black',
    cyan: 'bg-cyber-cyan text-black border border-black',
    green: 'bg-cyber-green text-black border border-black'
  };

  const shadowClasses = {
    retro: 'shadow-retro dark:shadow-retro-cyan',
    yellow: 'shadow-retro dark:shadow-retro-yellow',
    pink: 'shadow-retro dark:shadow-retro-pink',
    green: 'shadow-retro dark:shadow-retro-green',
    none: ''
  };

  return (
    <div
      className={`border-2 border-black dark:border-slate-700 bg-white dark:bg-cyber-darkSurface transition-all ${shadowClasses[shadow]} ${className}`}
    >
      {(title || badge || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black inline-block"></span>
            </div>
            {title && (
              <div className="ml-2">
                <h3 className="font-display font-bold text-sm tracking-wide uppercase text-slate-900 dark:text-slate-100">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {badge && (
              <span
                className={`px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider ${badgeClasses[badgeColor]}`}
              >
                {badge}
              </span>
            )}
            {action}
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

export default RetroCard;
