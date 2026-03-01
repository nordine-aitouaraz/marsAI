import { useState } from 'react';
import { MapPin } from 'lucide-react';
import MiniMapGTA from '../../ui/MiniMapGTA/MiniMapGTA';
import { MAP_MODES } from '../../../constants/homeConstants';

/**
 * Phase 1 – Carte : lieu du festival (Marseille).
 * Bascule GTA / Carte réelle (OpenStreetMap).
 */
export default function Phase1Map({
  title = 'Où nous trouver',
  subtitle = 'La Plateforme (ex Dock des Suds) — 4000 m² au centre de Marseille.',
  mapHeight = '380px',
}) {
  const [mapMode, setMapMode] = useState(MAP_MODES.REAL);

  return (
    <section className="relative py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-2">
              <MapPin className="h-4 w-4 text-brand-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                Lieu du festival
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur">
            <button
              type="button"
              onClick={() => setMapMode(MAP_MODES.GTA)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                mapMode === MAP_MODES.GTA
                  ? 'bg-brand-primary text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Vue style radar GTA"
            >
              GTA
            </button>
            <button
              type="button"
              onClick={() => setMapMode(MAP_MODES.REAL)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                mapMode === MAP_MODES.REAL
                  ? 'bg-brand-primary text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Carte Marseille"
            >
              Carte
            </button>
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-xl"
          style={{ height: mapHeight }}
        >
          {mapMode === MAP_MODES.GTA ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-950/80">
              <div className="w-full h-full min-h-[320px]">
                <MiniMapGTA />
              </div>
            </div>
          ) : (
            <iframe
              title="Carte Marseille - Lieu du festival"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
            />
          )}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500 uppercase tracking-wider">
          {mapMode === MAP_MODES.GTA ? 'Vue style radar' : 'Marseille, France'}
        </p>
      </div>
    </section>
  );
}
