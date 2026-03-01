import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MiniMapGTA from '../components/ui/MiniMapGTA/MiniMapGTA';

/* ---------- Helpers ---------- */

function useCountUp(
  target,
  duration = 4000,
  triggerOnce = true,
  enabled = true,
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && (!triggerOnce || !hasStarted)) {
          setHasStarted(true);
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasStarted, triggerOnce, enabled]);

  return [count, ref];
}

function NavItem({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={[
        'rounded-full px-4 py-2 text-sm font-semibold transition',
        active
          ? 'bg-white/20 text-white'
          : 'text-white/80 hover:bg-white/15 hover:text-white',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

function SmallLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-white/70" />
      {children}
    </span>
  );
}

function StatCounter({ label, value, description, prefix = '' }) {
  const [count, ref] = useCountUp(value);

  return (
    <div ref={ref} className="flex justify-between items-start mb-6">
      <div>
        <p className="text-xs font-semibold text-white/60">{label}</p>
        <h3 className="mt-2 text-5xl font-black text-white">
          {prefix && <span className="text-3xl">{prefix}</span>}
          {count.toLocaleString('fr-FR')}
        </h3>
        <p className="mt-2 text-xs text-white/60">{description}</p>
      </div>
    </div>
  );
}

/* Mini-map GTA style component */
function GTAMiniMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return <MiniMapGTA />;
}

function InfoRow({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
      <div className="text-xs font-semibold text-white/60">{k}</div>
      <div className="text-sm font-extrabold text-white">{v}</div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  subtitle,
  value,
  prefix,
  gradient,
  revealed,
}) {
  const [count, ref] = useCountUp(value, 4000, true, revealed);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient.bg} border ${gradient.border} flex items-center justify-center`}
        >
          <svg
            className={`w-5 h-5 ${gradient.text}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <div ref={ref}>
        <div
          className={`text-3xl font-black text-transparent bg-clip-text ${gradient.textGradient}`}
        >
          {prefix}
          {count.toLocaleString('fr-FR')}
        </div>
        <p className="text-xs text-white/60 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function AnalyticsRow({ label, percentage, colorFrom, colorTo, textColor }) {
  return (
    <div className="flex items-center justify-between hover:bg-white/5 transition-all p-2 rounded">
      <span className="text-xs text-white/60 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-20 h-1 bg-black/40 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-${colorFrom}-500 to-${colorTo}-500 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span
          className={`text-xs font-bold text-${textColor}-300 w-10 text-right`}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const [statsRevealed, setStatsRevealed] = useState(false);
  const [statsFlash, setStatsFlash] = useState(false);
  const [mapMode, setMapMode] = useState('gta'); // 'gta' ou 'real'
  const audioCtxRef = useRef(null);

  const playCameraSound = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }
    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const duration = 0.08;
    const buffer = ctx.createBuffer(
      1,
      ctx.sampleRate * duration,
      ctx.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      const decay = 1 - i / data.length;
      data[i] = (Math.random() * 2 - 1) * 0.4 * decay;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
  };

  const handleStatsReveal = () => {
    const nextState = !statsRevealed;
    setStatsRevealed(nextState);
    if (nextState) {
      playCameraSound();
    }
    setStatsFlash(true);
    window.setTimeout(() => setStatsFlash(false), 1200);
  };

  const statsData = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      ),
      title: 'Visiteurs',
      subtitle: 'Au festival',
      value: 3000,
      prefix: '',
      gradient: {
        bg: 'from-violet-500/20 to-violet-600/20',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        textGradient: 'bg-gradient-to-r from-violet-400 to-violet-300',
      },
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
      title: 'Professionnels IA',
      subtitle: 'Experts mobilisés',
      value: 60,
      prefix: '+',
      gradient: {
        bg: 'from-fuchsia-500/20 to-fuchsia-600/20',
        border: 'border-fuchsia-500/30',
        text: 'text-fuchsia-400',
        textGradient: 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-300',
      },
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: 'Pays représentés',
      subtitle: 'Portée mondiale',
      value: 120,
      prefix: '+',
      gradient: {
        bg: 'from-cyan-500/20 to-cyan-600/20',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        textGradient: 'bg-gradient-to-r from-cyan-400 to-cyan-300',
      },
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 4v16m0 0H3m4 0h10m0 0h4m-4 0v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0v2a2 2 0 002 2h4a2 2 0 002-2v-2m0 0h4"
        />
      ),
      title: 'Films soumis',
      subtitle: 'Sélection mondiale',
      value: 600,
      prefix: '+',
      gradient: {
        bg: 'from-amber-500/20 to-amber-600/20',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        textGradient: 'bg-gradient-to-r from-amber-400 to-amber-300',
      },
    },
  ];

  const analyticsData = [
    {
      label: 'Courts',
      percentage: 65,
      colorFrom: 'cyan',
      colorTo: 'blue',
      textColor: 'cyan',
    },
    {
      label: 'Docs',
      percentage: 42,
      colorFrom: 'fuchsia',
      colorTo: 'pink',
      textColor: 'fuchsia',
    },
    {
      label: 'Expo',
      percentage: 28,
      colorFrom: 'green',
      colorTo: 'emerald',
      textColor: 'green',
    },
    {
      label: 'Anims',
      percentage: 55,
      colorFrom: 'amber',
      colorTo: 'yellow',
      textColor: 'amber',
    },
  ];

  return (
    <div className="relative min-h-screen text-white">
      {/* Background global (plus doux) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* HERO fullscreen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Vidéo */}
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-115"
          src="/video/video4.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          fetchPriority="high"
          aria-label="Vidéo de présentation du festival"
        />

        {/* Overlay plus "ciné" */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

        {/* Texte centré (moins "headline IA") */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <SmallLabel>Marseille — Festival de courts (1 minute)</SmallLabel>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Un festival pour raconter fort,{' '}
            <span className="text-white/90">en une minute.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            Projections, talks et ateliers. Une programmation courte, précise,
            et une direction artistique pensée comme une expérience — pas comme
            un produit.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/programme"
              className="rounded-full bg-white px-7 py-3 text-sm font-extrabold text-black transition hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              aria-label="Voir la programmation du festival"
            >
              Voir la programmation
            </Link>

            <Link
              to="/a-propos"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-extrabold backdrop-blur transition hover:bg-white/20 hover:border-white/40"
              aria-label="Lire le manifeste de marsAI"
            >
              Lire le manifeste
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 animate-fadeIn">
            <InfoRow k="Format" v="≈ 60 sec" />
            <InfoRow k="Accès" v="Ouvert" />
            <InfoRow k="Ville" v="Marseille" />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 animate-bounce">
            ↓ Découvrir
          </div>
        </div>
      </section>

      {/* SECTION éditoriale (moins "features IA") */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="animate-fadeIn">
              <div className="text-xs font-semibold text-white/60">
                Manifeste
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                La technologie n'est pas le sujet.{' '}
                <span className="text-white/80">L'intention l'est.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base">
                marsAI met en avant la réalisation, l'écriture, le montage et la
                direction artistique. L'IA peut faire partie du processus — mais
                ce qui compte, c'est la forme finale : une idée lisible, une
                image tenue, un son travaillé.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/a-propos"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20 transition"
                  aria-label="Accéder à la page à propos"
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full px-6 py-3 text-sm font-extrabold text-white/70 hover:text-white transition"
                  aria-label="Contacter marsAI"
                >
                  Contact →
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.18)] backdrop-blur-xl animate-fadeIn">
              <div className="text-xs font-semibold text-white/60">En bref</div>
              <div className="mt-4 grid gap-3">
                <InfoRow k="Projections" v="Sélection courte" />
                <InfoRow k="Talks" v="Intervenants & retours" />
                <InfoRow k="Ateliers" v="Workshops" />
                <InfoRow k="Ambiance" v="Éditorial / ciné" />
              </div>

              <Divider />

              <div className="mt-5 text-sm text-white/70">
                Une expérience pensée comme un rendez-vous culturel — pas un
                produit tech.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME (sobriété) */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-white/60">
                Programme
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                Projections • Talks • Ateliers
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                Une structure simple : regarder, comprendre, expérimenter.
              </p>
            </div>
            <Link
              to="/programme"
              className="hidden md:inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-extrabold hover:bg-white/20"
            >
              Voir le programme →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Projections</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Courts au format 1 minute. Un rythme, une idée, une tenue
                visuelle.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Talks</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Créateurs, producteurs, retours d'expérience et discussions.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <div className="text-sm font-extrabold">Ateliers</div>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Expérimentation : écriture, montage, direction artistique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marseille + mini map GTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur animate-fadeIn">
              <div className="text-xs font-semibold text-white/60">Lieu</div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                Marseille, comme décor et énergie
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Une ville qui inspire des récits forts : lumière, contrastes,
                énergie. L'événement s'ancre ici — et invite à regarder
                autrement.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20 transition"
                  aria-label="Infos pratiques sur le lieu"
                >
                  Infos pratiques
                </Link>
                <Link
                  to="/a-propos"
                  className="rounded-full px-6 py-3 text-sm font-extrabold text-white/70 hover:text-white transition"
                  aria-label="En savoir plus sur Marseille"
                >
                  En savoir plus →
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-fadeIn">
              <div className="relative w-full lg:w-auto px-4 lg:px-0">
                {/* Toggle Map Mode */}
                <div className="absolute -top-10 lg:-top-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                  <button
                    onClick={() => setMapMode('gta')}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                      mapMode === 'gta'
                        ? 'bg-violet-500 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    GTA
                  </button>
                  <button
                    onClick={() => setMapMode('real')}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                      mapMode === 'real'
                        ? 'bg-violet-500 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    MAP
                  </button>
                </div>

                {/* GTA Style Map */}
                {mapMode === 'gta' && (
                  <div className="transition-all duration-500">
                    <GTAMiniMap />
                  </div>
                )}

                {/* Real OpenStreetMap */}
                {mapMode === 'real' && (
                  <div className="transition-all duration-500 rounded-[32px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur">
                    <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                      <iframe
                        title="Carte Marseille"
                        className="h-[300px] sm:h-[360px] w-full sm:w-[360px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
                      />
                    </div>
                  </div>
                )}

                <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/50 font-semibold">
                  {mapMode === 'gta'
                    ? 'Radar GTA-style'
                    : 'Carte réelle Marseille'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS - Tableau */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="text-xs font-semibold text-white/80">
                Résultats & Projections
              </span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
              Chiffres clés du festival
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              Une co-création de l'école du numérique La Plateforme et le Mobile
              Film Festival. En nous basant sur les résultats obtenus par les
              événements et sélections organisés.
            </p>
          </div>

          {/* Stats avec caméra */}
          <div className="relative max-w-6xl mx-auto">
            {/* Effets de lumière dramatique */}
            {statsRevealed && (
              <>
                {/* Halo principal */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none transition-all duration-700"
                  style={{
                    width: '400px',
                    height: '400px',
                    background:
                      'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
                {/* Halo secondaire */}
                <div
                  className="absolute inset-0 -z-10 pointer-events-none transition-all duration-700 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
                  }}
                />
              </>
            )}

            <div className="relative flex flex-col lg:flex-row gap-0 items-center lg:items-stretch">
              {/* Caméra + Bouton ON/OFF */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4 relative w-full md:w-auto px-4 md:px-0">
                {/* Bouton caméra avec hover glow */}
                <button
                  type="button"
                  onClick={handleStatsReveal}
                  className={`relative w-full sm:w-56 md:w-64 h-64 sm:h-72 md:h-80 flex items-center justify-center rounded-3xl bg-black border-2 transition-all cursor-pointer group overflow-hidden ${
                    statsRevealed
                      ? 'border-green-400/60 shadow-xl shadow-green-500/40'
                      : 'border-white/10 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/30'
                  }`}
                  aria-label="Révéler les chiffres"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Flash ultra court (0.15s) */}
                  {statsFlash && (
                    <div className="absolute inset-0 rounded-3xl bg-white pointer-events-none animate-ultraFlash" />
                  )}

                  {/* Image conditionnelle */}
                  <img
                    src={
                      statsRevealed
                        ? require('../assets/images/allumer.png')
                        : require('../assets/images/éteint.png')
                    }
                    alt={statsRevealed ? 'Caméra allumée' : 'Caméra éteinte'}
                    className="w-full h-full object-cover transition-all duration-500 relative z-10"
                  />

                  {/* Indicateur cliquable au hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">
                        CLICK
                      </span>
                    </div>
                  </div>
                </button>

                {/* Toggle Switch amélioré */}
                <button
                  type="button"
                  onClick={handleStatsReveal}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-500 cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 group ${
                    statsRevealed
                      ? 'bg-gradient-to-r from-green-600/60 to-emerald-600/60 border-green-400 focus:ring-green-500/50 shadow-lg shadow-green-500/50'
                      : 'bg-gradient-to-r from-red-600/60 to-rose-600/60 border-red-400 focus:ring-red-500/50 shadow-lg shadow-red-500/30'
                  }`}
                  aria-label={
                    statsRevealed ? 'Éteindre la caméra' : 'Allumer la caméra'
                  }
                  role="switch"
                  aria-checked={statsRevealed}
                >
                  {/* Background glow */}
                  <div
                    className={`absolute inset-0 rounded-full blur-md transition-all duration-500 -z-10 ${
                      statsRevealed
                        ? 'bg-green-500/60 opacity-100'
                        : 'bg-red-500/60 opacity-100'
                    }`}
                  />

                  {/* Text labels OFF/ON */}
                  <span
                    className={`absolute left-1.5 text-[9px] font-extrabold transition-all duration-500 ${
                      statsRevealed
                        ? 'text-red-200 opacity-20'
                        : 'text-red-50 opacity-100'
                    }`}
                  >
                    OFF
                  </span>
                  <span
                    className={`absolute right-1.5 text-[9px] font-extrabold transition-all duration-500 ${
                      statsRevealed
                        ? 'text-green-50 opacity-100'
                        : 'text-green-200 opacity-20'
                    }`}
                  >
                    ON
                  </span>

                  {/* Sliding circle */}
                  <div
                    className={`relative h-6 w-6 transform rounded-full bg-white shadow-xl transition-all duration-500 flex items-center justify-center group-hover:shadow-2xl ${
                      statsRevealed ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  >
                    <div
                      className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
                        statsRevealed
                          ? 'bg-green-500 shadow-lg shadow-green-500/80'
                          : 'bg-red-500 shadow-lg shadow-red-500/80'
                      }`}
                    >
                      {statsRevealed && (
                        <div className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
                      )}
                      {!statsRevealed && (
                        <div className="absolute inset-0 rounded-full bg-red-400 opacity-60 animate-ping" />
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Faisceau lumineux (projecteur de la caméra) */}
              {statsRevealed && (
                <div
                  className="absolute left-1/2 sm:left-40 md:left-52 top-[36%] -translate-y-1/2 md:-translate-y-0 md:top-auto md:bottom-0 w-[calc(100%-6rem)] sm:w-[calc(100%-10rem)] md:w-[calc(100%-13rem)] h-12 sm:h-16 md:h-20 md:w-12 md:h-full pointer-events-none z-20 overflow-visible"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="h-full w-full animate-beamExpand origin-left md:origin-bottom"
                    style={{
                      background:
                        window.innerWidth >= 768
                          ? 'linear-gradient(90deg, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.15) 60%, transparent 100%)'
                          : 'linear-gradient(180deg, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.15) 60%, transparent 100%)',
                      clipPath:
                        window.innerWidth >= 768
                          ? 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)'
                          : 'polygon(45% 0%, 0% 100%, 100% 100%, 55% 0%)',
                      filter: 'blur(25px)',
                    }}
                  />
                </div>
              )}

              {/* Flash persistant pour montrer que ça filme */}
              {statsRevealed && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none transition-all duration-500 z-30"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(147, 51, 234, 0.3) 35%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
              )}

              {/* Panneau droit (noir puis illuminé) avec effet cinéma */}
              <div
                className={`relative flex-1 rounded-3xl p-4 sm:p-6 min-h-[320px] transition-all duration-700 overflow-hidden w-full md:flex-1 ${
                  statsRevealed
                    ? 'bg-white/[0.05] border border-white/10 shadow-2xl shadow-violet-500/30'
                    : 'bg-black/98 border border-black/50'
                }`}
              >
                {/* Film grain effect (subtil) */}
                {statsRevealed && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay animate-grain"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                      backgroundSize: '200px 200px',
                    }}
                  />
                )}

                {/* Cinematic vignette */}
                {statsRevealed && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)',
                    }}
                  />
                )}

                {/* Layout: cartes à gauche, tableau à droite */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-8 h-full">
                  {/* Cartes statistiques - Gauche */}
                  <div className="flex-1">
                    {/* Chiffres cachés jusqu'au clic avec fade-in + slide */}
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 transition-all duration-700 ${
                        statsRevealed
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-8 pointer-events-none'
                      }`}
                      aria-hidden={!statsRevealed}
                    >
                      {statsData.map((stat, index) => (
                        <StatCard
                          key={index}
                          icon={stat.icon}
                          title={stat.title}
                          subtitle={stat.subtitle}
                          value={stat.value}
                          prefix={stat.prefix}
                          revealed={statsRevealed}
                          gradient={stat.gradient}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tableau analytique - Style CYBERPUNK */}
                  <div
                    className={`flex-1 transition-all duration-700 delay-150 ${
                      statsRevealed
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                    aria-hidden={!statsRevealed}
                  >
                    <div className="relative bg-black/90 border-2 border-cyan-400/60 rounded-lg p-3 md:p-4 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/50">
                      {/* Grid background cyberpunk */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Scan line effect */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanline" />
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-magenta-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                      {/* Header */}
                      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 pb-2 border-b border-cyan-400/30 gap-2">
                        <div>
                          <h3
                            className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-widest"
                            style={{
                              textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                            }}
                          >
                            ≡ DISTRIBUTION
                          </h3>
                          <div className="text-[9px] text-magenta-400 font-mono mt-0.5">
                            SYS.ANALYTICS_v2.1
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/20 border border-cyan-400 rounded">
                          <div
                            className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"
                            style={{
                              boxShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
                            }}
                          />
                          <span className="text-[10px] font-bold text-cyan-300 font-mono">
                            ACTIVE
                          </span>
                        </div>
                      </div>

                      {/* Analytics bars - Style cyberpunk */}
                      <div className="space-y-2 md:space-y-3 flex-1 relative z-10">
                        {analyticsData.map((item, index) => (
                          <div key={index} className="group">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 sm:mb-1.5 gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-cyan-400 font-mono">
                                  [{index + 1}]
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide font-mono">
                                  {item.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-[9px] sm:text-xs text-cyan-400 font-mono">
                                  ▓▓▓
                                </div>
                                <span
                                  className={`text-xs sm:text-sm font-black text-${item.textColor}-400 font-mono`}
                                  style={{
                                    textShadow: `0 0 10px rgba(0, 255, 255, 0.5)`,
                                  }}
                                >
                                  {item.percentage}%
                                </span>
                              </div>
                            </div>
                            <div className="relative h-2 sm:h-2.5 bg-black/60 border border-cyan-400/30 overflow-hidden rounded">
                              {/* Barre de progression avec effet néon */}
                              <div
                                className={`h-full bg-gradient-to-r from-${item.colorFrom}-500 to-${item.colorTo}-500 relative transition-all duration-500`}
                                style={{
                                  width: `${item.percentage}%`,
                                  boxShadow: `0 0 15px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)`,
                                }}
                              >
                                {/* Effet glitch */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glitch opacity-30" />
                              </div>
                              {/* Segments background */}
                              <div className="absolute inset-0 flex">
                                {[...Array(10)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="flex-1 border-r border-cyan-400/10"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer stats - Design cyberpunk */}
                      <div className="relative z-10 mt-4 pt-3 border-t border-cyan-400/30">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-cyan-500/10 border border-cyan-400/40 p-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-cyan-400/20 text-2xl font-mono">
                              ≡
                            </div>
                            <p className="text-[8px] text-cyan-300 uppercase tracking-wider font-mono mb-1">
                              AVG_RATE
                            </p>
                            <p
                              className="text-base font-black text-cyan-400 font-mono"
                              style={{
                                textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                              }}
                            >
                              47.5%
                            </p>
                          </div>
                          <div className="bg-magenta-500/10 border border-magenta-400/40 p-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-magenta-400/20 text-2xl font-mono">
                              ▲
                            </div>
                            <p className="text-[8px] text-magenta-300 uppercase tracking-wider font-mono mb-1">
                              TOP_CAT
                            </p>
                            <p
                              className="text-xs font-black text-magenta-400 font-mono uppercase"
                              style={{
                                textShadow: '0 0 10px rgba(255, 0, 255, 0.8)',
                              }}
                            >
                              Courts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final discret */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur animate-fadeIn">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <div className="text-xl font-extrabold">
                  Prêt à découvrir marsAI ?
                </div>
                <div className="mt-1 text-sm text-white/70">
                  La programmation arrive — reste proche.
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                <Link
                  to="/programme"
                  className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-white/90 transition"
                  aria-label="Voir la programmation"
                >
                  Voir la programmation
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold hover:bg-white/20 transition"
                  aria-label="Se connecter"
                >
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles personnalisés */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .count {
          animation: countUp 0.3s ease-out;
          display: inline-block;
        }

        @keyframes fillBar {
          from { width: 0%; }
          to { width: var(--target-width, 100%); }
        }

        .stats-bar {
          animation: fillBar 1.5s ease-out forwards;
        }

        @keyframes drawColumn {
          from { height: 0; opacity: 0; }
          to { height: var(--final-height, 65px); opacity: 1; }
        }

        .stats-column {
          animation: drawColumn 0.8s ease-out forwards;
          animation-delay: var(--delay, 0s);
          transform-origin: bottom;
        }

        @keyframes pulse {
          0%, 100% { r: 8; opacity: 0.3; }
          50% { r: 12; opacity: 0; }
        }

        .stats-point {
          animation: glow 1.5s ease-in-out infinite;
        }

        .stats-pulse {
          animation: pulse 2s ease-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes glow {
          0%, 100% { fill: rgba(217,70,239,0.6); }
          50% { fill: rgba(217,70,239,1); }
        }

        @keyframes drawCircle {
          from { stroke-dashoffset: 314; }
          to { stroke-dashoffset: 0; }
        }

        .stats-circle {
          animation: drawCircle 2s ease-out forwards;
        }

        @keyframes expandSegment {
          from { width: 0%; }
          to { width: var(--final-width, 35%); }
        }

        .stats-segment {
          animation: expandSegment 1s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }

        @keyframes flash {
          0% {
            opacity: 0;
            transform: scale(0.5);
            box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7), inset 0 0 60px rgba(255,255,255,0);
            background: radial-gradient(circle, rgba(147, 51, 234, 0) 0%, rgba(147, 51, 234, 0) 100%);
          }
          25% {
            opacity: 0.9;
            transform: scale(1);
            box-shadow: 0 0 40px 10px rgba(147, 51, 234, 0.4), inset 0 0 60px rgba(255,255,255,0.3);
            background: radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0) 100%);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 80px 20px rgba(147, 51, 234, 0.2), inset 0 0 120px rgba(255,255,255,0.5);
            background: radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.3) 40%, rgba(147, 51, 234, 0) 100%);
          }
          75% {
            opacity: 0.6;
            transform: scale(1.5);
            box-shadow: 0 0 60px 30px rgba(147, 51, 234, 0.1), inset 0 0 180px rgba(255,255,255,0.3);
            background: radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(147, 51, 234, 0) 100%);
          }
          100% {
            opacity: 0;
            transform: scale(2);
            box-shadow: 0 0 0 50px rgba(147, 51, 234, 0), inset 0 0 0 rgba(255,255,255,0);
            background: radial-gradient(circle, rgba(147, 51, 234, 0) 0%, rgba(147, 51, 234, 0) 100%);
          }
        }

        .animate-flash {
          animation: flash 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Ultra flash court (0.15s) */
        @keyframes ultraFlash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-ultraFlash {
          animation: ultraFlash 0.15s ease-out forwards;
        }

        /* Faisceau lumineux expansion */
        @keyframes beamExpand {
          0% {
            width: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.8;
          }
        }

        .animate-beamExpand {
          animation: beamExpand 0.8s ease-out forwards;
        }

        /* Film grain animation */
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }

        /* Shimmer effect pour les barres de progression */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        /* Scanline effect cyberpunk */
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .animate-scanline {
          animation: scanline 3s linear infinite;
        }

        /* Glitch effect pour les barres */
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }

        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }
      `}</style>

      <script>{`
        (function() {
          const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = target / 30;
                const speed = 30;

                entry.target.classList.add('counted');

                const interval = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    entry.target.textContent = target.toLocaleString('fr-FR');
                    clearInterval(interval);
                  } else {
                    entry.target.textContent = Math.floor(current).toLocaleString('fr-FR');
                  }
                }, speed);
              }
            });
          }, observerOptions);

          document.querySelectorAll('.count').forEach(el => {
            observer.observe(el);
          });
        })();
      `}</script>
    </div>
  );
}
