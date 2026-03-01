import { Clock } from 'lucide-react';
import { getYouTubeEmbed } from '../../../utils/youtube';

export default function GreenFlagCard({ group, movie, onOpen }) {
  const hasLocalVideo = !!movie.video_url;
  const localSrc = hasLocalVideo
    ? `http://localhost:5000/${movie.video_url}`
    : null;
  const embedUrl = getYouTubeEmbed(movie.youtube_url);
  return (
    <button
      type="button"
      onClick={() => onOpen({ admin: group, movie })}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 text-left shadow-soft-sm hover:border-brand-primary/60 transition-all"
    >
      <div className="relative w-full aspect-video bg-black">
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
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-1 text-sm font-semibold text-slate-100">
          {movie.original_title || 'Sans titre'}
        </p>
        {typeof movie.rating === 'number' && (
          <p className="text-[11px] text-emerald-300">{movie.rating}/10</p>
        )}
        <p className="line-clamp-2 text-[11px] text-brand-muted">
          {movie.synopsis_original || ''}
        </p>
        <div className="mt-auto pt-2 text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {movie.duration ? `${movie.duration} min` : '—'}
        </div>
      </div>
    </button>
  );
}
