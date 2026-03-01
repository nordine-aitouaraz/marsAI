import React, { useState, useEffect } from 'react';
import { heroAnimationStyles } from '../../sections/heroAnimations';

export function HeroCameraWithAPI() {
  const [selectedGenreIdx, setSelectedGenreIdx] = useState(0);
  const [isInserting, setIsInserting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hologramVisible, setHologramVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rotation, setRotation] = useState(0);

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await fetch('/api/genres');
      const data = await res.json();
      setGenres(data);
      setLoading(false);
    } catch {
      setError('Erreur chargement genres');
      setLoading(false);
    }
  };

  const fetchMoviesByGenre = async (name) => {
    try {
      const res = await fetch(`/api/movies?genre=${name}`);
      const data = await res.json();
      setMovies(data.slice(0, 6));
    } catch {
      setMovies([]);
    }
  };

  const handleCardClick = (idx) => {
    if (isInserting) return;
    setSelectedGenreIdx(idx);
    setIsInserting(true);
    fetchMoviesByGenre(genres[idx].name);

    setTimeout(() => {
      setIsInserting(false);
      setIsCameraOn(true);
      setHologramVisible(true);
      setRotation(idx * -72);
    }, 1200);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <style>{heroAnimationStyles}</style>

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* TITLE */}
      <div className="text-center pt-20 mb-16">
        <h1
          className={`text-5xl font-black text-white mb-4 ${isCameraOn ? 'hologram-title' : ''}`}
        >
          Découvrez les films
        </h1>
      </div>

      {/* CAROUSEL */}
      <div
        className={`relative w-full h-96 flex items-center justify-center ${isInserting ? 'slot-glow' : ''}`}
        style={{ perspective: '1200px' }}
      >
        <div
          style={{
            width: '500px',
            height: '300px',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {genres.map((g, idx) => {
            const angle = idx * 72;
            const isActiveInsert = isInserting && selectedGenreIdx === idx;
            return (
              <div
                key={idx}
                className={`absolute cursor-pointer ${isActiveInsert ? 'camera-insert' : ''}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(220px)`,
                  left: '50%',
                  top: '50%',
                }}
                onClick={() => handleCardClick(idx)}
              >
                <div
                  className={`w-32 h-40 bg-slate-800 rounded-xl flex items-center justify-center text-white ${isActiveInsert ? 'hologram-card' : 'card-levitating'}`}
                >
                  {g.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOVIES */}
      {hologramVisible && (
        <div
          className={`mt-16 flex gap-6 justify-center flex-wrap animate-fadeIn hologram-appear`}
        >
          {movies.map((m) => (
            <div
              key={m.id}
              className="w-64 bg-black border border-cyan-500 rounded-xl overflow-hidden cursor-pointer hologram-card"
              onClick={() => setSelectedMovie(m)}
            >
              <img src={m.thumbnail_url} className="w-full h-40 object-cover" />
              <div className="p-3 text-white">{m.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* VIDEO MODAL */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setSelectedMovie(null)}
        >
          <video src={selectedMovie.video_url} controls autoPlay />
        </div>
      )}
    </section>
  );
}
