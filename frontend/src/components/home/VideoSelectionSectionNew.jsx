import React, { useState, useEffect, useRef } from 'react';
import { useAudioContext } from '../../hooks/useAudioContext';
import { heroAnimationStyles } from '../sections/heroAnimations';

// Import des images
import imgTout from '../../assets/images/tout.png';
import imgFilm from '../../assets/images/film.png';
import imgIa from '../../assets/images/ia.png';
import imgVisiteur from '../../assets/images/visiteur.png';

// Import des projecteurs
import projectorFilms from '../../assets/images/projector-films.png';
import projectorCountries from '../../assets/images/projector-countries.png';
import projectorProfessionals from '../../assets/images/projector-professionals.png';
import projectorVisitors from '../../assets/images/projector-visitors.png';

// (contenu identique à la source — inchangé pour la copie)

export default function VideoSelectionSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isCardInserting, setIsCardInserting] = useState(false);

  const playCameraSound = useAudioContext();
  const wheelRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        setMovies([]);
        setLoading(false);
        return;
      }
      const data = await response.json().catch(() => []);
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const keyStats = [
    {
      label: 'Films sélectionnés',
      value: '128',
      image: projectorFilms,
      accent: 'from-amber-400 to-orange-500',
    },
    {
      label: 'Pays représentés',
      value: '78',
      image: projectorCountries,
      accent: 'from-cyan-400 to-blue-500',
    },
    {
      label: 'Professionnels',
      value: '320+',
      image: projectorProfessionals,
      accent: 'from-fuchsia-400 to-violet-500',
    },
    {
      label: 'Visiteurs',
      value: '12k',
      image: projectorVisitors,
      accent: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-indigo-950/40 to-black py-20 px-6">
      <style>{heroAnimationStyles}</style>
      <style>{`
        @keyframes cameraPulse {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
          50% { transform: translateY(-4px) scale(1.01); box-shadow: 0 30px 80px rgba(34,211,238,0.25); }
        }
        @keyframes statFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
            CHIFFRES CLÉS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto" />
        </div>

        <div className="relative flex items-center justify-center">
          {/* Cartes stats autour de la caméra */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
            {keyStats.slice(0, 2).map((stat, idx) => (
              <div
                key={stat.label}
                className="w-52 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                style={{
                  animation: `statFloat 3s ease-in-out ${idx * 0.2}s infinite`,
                }}
              >
                <div
                  className={`h-1.5 w-full rounded-full bg-gradient-to-r ${stat.accent}`}
                />
                <div className="mt-3 text-2xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
            {keyStats.slice(2).map((stat, idx) => (
              <div
                key={stat.label}
                className="w-52 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                style={{
                  animation: `statFloat 3s ease-in-out ${(idx + 2) * 0.2}s infinite`,
                }}
              >
                <div
                  className={`h-1.5 w-full rounded-full bg-gradient-to-r ${stat.accent}`}
                />
                <div className="mt-3 text-2xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Caméra centrale */}
          <div className="relative">
            <div
              className="relative w-[320px] h-[220px] rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
              style={{ animation: 'cameraPulse 4s ease-in-out infinite' }}
            >
              <div className="absolute top-4 left-4 h-4 w-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <div className="absolute top-6 right-6 h-6 w-14 rounded-full bg-white/10" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-2 shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black/40">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 h-2 w-44 -translate-x-1/2 rounded-full bg-white/10" />
            </div>

            {/* Projecteurs */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-6">
              {[
                projectorFilms,
                projectorCountries,
                projectorProfessionals,
                projectorVisitors,
              ].map((img, idx) => (
                <div key={idx} className="h-10 w-16 opacity-70">
                  <img
                    src={img}
                    alt="Projecteur"
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Version mobile des stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:hidden">
          {keyStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className={`h-1.5 w-full rounded-full bg-gradient-to-r ${stat.accent}`}
              />
              <div className="mt-3 text-xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
