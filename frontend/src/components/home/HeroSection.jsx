import React from 'react';
import { InfoRow, LinkButton } from '../ui';
import { NAV_ROUTES } from '../../constants/homeConstants';
import { useTranslation } from 'react-i18next';
import { heroAnimationStyles } from '../sections/heroAnimations';
import { HeroStats } from './HeroStats';

export function HeroSection({
  title,
  subtitle,
  ctas,
  statsCards,
  videoSrc = '/video/video4.mp4',
}) {
  const { t } = useTranslation();

  const heroCtas = ctas || [
    {
      to: NAV_ROUTES.PROGRAM,
      label: t('home.hero.cta.program') || 'Voir la programmation',
      variant: 'primary',
    },
    {
      to: NAV_ROUTES.ABOUT,
      label: t('home.hero.cta.about') || 'Lire le manifeste',
      variant: 'secondary',
    },
  ];
  return (
    <section className="relative min-h-screen w-full overflow-hidden pb-20">
      <style>{heroAnimationStyles}</style>
      {/* Vidéo */}
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-115"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        aria-label="Vidéo de présentation du festival"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Contenu centré */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <br />
        <br />
        <h1
          className="mt-8 max-w-5xl text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl animate-fadeInUp"
          style={{ animationDelay: '0.1s' }}
        >
          {title || t('home.hero.title')}
        </h1>

        <p
          className="mt-7 max-w-2xl text-base leading-8 text-white/85 md:text-lg animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          {subtitle || t('home.hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-4 animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          {heroCtas.map((cta) => (
            <LinkButton
              key={cta.to}
              to={cta.to}
              variant={cta.variant || 'primary'}
            >
              {cta.label}
            </LinkButton>
          ))}
        </div>

        {statsCards ? (
          <HeroStats cards={statsCards} />
        ) : (
          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 animate-fadeIn">
            <InfoRow k="Format" v="≈ 60 sec" />
            <InfoRow k="Accès" v="Ouvert" />
            <InfoRow k="Ville" v="Marseille" />
          </div>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 animate-bounce">
          ↓ Découvrir
        </div>
      </div>
    </section>
  );
}
