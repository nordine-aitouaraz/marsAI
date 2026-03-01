import React from 'react';
import { Clock } from 'lucide-react';

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

export default function MyMoviesGrid({ movies, onSelect }) {
  if (!movies.length) {
    return (
      <div className="text-center py-12 text-brand-muted bg-slate-900/50 rounded-xl border border-slate-800">
        Aucune vidéo ne vous est encore assignée.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie, index) => {
        const hasLocalVideo = !!movie.video_url;
        const localSrc = hasLocalVideo
          ? `http://localhost:5000/${movie.video_url}`
          : null;
        const embedUrl = getYouTubeEmbed(movie.youtube_url);
        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onSelect(index)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 text-left shadow-soft-sm hover:border-brand-primary/60 hover:shadow-brand-primary/15 transition-all"
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
                  Pas de vidéo disponible
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="line-clamp-1 text-sm font-semibold text-slate-100 group-hover:text-brand-primary">
                    {movie.original_title || 'Sans titre'}
                  </p>
                  <p className="text-[11px] text-brand-muted">
                    {movie.filmmaker
                      ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                      : '—'}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                    movie.my_flag === 'green'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                      : movie.my_flag === 'yellow'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                        : movie.my_flag === 'red'
                          ? 'bg-red-500/10 text-red-300 border-red-500/40'
                          : 'bg-slate-900/80 text-brand-muted border-slate-700'
                  }`}
                >
                  {movie.my_flag === 'green'
                    ? 'Green flag'
                    : movie.my_flag === 'yellow'
                      ? 'Yellow flag'
                      : movie.my_flag === 'red'
                        ? 'Red flag'
                        : 'Non visionné'}
                </span>
              </div>

              <p className="line-clamp-2 text-[11px] text-brand-muted">
                {movie.synopsis_original || 'Pas de synopsis disponible.'}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {movie.duration ? `${movie.duration} min` : 'Durée ?'}
                </span>
                {typeof movie.my_rating === 'number' && (
                  <span className="text-brand-primary font-semibold">
                    Note : {movie.my_rating}/10
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
