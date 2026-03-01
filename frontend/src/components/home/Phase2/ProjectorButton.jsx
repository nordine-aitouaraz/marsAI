import React from 'react';
// Images spécifiques au projecteur
import imgFilm from '../../../assets/images/film.png';
import imgIa from '../../../assets/images/ia.png';
import imgVisiteur from '../../../assets/images/visiteur.png';
import imgPays from '../../../assets/images/pays.png';

export function ProjectorButton({
  statsRevealed,
  statsFlash,
  onToggle,
  selectedGenre,
  selectedGenreIndex,
  onRotateGenre,
  isRotating,
}) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 relative w-full lg:w-auto px-4 lg:px-0">
      {/* Étiquette */}
      {statsRevealed && (
        <div className="px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur animate-fadeIn">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {selectedGenre.name}
          </span>
        </div>
      )}

      {/* Camera image button */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-full sm:w-36 lg:w-40 h-36 sm:h-40 lg:h-44 flex items-center justify-center rounded-xl bg-black border-2 transition-all cursor-pointer group overflow-hidden ${
          statsRevealed
            ? 'border-green-400/40 shadow-lg shadow-green-500/20'
            : 'border-white/10 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/30'
        }`}
        aria-label="Révéler les chiffres"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {statsRevealed && selectedGenre.projectorImage ? (
          (() => {
            try {
              const imageSrc = require(
                `../../../assets/images/${selectedGenre.projectorImage}`,
              );
              return (
                <img
                  src={imageSrc}
                  alt={`Projecteur ${selectedGenre.name}`}
                  className="w-full h-full object-cover transition-all duration-500 relative z-10"
                />
              );
            } catch (e) {
              return (
                <img
                  src={require('../../../assets/images/allumer.png')}
                  alt="Caméra allumée"
                  className="w-full h-full object-cover transition-all duration-500 relative z-10"
                />
              );
            }
          })()
        ) : (
          <img
            src={
              statsRevealed
                ? require('../../../assets/images/allumer.png')
                : require('../../../assets/images/éteint.png')
            }
            alt={statsRevealed ? 'Caméra allumée' : 'Caméra éteinte'}
            className="w-full h-full object-cover transition-all duration-500 relative z-10"
          />
        )}

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-bold text-white">CLICK</span>
          </div>
        </div>
      </button>

      {/* Toggle switch */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-500 cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 group ${
          statsRevealed
            ? 'bg-gradient-to-r from-green-600/60 to-emerald-600/60 border-green-400 focus:ring-green-500/50 shadow-lg shadow-green-500/50'
            : 'bg-gradient-to-r from-red-600/60 to-rose-600/60 border-red-400 focus:ring-red-500/50 shadow-lg shadow-red-500/30'
        }`}
        aria-label={statsRevealed ? 'Éteindre la caméra' : 'Allumer la caméra'}
        role="switch"
        aria-checked={statsRevealed}
      >
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-500 -z-10 ${
            statsRevealed
              ? 'bg-green-500/60 opacity-100'
              : 'bg-red-500/60 opacity-100'
          }`}
        />

        <span
          className={`absolute left-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed
              ? 'text-red-200 opacity-20'
              : 'text-red-50 opacity-100'
          }`}
        >
          OFF
        </span>
        <span
          className={`absolute right-1.5 text-[9px] font-extrabold transition-all duration-500 ${
            statsRevealed
              ? 'text-green-50 opacity-100'
              : 'text-green-200 opacity-20'
          }`}
        >
          ON
        </span>

        <div
          className={`relative h-5 w-5 transform rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center group-hover:shadow-2xl ${
            statsRevealed ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        >
          <div
            className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
              statsRevealed
                ? 'bg-green-500 shadow-lg shadow-green-500/80'
                : 'bg-red-500 shadow-lg shadow-red-500/80'
            }`}
          >
            {statsRevealed && (
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
            )}
            {!statsRevealed && (
              <div className="absolute inset-0 rounded-full bg-red-400 opacity-60 animate-ping" />
            )}
          </div>
        </div>
      </button>

      <span className="text-[11px] font-semibold text-white/70">
        {statsRevealed ? 'Projecteur ON' : 'Projecteur OFF'}
      </span>
    </div>
  );
}
