import React from 'react';

export function AnalyticsBar({
  label,
  percentage,
  colorFrom,
  colorTo,
  textColor,
  index,
}) {
  return (
    <div className="group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 sm:mb-1.5 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cyan-400 font-mono">
            [{index + 1}]
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide font-mono">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[9px] sm:text-xs text-cyan-400 font-mono">
            ▓▓▓
          </div>
          <span
            className={`text-xs sm:text-sm font-black text-${textColor}-400 font-mono`}
            style={{ textShadow: `0 0 10px rgba(0, 255, 255, 0.5)` }}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <div className="relative h-2 sm:h-2.5 bg-black/60 border border-cyan-400/30 overflow-hidden rounded">
        <div
          className={`h-full bg-gradient-to-r from-${colorFrom}-500 to-${colorTo}-500 relative transition-all duration-500`}
          style={{
            width: `${percentage}%`,
            boxShadow: `0 0 15px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glitch opacity-30" />
        </div>
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-cyan-400/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
