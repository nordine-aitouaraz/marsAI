import React from 'react';
import { ProjectorButton } from './ProjectorButton';
import { StatsPanel } from './StatsPanel';
import { useAudioContext } from '../../../hooks/useAudioContext';
import { useTranslation } from 'react-i18next';
import { heroAnimationStyles } from '../../sections/heroAnimations';

// Jeux de données locaux (spécifiques au projecteur)
const FILM_GENRES = [
  {
    name: 'TOUS',
    icon: '⭐',
    color: 'from-violet-500 to-fuchsia-600',
    projectorImage: null,
    stats: [
      {
        icon: '🔗',
        title: 'Visiteurs',
        subtitle: 'Au festival',
        value: 1950,
        prefix: '',
        gradient: 'from-violet-600 to-purple-700',
      },
      {
        icon: '💡',
        title: 'Professionnels IA',
        subtitle: 'Experts mobilisés',
        value: 39,
        prefix: '+',
        gradient: 'from-fuchsia-600 to-pink-700',
      },
      {
        icon: '🎬',
        title: 'Films soumis',
        subtitle: 'Sélection mondiale',
        value: 390,
        prefix: '+',
        gradient: 'from-amber-500 to-orange-700',
      },
      {
        icon: '🌍',
        title: 'Pays représentés',
        subtitle: 'Portée mondiale',
        value: 78,
        prefix: '+',
        gradient: 'from-cyan-500 to-blue-700',
      },
    ],
    analytics: [
      {
        id: 1,
        label: 'COURTS',
        percentage: 65,
        gradient: 'from-cyan-500 to-blue-600',
      },
      {
        id: 2,
        label: 'DOCS',
        percentage: 42,
        gradient: 'from-fuchsia-500 to-pink-600',
      },
      {
        id: 3,
        label: 'EXPO',
        percentage: 28,
        gradient: 'from-purple-500 to-violet-600',
      },
      {
        id: 4,
        label: 'ANIMS',
        percentage: 55,
        gradient: 'from-amber-500 to-orange-600',
      },
    ],
  },
  {
    name: 'Visiteurs',
    icon: '🔗',
    color: 'from-violet-500 to-purple-600',
    projectorImage: 'projector-visitors.png',
    stats: [
      {
        icon: '🔗',
        title: 'Visiteurs',
        subtitle: 'Au festival',
        value: 1950,
        prefix: '',
        gradient: 'from-violet-600 to-purple-700',
      },
    ],
    analytics: [
      {
        id: 1,
        label: 'COURTS',
        percentage: 65,
        gradient: 'from-cyan-500 to-blue-600',
      },
      {
        id: 2,
        label: 'DOCS',
        percentage: 42,
        gradient: 'from-fuchsia-500 to-pink-600',
      },
      {
        id: 3,
        label: 'EXPO',
        percentage: 28,
        gradient: 'from-purple-500 to-violet-600',
      },
      {
        id: 4,
        label: 'ANIMS',
        percentage: 55,
        gradient: 'from-amber-500 to-orange-600',
      },
    ],
  },
  {
    name: 'Professionnels IA',
    icon: '💡',
    color: 'from-fuchsia-500 to-pink-600',
    projectorImage: 'projector-professionals.png',
    stats: [
      {
        icon: '💡',
        title: 'Professionnels IA',
        subtitle: 'Experts mobilisés',
        value: 39,
        prefix: '+',
        gradient: 'from-fuchsia-600 to-pink-700',
      },
    ],
    analytics: [
      {
        id: 1,
        label: 'COURTS',
        percentage: 65,
        gradient: 'from-cyan-500 to-blue-600',
      },
      {
        id: 2,
        label: 'DOCS',
        percentage: 42,
        gradient: 'from-fuchsia-500 to-pink-600',
      },
      {
        id: 3,
        label: 'EXPO',
        percentage: 28,
        gradient: 'from-purple-500 to-violet-600',
      },
      {
        id: 4,
        label: 'ANIMS',
        percentage: 55,
        gradient: 'from-amber-500 to-orange-600',
      },
    ],
  },
  {
    name: 'Films soumis',
    icon: '🎬',
    color: 'from-amber-500 to-orange-600',
    projectorImage: 'projector-films.png',
    stats: [
      {
        icon: '🎬',
        title: 'Films soumis',
        subtitle: 'Sélection mondiale',
        value: 390,
        prefix: '+',
        gradient: 'from-amber-500 to-orange-700',
      },
    ],
    analytics: [
      {
        id: 1,
        label: 'COURTS',
        percentage: 65,
        gradient: 'from-cyan-500 to-blue-600',
      },
      {
        id: 2,
        label: 'DOCS',
        percentage: 42,
        gradient: 'from-fuchsia-500 to-pink-600',
      },
      {
        id: 3,
        label: 'EXPO',
        percentage: 28,
        gradient: 'from-purple-500 to-violet-600',
      },
      {
        id: 4,
        label: 'ANIMS',
        percentage: 55,
        gradient: 'from-amber-500 to-orange-600',
      },
    ],
  },
  {
    name: 'Pays représentés',
    icon: '🌍',
    color: 'from-cyan-500 to-blue-600',
    projectorImage: 'projector-countries.png',
    stats: [
      {
        icon: '🌍',
        title: 'Pays représentés',
        subtitle: 'Portée mondiale',
        value: 78,
        prefix: '+',
        gradient: 'from-cyan-500 to-blue-700',
      },
    ],
    analytics: [
      {
        id: 1,
        label: 'COURTS',
        percentage: 65,
        gradient: 'from-cyan-500 to-blue-600',
      },
      {
        id: 2,
        label: 'DOCS',
        percentage: 42,
        gradient: 'from-fuchsia-500 to-pink-600',
      },
      {
        id: 3,
        label: 'EXPO',
        percentage: 28,
        gradient: 'from-purple-500 to-violet-600',
      },
      {
        id: 4,
        label: 'ANIMS',
        percentage: 55,
        gradient: 'from-amber-500 to-orange-600',
      },
    ],
  },
];

