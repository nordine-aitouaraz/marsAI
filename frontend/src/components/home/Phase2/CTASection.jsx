import React, { useState } from 'react';
import { LinkButton } from '../../ui';
import { NAV_ROUTES, MAP_MODES } from '../../../constants/homeConstants';
import { useTranslation } from 'react-i18next';
import { heroAnimationStyles } from '../../sections/heroAnimations';
import MiniMapGTA from '../../ui/MiniMapGTA/MiniMapGTA';

export function CTASection() {
  const { t } = useTranslation();
  const [mapMode, setMapMode] = useState(MAP_MODES.GTA);

  return (
    <section className="px-6 py-16">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400"></div>
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">
              Lieu
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
            Marseille
          </h2>
        </div>

        {/* Map Container */}
        <div className="flex justify-center animate-fadeIn pb-8">
          <div className="relative w-full">
            {/* Toggle buttons */}
            <div className="flex justify-center mb-4 z-20">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-2xl hover:border-white/40 transition-all">
                <button
                  onClick={() => setMapMode(MAP_MODES.GTA)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                    mapMode === MAP_MODES.GTA
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/50'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  aria-label="Afficher le radar GTA"
                >
                  GTA
                </button>
                <button
                  onClick={() => setMapMode(MAP_MODES.REAL)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                    mapMode === MAP_MODES.REAL
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  aria-label="Afficher la carte réelle"
                >
                  MAP
                </button>
              </div>
            </div>

            {/* GTA Map */}
            {mapMode === MAP_MODES.GTA && (
              <div className="transition-all duration-500 transform animate-fadeIn">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 transition-all h-[400px] w-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div style={{ width: '100%', height: '100%' }}>
                      <MiniMapGTA />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Real Map */}
            {mapMode === MAP_MODES.REAL && (
              <div className="transition-all duration-500 transform animate-fadeIn rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-3 shadow-2xl shadow-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur h-[400px] w-full">
                  <iframe
                    title="Carte Marseille"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
                  />
                </div>
              </div>
            )}

            {/* Label */}
            <div className="text-center mt-6 text-xs font-semibold text-white/30 tracking-widest uppercase">
              {mapMode === MAP_MODES.GTA ? 'GTA' : 'MAP'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
