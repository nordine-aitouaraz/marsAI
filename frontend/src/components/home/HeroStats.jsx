import React from 'react';

export function HeroStats({ cards = [] }) {
  return (
    <div
      className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 animate-fadeInUp"
      style={{ animationDelay: '0.4s' }}
    >
      {cards.map((card) => (
        <div
          key={card.value}
          className={`group rounded-2xl border backdrop-blur-lg transition-all ${
            card.colorClass === 'cyan'
              ? 'border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
              : card.colorClass === 'violet'
                ? 'border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                : 'border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 hover:border-fuchsia-400/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]'
          } px-6 py-5`}
        >
          <div
            className={`text-3xl font-black ${
              card.colorClass === 'cyan'
                ? 'text-cyan-400'
                : card.colorClass === 'violet'
                  ? 'text-violet-400'
                  : 'text-fuchsia-400'
            }`}
          >
            {card.value}
          </div>
          <div className="mt-1 text-sm font-semibold text-white/70">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
