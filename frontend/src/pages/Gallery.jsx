import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function getYouTubeThumbnail(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

export default function Gallery() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        // /api/movies -> films au statut "selected"
        const data = await api.get('/movies');
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err?.message || 'Impossible de charger les films sélectionnés.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#070819] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <header className="mb-8 md:mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-2">
            MarsAI Festival
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
            Galerie des films sélectionnés
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Parcourez les courts-métrages sélectionnés pour le festival. Touchez
            une vignette pour ouvrir la vidéo.
          </p>
        </header>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 rounded-full border-2 border-t-transparent border-violet-400 animate-spin" />
              <p className="mt-4 text-sm text-white/70">
                Chargement des films sélectionnés...
              </p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-md mx-auto mb-8 rounded-lg border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-100 text-center">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="py-16 text-center text-white/70 text-sm">
            Aucun film sélectionné n&apos;est disponible pour le moment.
          </div>
        )}

        {!loading && movies.length > 0 && (
          <section aria-label="Galerie des films sélectionnés">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {movies.map((movie) => {
                const thumb = getYouTubeThumbnail(movie.youtube_url);
                return (
                  <Link
                    key={movie.id}
                    to={`/watch/${movie.id}`}
                    className="group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-violet-400/60 hover:bg-white/10 transition-colors"
                  >
                    <div className="relative aspect-video bg-black">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={movie.original_title || 'Vignette du film'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                          Aperçu indisponible
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/30 shadow-lg group-hover:bg-violet-500/80 transition-colors">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pt-2 pb-3">
                      <h2 className="text-xs md:text-sm font-semibold text-white line-clamp-2 mb-1">
                        {movie.original_title || 'Sans titre'}
                      </h2>
                      <p className="text-[11px] text-white/50 line-clamp-1">
                        {movie.synopsis_original ||
                          'Court-métrage sélectionné pour le festival.'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
