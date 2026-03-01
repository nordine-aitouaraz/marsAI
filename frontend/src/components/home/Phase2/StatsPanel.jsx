import React from 'react';
import { StatCard, AnalyticsBar } from './HomeWidgets';
import ProjectorBeam from './ProjectorBeam';
import Particles from './Particles';

export function AnalyticsPanel({ statsRevealed, analyticsData }) {
  return (
    <div
      className={`flex-1 transition-all duration-700 delay-150 ${
        statsRevealed
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8 pointer-events-none'
      }`}
      aria-hidden={!statsRevealed}
    >
      <div className="relative bg-black/90 border-2 border-cyan-400/40 rounded-lg p-1.5 md:p-2 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-lg shadow-cyan-500/20">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline opacity-50" />
        </div>

        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-magenta-400/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 pb-2 border-b border-cyan-400/20 gap-2">
          <div>
            <h3
              className="text-xs font-black text-cyan-400/90 uppercase tracking-widest"
              style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}
            >
              ≡ DISTRIBUTION
            </h3>
            <div className="text-[9px] text-magenta-400/70 font-mono mt-0.5">
              SYS.ANALYTICS_v2.1
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 border border-cyan-400/40 rounded">
            <div
              className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"
              style={{ boxShadow: '0 0 6px rgba(0, 255, 255, 0.5)' }}
            />
            <span className="text-[10px] font-bold text-cyan-300/80 font-mono">
              ACTIVE
            </span>
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2 flex-1 relative z-10">
          {analyticsData.map((item, index) => (
            <AnalyticsBar
              key={index}
              label={item.label}
              percentage={item.percentage}
              colorFrom={item.colorFrom}
              colorTo={item.colorTo}
              textColor={item.textColor}
              index={index}
            />
          ))}
        </div>

        <div className="relative z-10 mt-2 pt-2 border-t border-cyan-400/30">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cyan-500/10 border border-cyan-400/40 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-cyan-400/20 text-xl font-mono">
                ≡
              </div>
              <p className="text-[8px] text-cyan-300 uppercase tracking-wider font-mono mb-0.5">
                AVG_RATE
              </p>
              <p
                className="text-sm font-black text-cyan-400 font-mono"
                style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
              >
                47.5%
              </p>
            </div>
            <div className="bg-magenta-500/10 border border-magenta-400/40 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-magenta-400/20 text-xl font-mono">
                ▲
              </div>
              <p className="text-[8px] text-magenta-300 uppercase tracking-wider font-mono mb-0.5">
                TOP_CAT
              </p>
              <p
                className="text-xs font-black text-magenta-400 font-mono uppercase"
                style={{ textShadow: '0 0 10px rgba(255, 0, 255, 0.8)' }}
              >
                Courts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsPanel({
  statsRevealed,
  statsData,
  analyticsData,
  currentGenre,
  selectedGenreIndex,
  total = 1,
}) {
  const [showParticles] = React.useState(false);

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: i,
        tx: (Math.random() - 0.5) * 30 + 'px',
        delay: i * 0.15 + 's',
      });
    }
    return particles;
  };

  const particles = React.useMemo(() => generateParticles(), []);

  const noiseDataUrl =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

  return (
    <>
      {/* Beam / glow / flash are extracted to ProjectorBeam; particles extracted to Particles */}
      <ProjectorBeam statsRevealed={statsRevealed} />
      <Particles statsRevealed={statsRevealed} particles={particles} />

      {/* Main panel */}
      <div
        className={`relative flex-1 rounded-lg p-2 sm:p-3 lg:max-w-3xl transition-all duration-700 overflow-hidden w-full ${statsRevealed ? 'bg-white/[0.05] border border-white/10 shadow-2xl shadow-violet-500/30' : 'bg-black/98 border border-black/50'}`}
      >
        {statsRevealed && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay animate-grain"
            style={{
              backgroundImage: noiseDataUrl,
              backgroundSize: '200px 200px',
            }}
          />
        )}
        {statsRevealed && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)',
            }}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-2 md:gap-4 h-full">
          <div className="flex-1">
            <div
              className={`h-full transition-all duration-700 ${statsRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}
              aria-hidden={!statsRevealed}
            >
              <div
                className={`grid gap-2 ${statsData.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
              >
                {statsData.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    subtitle={stat.subtitle}
                    value={stat.value}
                    prefix={stat.prefix}
                    revealed={statsRevealed}
                    gradient={stat.gradient}
                    isLarge={statsData.length === 1}
                    isActive={statsRevealed}
                    index={selectedGenreIndex}
                    total={total}
                  />
                ))}
              </div>
            </div>
          </div>

          <AnalyticsPanel
            statsRevealed={statsRevealed}
            analyticsData={analyticsData}
          />
        </div>
      </div>
    </>
  );
}