export function StatsSection() {
  const { t } = useTranslation();
  const [statsRevealed, setStatsRevealed] = React.useState(false);
  const [statsFlash, setStatsFlash] = React.useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = React.useState(0);
  const [isRotating, setIsRotating] = React.useState(false);
  const playCameraSound = useAudioContext();

  const handleStatsReveal = () => {
    const nextState = !statsRevealed;
    setStatsRevealed(nextState);
    if (nextState) playCameraSound();
    setStatsFlash(true);
    window.setTimeout(() => setStatsFlash(false), 1200);
  };

  const rotateGenre = () => {};

  const currentGenre = FILM_GENRES[0];
  const filteredStats = currentGenre.stats;
  const filteredAnalytics = currentGenre.analytics;

  return (
    <section className="px-4 pb-12">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold text-white/80">
              Résultats & Projections
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            {t('home.stats.title')}
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/70">
            {t('home.stats.desc')}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {statsRevealed && (
            <>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none transition-all duration-700"
                style={{
                  width: '400px',
                  height: '400px',
                  background:
                    'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="absolute inset-0 -z-10 pointer-events-none transition-all duration-700 rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
                }}
              />
            </>
          )}

          <div className="relative flex flex-col lg:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
            <ProjectorButton
              statsRevealed={statsRevealed}
              statsFlash={statsFlash}
              onToggle={handleStatsReveal}
              selectedGenre={currentGenre}
              selectedGenreIndex={selectedGenreIndex}
              onRotateGenre={rotateGenre}
              isRotating={isRotating}
            />

            <StatsPanel
              statsRevealed={statsRevealed}
              statsData={filteredStats}
              analyticsData={filteredAnalytics}
              currentGenre={currentGenre}
              selectedGenreIndex={selectedGenreIndex}
              total={FILM_GENRES.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
