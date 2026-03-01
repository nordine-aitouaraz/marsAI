import React from 'react';
import { useCountUp } from '../../../hooks/useCountUp';

export function StatCard({
  icon,
  title,
  subtitle,
  value,
  prefix,
  gradient,
  revealed,
  isLarge = false,
  isActive = false,
  index = 0,
  total = 1,
}) {
  const [count, ref] = useCountUp(value, 4000, true, revealed);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border-2 ${isActive ? 'border-violet-500/80 shadow-2xl shadow-violet-500/30' : 'border-white/10 shadow-lg shadow-black/50'} ${isLarge ? 'p-8 flex flex-col justify-center items-start' : 'p-4'} backdrop-blur-xl transition-all duration-300 h-full`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} ${isActive ? 'shadow-2xl' : 'shadow-lg'}`}
        style={{
          boxShadow: isActive
            ? `0 0 16px 0 rgba(147, 51, 234, 0.6)`
            : `0 0 8px 0 rgba(147, 51, 234, 0.3)`,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col">
        <div
          className={`${isLarge ? 'mb-6' : 'mb-3'} pb-2 border-b border-white/5`}
        >
          <div className="flex justify-between items-start mb-2">
            <div
              className={`${isLarge ? 'text-xl' : 'text-sm'} font-bold text-white/95 uppercase tracking-wider`}
            >
              {title}
            </div>
            {isLarge && (
              <div className="text-xs text-white/30 font-mono uppercase tracking-wider">
                {index + 1}/{total}
              </div>
            )}
          </div>
          <div
            className={`${isLarge ? 'text-base' : 'text-xs'} text-white/40 font-mono`}
          >
            {subtitle}
          </div>
        </div>
        <div
          ref={ref}
          className={`flex-1 flex items-center ${isLarge ? 'py-4' : 'py-2'} relative`}
        >
          {isActive && isLarge && (
            <div className="absolute inset-0 scanline-overlay pointer-events-none" />
          )}
          <div
            className={`${isLarge ? 'text-8xl leading-tight' : 'text-5xl'} font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent tracking-tight drop-shadow-2xl ${revealed ? 'animate-countUp' : ''}`}
          >
            {prefix}
            {count.toLocaleString('fr-FR')}
          </div>
        </div>
        <div
          className={`${isLarge ? 'mt-8 pt-4' : 'mt-3 pt-2'} border-t border-white/5 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`${isLarge ? 'w-3 h-3' : 'w-2 h-2'} rounded-full ${isActive ? 'bg-gradient-to-r ' + gradient + ' shadow-lg' : 'bg-white/20'} ${isActive ? 'animate-pulse' : ''}`}
              style={{
                boxShadow: isActive
                  ? `0 0 12px 0 rgba(147, 51, 234, 0.6)`
                  : 'none',
              }}
            />
            <div
              className={`${isLarge ? 'text-xs' : 'text-[10px]'} text-white/40 uppercase tracking-widest font-mono`}
            >
              {isActive ? 'LIVE' : 'READY'}
            </div>
          </div>
          <div
            className={`${isLarge ? 'text-xs' : 'text-[10px]'} text-white/30 font-mono uppercase tracking-wider`}
          >
            {value.toLocaleString('fr-FR')}
          </div>
        </div>
      </div>
      <div className="grain-overlay absolute inset-0" />
      <div
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
}
