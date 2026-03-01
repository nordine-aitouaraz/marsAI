import { useMemo, useState, useEffect } from 'react';
import { Clock, Play } from 'lucide-react';
import { STATUS_LABELS } from '../../../constants/status';
import AdminFilmModal from './AdminFilmModal';

function getYouTubeInfo(url) {
  if (!url) return { videoId: null, embedUrl: null, thumbUrl: null };
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    const videoId = match[2];
    return {
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }
  return { videoId: null, embedUrl: null, thumbUrl: null };
}

export default function AdminFilmGallery({ movies, loading, error, onReload }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [reviewsCache, setReviewsCache] = useState({});
  const [loadingReviewId, setLoadingReviewId] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);
  const [togglingWinnerId, setTogglingWinnerId] = useState(null);
  const [winnerError, setWinnerError] = useState(null);

  const hasMovies = movies && movies.length > 0;
  const winnersCount = useMemo(
    () => (movies || []).filter((m) => m.is_winner).length,
    [movies],
  );
  const currentMovie =
    activeIndex != null &&
    hasMovies &&
    activeIndex >= 0 &&
    activeIndex < movies.length
      ? movies[activeIndex]
      : null;
  const currentReviews =
    currentMovie && reviewsCache[currentMovie.id]
      ? reviewsCache[currentMovie.id]
      : [];

  const fetchReviews = async (id) => {
    setLoadingReviewId(id);
    setReviewsError(null);
    try {
      const res = await fetch(`/api/admin/films/${id}/reviews`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json().catch(() => []);
      if (!res.ok)
        throw new Error(
          data.error || data.message || 'Erreur de chargement des avis.',
        );
      setReviewsCache((prev) => ({ ...prev, [id]: data || [] }));
    } catch (err) {
      setReviewsError(err.message || 'Erreur de chargement des avis.');
    } finally {
      setLoadingReviewId(null);
    }
  };

  useEffect(() => {
    if (!currentMovie) return;
    if (!reviewsCache[currentMovie.id]) fetchReviews(currentMovie.id);
    else setReviewsError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovie?.id]);

  const goNext = () => {
    if (!hasMovies) return;
    setActiveIndex((prev) => {
      if (prev == null) return 0;
      const next = prev + 1;
      return next >= movies.length ? prev : next;
    });
  };

  const goPrev = () => {
    if (!hasMovies) return;
    setActiveIndex((prev) => {
      if (prev == null) return 0;
      const next = prev - 1;
      return next < 0 ? prev : next;
    });
  };

  const handleToggleWinner = async (movie, options = {}) => {
    if (!movie) return;
    setTogglingWinnerId(movie.id);
    setWinnerError(null);
    try {
      const res = await fetch(`/api/admin/films/${movie.id}/winner`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          is_winner: !movie.is_winner,
          ranking: options.ranking,
          category: options.category,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            'Impossible de mettre à jour le statut gagnant.',
        );
      if (onReload) onReload();
    } catch (err) {
      setWinnerError(
        err.message || 'Impossible de mettre à jour le statut gagnant.',
      );
    } finally {
      setTogglingWinnerId(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <p className="mb-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}
      {loading && (
        <div className="py-8 text-center text-sm text-brand-muted">
          Chargement des films...
        </div>
      )}
      {!loading && !hasMovies && !error && (
        <div className="py-8 text-center text-sm text-brand-muted">
          Aucun film à afficher pour le moment.
        </div>
      )}
      {!loading && hasMovies && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie, index) => {
            const { thumbUrl } = getYouTubeInfo(movie.youtube_url);
            return (
              <button
                type="button"
                key={movie.id}
                onClick={() => setActiveIndex(index)}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80 text-left shadow-soft-sm transition hover:border-brand-primary/40 hover:bg-slate-900/90 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  {thumbUrl ? (
                    <>
                      <img
                        src={thumbUrl}
                        alt={movie.original_title || 'Miniature du film'}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/90 text-slate-100 shadow-lg">
                          <Play className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-[11px] text-gray-500">
                      Pas de miniature
                    </div>
                  )}
                  {movie.is_winner && (
                    <div className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900 shadow">
                      Gagnant
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm font-semibold text-slate-50">
                        {movie.original_title || 'Sans titre'}
                      </p>
                      <p className="truncate text-[11px] text-brand-muted">
                        {movie.filmmaker
                          ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                          : '—'}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] border ${
                        movie.is_winner
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : movie.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : movie.status === 'selected'
                              ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'
                              : movie.status === 'rejected'
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : movie.status === 'in_process'
                                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                  : 'bg-slate-900/80 text-brand-muted border-slate-700'
                      }`}
                    >
                      {movie.is_winner
                        ? STATUS_LABELS.winner
                        : STATUS_LABELS[movie.status] || movie.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-brand-muted">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {movie.duration
                        ? `${movie.duration} sec`
                        : 'Durée inconnue'}
                    </span>
                    {typeof movie.reviewers_count === 'number' && (
                      <span>{movie.reviewers_count} avis</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      <AdminFilmModal
        movie={currentMovie}
        isOpen={!!currentMovie}
        onClose={() => setActiveIndex(null)}
        onNext={goNext}
        onPrev={goPrev}
        reviews={currentReviews}
        loadingReviews={loadingReviewId === (currentMovie && currentMovie.id)}
        reviewsError={reviewsError}
        onToggleWinner={handleToggleWinner}
        togglingWinnerId={togglingWinnerId}
        winnersCount={winnersCount}
        winnerError={winnerError}
      />
    </div>
  );
}
