import React, { useState, useEffect } from 'react';
import { heroAnimationStyles } from '../../sections/heroAnimations';

export const HomePhase2 = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filter, setFilter] = useState('all'); // all, approved, selected

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError('Erreur lors du chargement des films');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'all')
      return movie.status === 'approved' || movie.status === 'selected';
    return movie.status === filter;
  });

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070819] flex items-center justify-center">
        <style>{heroAnimationStyles}</style>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
          <p className="mt-4 text-white/70">Chargement des films...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#070819] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl">{error}</p>
          <button
            onClick={fetchMovies}
            className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white bg-[#070819]">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
      </div>

      {/* Header */}
      <header className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur mb-6">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/80">
              Sélection Officielle
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Films en compétition
            <span className="block text-white/80 mt-2">marsAI Festival</span>
          </h1>

          <p className="text-white/70 text-lg max-w-3xl mb-8">
            Découvrez les films sélectionnés et approuvés pour le festival.
            Chaque œuvre d'une minute, une vision unique.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Tous (
              {
                movies.filter(
                  (m) => m.status === 'approved' || m.status === 'selected',
                ).length
              }
              )
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === 'approved'
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Approuvés ({movies.filter((m) => m.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('selected')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === 'selected'
                  ? 'bg-fuchsia-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Sélectionnés (
              {movies.filter((m) => m.status === 'selected').length})
            </button>
          </div>
        </div>
      </header>

      {/* Movies Grid */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          {filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
                <svg
                  className="w-10 h-10 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white/80 mb-2">
                Aucun film pour le moment
              </h3>
              <p className="text-white/60">
                Les films approuvés apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => openModal(movie)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, onClick }) => {
  const statusColors = {
    approved: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    selected: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  };

  const statusLabels = {
    approved: 'Approuvé',
    selected: 'Sélectionné',
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden cursor-pointer transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 overflow-hidden">
        {movie.thumbnail_url ? (
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur ${statusColors[movie.status]}`}
        >
          {statusLabels[movie.status]}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-violet-300 transition">
          {movie.title}
        </h3>

        {movie.filmmaker_name && (
          <p className="text-sm text-white/60 mb-3">
            Par {movie.filmmaker_name}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-white/50">
          {movie.duration && (
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {movie.duration}s
            </span>
          )}
          {movie.genre && (
            <>
              <span>•</span>
              <span>{movie.genre}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Movie Modal Component
const MovieModal = ({ movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0a0b1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video player */}
        <div className="relative aspect-video bg-black">
          {movie.video_url ? (
            <video
              className="w-full h-full"
              controls
              autoPlay
              src={movie.video_url}
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/60">Vidéo non disponible</p>
            </div>
          )}
        </div>

        {/* Movie info */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                {movie.title}
              </h2>
              {movie.filmmaker_name && (
                <p className="text-white/70">
                  Réalisé par{' '}
                  <span className="font-semibold text-white">
                    {movie.filmmaker_name}
                  </span>
                </p>
              )}
            </div>
          </div>

          {movie.synopsis && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                Synopsis
              </h3>
              <p className="text-white/80 leading-relaxed">{movie.synopsis}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            {movie.duration && (
              <div>
                <p className="text-xs text-white/50 mb-1">Durée</p>
                <p className="text-white font-semibold">{movie.duration}s</p>
              </div>
            )}
            {movie.genre && (
              <div>
                <p className="text-xs text-white/50 mb-1">Genre</p>
                <p className="text-white font-semibold">{movie.genre}</p>
              </div>
            )}
            {movie.production_year && (
              <div>
                <p className="text-xs text-white/50 mb-1">Année</p>
                <p className="text-white font-semibold">
                  {movie.production_year}
                </p>
              </div>
            )}
            {movie.country && (
              <div>
                <p className="text-xs text-white/50 mb-1">Pays</p>
                <p className="text-white font-semibold">{movie.country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
