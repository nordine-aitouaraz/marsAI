import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/api';

export default function VideoDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        // Simulation d'un délai réseau pour l'effet (optionnel)
        // await new Promise(r => setTimeout(r, 800));
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Erreur chargement film:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // --- RENDERERS ---

  const renderVideo = () => {
    if (!movie) return null;

    // Cas 1 : lien YouTube
    const isYoutube =
      movie.youtube_url &&
      (movie.youtube_url.includes('youtube') ||
        movie.youtube_url.includes('youtu.be'));

    // Cas 2 : fichier vidéo hébergé sur le backend
    const hasFileOnDisk = !!movie.video_url;
    const fileSrc = hasFileOnDisk
      ? `http://localhost:5000/${movie.video_url}`
      : null;

    // Wrapper avec effet de lueur (Glow)
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 group">
        {/* Glow Effect arrière-plan (Reste bleu/violet pour la vidéo car ça contraste bien, ou tu peux le changer aussi) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-30"></div>

        <div className="relative w-full h-full bg-black z-10">
          {hasFileOnDisk && fileSrc ? (
            <video
              controls
              className="w-full h-full object-cover"
              src={fileSrc}
            />
          ) : isYoutube ? (
            <iframe
              className="w-full h-full object-cover"
              src={movie.youtube_url.replace('watch?v=', 'embed/')}
              title={movie.original_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
              Vidéo non disponible
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- LOADER SQUELETTE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-5 space-y-6 mt-10">
            <div className="h-2 w-16 bg-blue-900/30 rounded"></div>
            <div className="h-16 w-3/4 bg-white/5 rounded"></div>
            <div className="h-6 w-1/2 bg-white/5 rounded"></div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-white/5 rounded"></div>
              <div className="h-4 w-5/6 bg-white/5 rounded"></div>
            </div>
            <div className="h-12 w-40 bg-white/5 rounded-full mt-8"></div>
          </div>
          <div className="lg:col-span-7">
            <div className="w-full aspect-video bg-white/5 rounded-lg border border-white/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400">
          Ce court-métrage semble s'être perdu dans l'espace.
        </p>
      </div>
    );
  }

  // --- PAGE CONTENU ---
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-10">
            <div
              className="w-12 h-[2px] bg-blue-500 mb-8 opacity-0 animate-fadeInLeft"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            ></div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-4 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              {movie.original_title}
            </h1>

            <div
              className="flex items-center gap-3 text-lg font-medium text-gray-400 mb-8 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <span className="text-blue-500">DIR.</span>
              <span className="text-white tracking-widest uppercase">
                {movie.filmmaker
                  ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                  : 'Artiste Inconnu'}
              </span>
            </div>

            <p
              className="text-lg leading-relaxed text-gray-300 max-w-lg mb-12 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              {movie.synopsis_original ||
                'Aucune description disponible pour cette œuvre.'}
            </p>
          </div>

          {/* COLONNE DROITE */}
          <div
            className="lg:col-span-7 order-1 lg:order-2 opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            {renderVideo()}

            <div className="flex justify-between items-center mt-6 text-xs font-mono text-gray-600 uppercase tracking-widest border-t border-gray-900 pt-4">
              <div>MARSAI FESTIVAL • 2026</div>
              <div>ID: #{String(id).padStart(3, '0')}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out; }
      `}</style>
    </div>
  );
}
