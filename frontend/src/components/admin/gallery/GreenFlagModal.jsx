import { getYouTubeEmbed } from '../../../utils/youtube';

export default function GreenFlagModal({
  favorite,
  onClose,
  onSelect,
  selecting,
}) {
  if (!favorite?.movie) return null;
  const { movie, admin } = favorite;
  const embedUrl = getYouTubeEmbed(movie?.youtube_url);
  const hasLocalVideo = !!movie?.video_url;
  const localSrc = hasLocalVideo
    ? `http://localhost:5000/${movie.video_url}`
    : null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 px-3">
      <div className="relative flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              {movie.original_title || 'Sans titre'}
            </h3>
            <p className="text-xs text-brand-muted">
              Jury :{' '}
              <span className="font-semibold text-slate-100">
                {admin.first_name} {admin.last_name}
              </span>{' '}
              ({admin.email})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900/80 px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 text-xs"
          >
            Fermer
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
                  Pas de vidéo disponible
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Réalisateur
              </p>
              <p className="text-xs text-slate-100">
                {movie.filmmaker
                  ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                  : '—'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Synopsis
              </p>
              <p className="text-xs text-slate-200 line-clamp-6">
                {movie.synopsis_original || 'Pas de synopsis disponible.'}
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 border-t border-slate-800 pt-3">
              <p className="text-[11px] text-brand-muted">
                Ce film est marqué{' '}
                <span className="font-semibold text-emerald-300">
                  green flag
                </span>{' '}
                par ce membre du jury.
              </p>
              <button
                type="button"
                onClick={onSelect}
                disabled={selecting}
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {selecting
                  ? 'Sélection en cours...'
                  : 'Marquer comme sélectionné'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
