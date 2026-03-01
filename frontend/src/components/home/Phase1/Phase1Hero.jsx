import { Link } from 'react-router-dom';

/**
 * Phase 1 – Hero : vidéo de fond, titre, sous-titre, bouton CTA vers le projet (participer).
 */
export default function Phase1Hero({
  videoSrc = '/video/video4.mp4',
  title = 'MarsAI',
  subtitle = "Le festival du film court créé à l'IA. Une sélection percutante en 60 secondes.",
  ctaLabel = 'Participer au projet',
  ctaTo = '/participer',
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-115"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        aria-label="Vidéo de présentation du festival"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl animate-fadeInUp">
          {title}
        </h1>
        <p
          className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg animate-fadeInUp"
          style={{ animationDelay: '0.1s' }}
        >
          {subtitle}
        </p>
        <div
          className="mt-10 animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          <Link
            to={ctaTo}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {ctaLabel}
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 animate-bounce">
          ↓ Découvrir
        </div>
      </div>
    </section>
  );
}
