import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Play, Star, ChevronDown } from 'lucide-react';
import { getYouTubeThumbnail } from '../../../utils/youtube';
import { winnersData } from './winnersData';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80';

/** Transforme un gagnant API (movie + winner) en format affichage Phase3 */
function mapWinnerToFilm(m) {
  const director =
    m.filmmaker && typeof m.filmmaker === 'object'
      ? [m.filmmaker.first_name, m.filmmaker.last_name]
          .filter(Boolean)
          .join(' ') || '—'
      : '—';
  return {
    id: m.id,
    category: m.winner_category || 'Grand Prix',
    title: m.original_title || m.english_title || 'Sans titre',
    director,
    year: 2026,
    duration: m.duration != null ? `${m.duration} min` : '',
    image: getYouTubeThumbnail(m.youtube_url) || PLACEHOLDER_IMAGE,
    synopsis: m.synopsis_original || m.synopsis_english || '',
    juryQuote: '',
    rating: 5,
    movieId: m.id,
  };
}

function DetailCard({ film }) {
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl h-full flex flex-col justify-between">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start text-left">
        <div className="flex-1">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight line-clamp-1 md:line-clamp-2">
            {film.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-slate-300 text-xs md:text-sm mb-6 font-medium">
            <span className="bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">
              {film.director}
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-full text-brand-primary font-bold">
              {film.year}
            </span>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
            {film.synopsis || 'Aucun synopsis.'}
          </p>
          {(film.movieId || film.id) && (
            <Link
              to={`/watch/${film.movieId ?? film.id}`}
              className="inline-flex items-center gap-2 w-full md:w-auto justify-center bg-brand-white hover:bg-white text-slate-900 px-6 py-3 rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(255,200,0,0.2)] text-sm"
            >
              <Play className="w-4 h-4 fill-current" /> Voir le film
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/3 bg-white/5 rounded-xl p-4 border border-white/5 hidden lg:block">
          <h3 className="text-brand-white font-bold uppercase text-xs tracking-widest mb-2">
            L'avis du Jury
          </h3>
          <p className="italic text-slate-300 font-light text-sm mb-3 line-clamp-4">
            {film.juryQuote ? `"${film.juryQuote}"` : '—'}
          </p>
          <div className="flex gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < (film.rating || 0) ? 'fill-current' : 'text-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Phase 3 – Section Grand Prix / Palmarès (gagnants).
 * Si winnersFromApi est fourni (depuis la DB), on l'utilise ; sinon fallback sur winnersData (démo).
 */
export default function Phase3Winners({
  winnersFromApi = null,
  loading = false,
}) {
  const dataSource = useMemo(() => {
    if (winnersFromApi != null && Array.isArray(winnersFromApi)) {
      return winnersFromApi.map(mapWinnerToFilm);
    }
    return winnersData;
  }, [winnersFromApi]);

  const [activeIndex, setActiveIndex] = useState(0);
  const dataLength = dataSource.length;
  const selectedFilm = dataSource[activeIndex];
  const currentIndex = activeIndex;
  const prevFilm = dataSource[(currentIndex - 1 + dataLength) % dataLength];
  const nextFilm = dataSource[(currentIndex + 1) % dataLength];

  const handleSelectIndex = (idx) => setActiveIndex(idx);

  if (loading) {
    return (
      <section
        className="min-h-screen bg-brand-bg text-slate-200 font-sans pb-20 flex items-center justify-center"
        id="phase3-winners"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-2 border-brand-primary border-t-transparent animate-spin mb-4" />
          <p className="text-brand-muted">Chargement du palmarès...</p>
        </div>
      </section>
    );
  }

  if (dataSource.length === 0) {
    return (
      <section
        className="min-h-screen bg-brand-bg text-slate-200 font-sans pb-20 flex items-center justify-center"
        id="phase3-winners"
      >
        <div className="text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold text-brand-primary uppercase tracking-wider mb-2">
            Grand Prix
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            MarsAI
          </h1>
          <p className="text-slate-400">Aucun gagnant pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen bg-brand-bg text-slate-200 font-sans pb-20 overflow-x-hidden"
      id="phase3-winners"
    >
      <div className="pt-8 pb-6 text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold text-brand-primary uppercase tracking-[0.3em] mb-2 drop-shadow-lg">
          Grand Prix
        </h2>
        <div className="inline-block relative">
          <span className="text-2xl md:text-3xl font-light text-slate-400 tracking-widest border-white/10 py-1 px-8">
            2026
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
          MarsAI
        </h1>
      </div>

      <main className="max-w-4xl mx-auto px-4 mb-24 relative mt-10 min-h-[80vh]">
        <div className="relative w-full h-full flex justify-center items-start">
          {prevFilm && (
            <div
              className="absolute top-8 md:top-12 w-full z-10 opacity-60 scale-90 blur-[1px] brightness-50 transition-all duration-700 ease-in-out cursor-pointer hover:brightness-100 hover:scale-95 hover:blur-0 hover:z-20 hover:opacity-100 -translate-x-[65%]"
              onClick={() =>
                setActiveIndex((currentIndex - 1 + dataLength) % dataLength)
              }
            >
              <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                <img
                  src={prevFilm.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/10" />
                <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-widest shadow-lg border border-white/10">
                  {prevFilm.category}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg md:text-xl font-bold">
                    {prevFilm.title}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {nextFilm && (
            <div
              className="absolute top-8 md:top-12 w-full z-10 opacity-60 scale-90 blur-[1px] brightness-50 transition-all duration-700 ease-in-out cursor-pointer hover:brightness-100 hover:scale-95 hover:blur-0 hover:z-20 hover:opacity-100 translate-x-[65%]"
              onClick={() => setActiveIndex((currentIndex + 1) % dataLength)}
            >
              <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                <img
                  src={nextFilm.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/10" />
                <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-widest shadow-lg border border-white/10">
                  {nextFilm.category}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg md:text-xl font-bold">
                    {nextFilm.title}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {selectedFilm && (
            <div
              key={selectedFilm.id}
              className="relative z-30 w-full transition-all duration-700 ease-in-out"
            >
              <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-2xl shadow-black border border-slate-700/50 group">
                <img
                  src={selectedFilm.image}
                  alt={selectedFilm.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-brand-primary/90 backdrop-blur text-slate-900 font-black px-4 py-2 rounded-lg text-sm uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> {selectedFilm.category}
                </div>
              </div>
              <div className="relative -mt-24 md:-mt-32 px-2 md:px-10 z-30">
                <DetailCard film={selectedFilm} />
              </div>
            </div>
          )}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-4 text-center relative z-40 mt-12">
        <div className="flex flex-col items-center mb-8 text-slate-500">
          <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
            Explorer les catégories
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {dataSource.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectIndex(idx)}
              className={`group relative px-2 py-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                activeIndex === idx
                  ? 'bg-brand-primary border-brand-primary text-slate-900 shadow-lg scale-105 z-10'
                  : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-white opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`text-xs md:text-sm font-bold uppercase tracking-wider ${
                  activeIndex === idx
                    ? 'text-slate-900'
                    : 'text-brand-primary group-hover:text-white'
                }`}
              >
                {item.category}
              </span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
