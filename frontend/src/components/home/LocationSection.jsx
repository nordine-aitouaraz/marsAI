import React, { useState } from 'react';
import MiniMapGTA from '../ui/MiniMapGTA/MiniMapGTA';
import { LinkButton } from '../ui';
import { NAV_ROUTES, MAP_MODES } from '../../constants/homeConstants';
import { useTranslation } from 'react-i18next';
import { heroAnimationStyles } from '../sections/heroAnimations';

export function LocationSection() {
  const { t } = useTranslation();
  const [mapMode, setMapMode] = useState(MAP_MODES.GTA);

  return (
    <section className="px-6 pb-24">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          {/* Contenu texte */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur animate-fadeIn">
            <div className="text-xs font-semibold text-white/60">Lieu</div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
              {t('home.location.title')}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {t('home.location.desc')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton to={NAV_ROUTES.CONTACT} variant="secondary">
                Infos pratiques
              </LinkButton>
              <LinkButton to={NAV_ROUTES.ABOUT} variant="tertiary">
                En savoir plus →
              </LinkButton>
            </div>
          </div>

          {/* Maps */}
          <div className="flex justify-center lg:justify-end animate-fadeIn">
            <div className="relative w-full lg:w-auto px-4 lg:px-0">
              {/* Toggle buttons */}
              <div className="absolute -top-10 lg:-top-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                <button
                  onClick={() => setMapMode(MAP_MODES.GTA)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    mapMode === MAP_MODES.GTA
                      ? 'bg-violet-500 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-label="Afficher le radar GTA"
                >
                  GTA
                </button>
                <button
                  onClick={() => setMapMode(MAP_MODES.REAL)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    mapMode === MAP_MODES.REAL
                      ? 'bg-violet-500 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-label="Afficher la carte réelle"
                >
                  MAP
                </button>
              </div>

              {/* GTA Map */}
              {mapMode === MAP_MODES.GTA && (
                <div className="transition-all duration-500">
                  <MiniMapGTA />
                </div>
              )}

              {/* Real Map */}
              {mapMode === MAP_MODES.REAL && (
                <div className="transition-all duration-500 rounded-[32px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
                  <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                    <iframe
                      title="Carte Marseille"
                      className="h-[300px] sm:h-[360px] w-full sm:w-[360px]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
                    />
                  </div>
                </div>
              )}

              {/* Label */}
              <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/50 font-semibold">
                {mapMode === MAP_MODES.GTA
                  ? 'Radar GTA-style'
                  : 'Carte réelle Marseille'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
