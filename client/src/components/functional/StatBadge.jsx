import React from 'react';

export const StatBadge = ({ label, value, subtext, color = 'cyan', icon: Icon }) => {
  const colorMap = {
    cyan: {
      bg: 'bg-cyber-cyan',
      shadow: 'shadow-retro dark:shadow-retro-cyan',
      text: 'text-black'
    },
    yellow: {
      bg: 'bg-cyber-yellow',
      shadow: 'shadow-retro dark:shadow-retro-yellow',
      text: 'text-black'
    },
    pink: {
      bg: 'bg-cyber-pink',
      shadow: 'shadow-retro dark:shadow-retro-pink',
      text: 'text-white'
    },
    green: {
      bg: 'bg-cyber-green',
      shadow: 'shadow-retro dark:shadow-retro-green',
      text: 'text-black'
    }
  };

  const current = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={`border-2 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkSurface p-4 ${current.shadow} transition-all`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className={`p-1.5 border border-black ${current.bg} ${current.text}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline space-x-2">
        <span className="font-display font-black text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {subtext && (
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatBadge;
