import { useMemo, useState, useEffect } from 'react';
import {
  X,
  Clock,
  Star,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { STATUS_LABELS } from '../../../constants/status';

function getYouTubeEmbed(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

export default function AdminFilmModal({
  movie,
  isOpen,
  onClose,
  onNext,
  onPrev,
  reviews,
  loadingReviews,
  reviewsError,
  onToggleWinner,
  togglingWinnerId,
  winnersCount,
  winnerError,
}) {
  const embedUrl = useMemo(() => getYouTubeEmbed(movie?.youtube_url), [movie]);
  const hasLocalVideo = !!movie?.video_url;
  const localSrc = hasLocalVideo
    ? `http://localhost:5000/${movie.video_url}`
    : null;

  const [winnerFormOpen, setWinnerFormOpen] = useState(false);
  const [winnerRanking, setWinnerRanking] = useState('');
  const [winnerCategory, setWinnerCategory] = useState('Grand Prix');

  useEffect(() => {
    if (!movie) return;
    // Pré-remplir avec les valeurs existantes ou un rang suggéré.
    setWinnerRanking(
      movie.winner_ranking != null
        ? String(movie.winner_ranking)
        : winnersCount + 1,
    );
    setWinnerCategory(movie.winner_category || 'Grand Prix');
    setWinnerFormOpen(false);
  }, [movie, winnersCount]);

  if (!isOpen || !movie) return null;

  const isToggling = togglingWinnerId === movie.id;
  const canMarkWinner =
    movie.status === 'selected' &&
    (movie.is_winner || winnersCount < 6) &&
    !isToggling;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 px-3 md:px-6">
      <div className="relative flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-50">
              {movie.original_title || 'Sans titre'}
            </h3>
            <p className="text-xs text-brand-muted">
              {movie.filmmaker
                ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                : '—'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900/80 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-3/5">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
              {hasLocalVideo && localSrc ? (
                <video
                  src={localSrc}
                  className="h-full w-full object-cover"
                  controls
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="h-full w-full"
                  allowFullScreen
                  title={movie.original_title}
                  frameBorder="0"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Pas de vidéo
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${
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
                {movie.is_winner ? (
                  <>
                    <Trophy className="h-3.5 w-3.5 shrink-0" />
                    <span>{STATUS_LABELS.winner}</span>
                  </>
                ) : (
                  <span>{STATUS_LABELS[movie.status] || movie.status}</span>
                )}
              </span>
              <div className="flex flex-col items-end gap-1 text-xs text-brand-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {movie.duration ? `${movie.duration} sec` : 'Durée inconnue'}
                </span>
                {typeof movie.reviewers_count === 'number' && (
                  <span className="text-[11px]">
                    {movie.reviewers_count} avis admin
                  </span>
                )}
              </div>
            </div>

            {movie.synopsis_original && (
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                  Synopsis
                </p>
                <p className="line-clamp-5 text-xs text-slate-200">
                  {movie.synopsis_original}
                </p>
              </div>
            )}

            <div className="mt-1 border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => {
                  if (movie.is_winner) {
                    onToggleWinner(movie);
                  } else {
                    setWinnerFormOpen(true);
                  }
                }}
                disabled={!canMarkWinner}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  movie.is_winner
                    ? 'border-amber-400/60 bg-amber-400/20 text-amber-200 hover:bg-amber-400/30'
                    : 'border-slate-700 bg-slate-900/70 text-slate-100 hover:bg-slate-800/90'
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <Trophy className="h-3.5 w-3.5 shrink-0" />
                {isToggling
                  ? 'Mise à jour...'
                  : movie.is_winner
                    ? 'Retirer des gagnants'
                    : 'Marquer comme gagnant'}
                {!movie.is_winner && winnersCount >= 6 && (
                  <span className="text-[10px] font-normal text-red-300">
                    Limite de 6 gagnants atteinte
                  </span>
                )}
              </button>
              {winnerError && (
                <p className="mt-1 text-xs text-red-300">{winnerError}</p>
              )}

              {!movie.is_winner && winnerFormOpen && (
                <div className="mt-3 space-y-2 rounded-md border border-slate-800 bg-slate-900/70 p-3">
                  <p className="text-[11px] text-brand-muted mb-1">
                    Renseignez les informations pour ce gagnant (table{' '}
                    <code>winner</code>).
                  </p>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="flex-1">
                      <label className="mb-1 block text-[11px] font-medium text-brand-muted">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={winnerCategory}
                        onChange={(e) => setWinnerCategory(e.target.value)}
                        className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none"
                        placeholder="Grand Prix, Mention spéciale..."
                      />
                    </div>
                    <div className="w-28">
                      <label className="mb-1 block text-[11px] font-medium text-brand-muted">
                        Rang (1–6)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={winnerRanking}
                        onChange={(e) => setWinnerRanking(e.target.value)}
                        className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setWinnerFormOpen(false)}
                      className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 hover:bg-slate-900/80"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      disabled={isToggling || !winnerCategory || !winnerRanking}
                      onClick={() =>
                        onToggleWinner(movie, {
                          ranking: winnerRanking,
                          category: winnerCategory,
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isToggling
                        ? 'Enregistrement...'
                        : 'Valider comme gagnant'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-2 flex-1 space-y-2 overflow-hidden border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                  Avis des admins
                </p>
                {typeof movie.reviewers_count === 'number' && (
                  <span className="text-[11px] text-brand-muted">
                    {movie.reviewers_count} au total
                  </span>
                )}
              </div>
              {loadingReviews && (
                <p className="py-2 text-xs text-brand-muted">
                  Chargement des avis...
                </p>
              )}
              {reviewsError && !loadingReviews && (
                <p className="py-2 text-xs text-red-300">{reviewsError}</p>
              )}
              {!loadingReviews &&
                !reviewsError &&
                (!reviews || reviews.length === 0) && (
                  <p className="py-2 text-xs text-brand-muted">
                    Aucun avis disponible pour le moment.
                  </p>
                )}
              {!loadingReviews && reviews && reviews.length > 0 && (
                <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                  {reviews.map((review, idx) => (
                    <div
                      key={`${review.admin_id ?? idx}-${idx}`}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold text-slate-100">
                          {[review.first_name, review.last_name]
                            .filter(Boolean)
                            .join(' ') || 'Admin'}
                        </p>
                        {typeof review.rating === 'number' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                            <Star className="h-3 w-3 fill-current" />
                            {review.rating}/10
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-brand-muted">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            <ChevronRight className="h-4 w-4" />
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
