import {
  MapPin,
  Radio,
  Clapperboard,
  MessageCircle,
  Monitor,
  Users,
  GraduationCap,
  Projector,
  Trophy,
  Music,
} from 'lucide-react';

/**
 * Phase 1 – Description du festival (cahier des charges partenaires).
 * Format de la sélection, lieu (La Plateforme), publics, conférences, workshops, marsAI Night.
 */

const formatSelection = [
  {
    icon: MessageCircle,
    text: 'Appel à projet de 2 mois',
  },
  {
    icon: Monitor,
    text: "50 courts-métrages d'une minute sélectionnés en compétition officielle",
  },
  {
    icon: Radio,
    text: 'Diffusion en ligne des œuvres (web et réseaux sociaux)',
  },
  {
    icon: Clapperboard,
    text: 'Diffusion en salles de cinéma et festivals de films',
  },
];

const lieu = {
  name: 'La Plateforme',
  exName: 'ex Dock des Suds',
  points: [
    "4000 m² d'espaces dans le centre de Marseille, pour accueillir l'événement",
    '2 espaces pour Mars.A.I : La salle des Sucres (conférences et remise des prix) • La salle Plaza (accueil, animation, restauration)',
    'Espace entièrement modulable',
  ],
};

const conferences = {
  title: 'Deux journées de conférences gratuites',
  subtitle:
    "De débats engagés, de confrontations d'idées, d'interrogations stimulantes.",
  publics: [
    'Professionnels des Industries Culturelles et Créatives',
    'Étudiants',
    'Grand public',
  ],
};

const aussi = [
  {
    icon: GraduationCap,
    title: 'Des Workshops',
    detail:
      "Animés par des experts de l'IA générative. Thématiques : scénario, création et post-production.",
  },
  {
    icon: Projector,
    title: 'Des Projections',
    detail: 'Des films en compétition et hors-compétition.',
  },
  {
    icon: Trophy,
    title: 'Une remise des prix',
    detail:
      "En présence d'un jury prestigieux, incluant des cinéastes, acteurs et créateurs de contenu renommés.",
  },
];

const marsAINight = {
  title: 'marsAI Night',
  tagline: 'Fête Électro mêlant IA et futurs souhaitables',
  type: 'Grande cérémonie de clôture',
  date: 'Samedi 13 Juin',
  time: 'à partir de 19h',
};

export default function FestivalDescription() {
  return (
    <section className="relative py-16 md:py-24 px-4" id="le-festival">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Intro */}
        <div>
          <div className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1.5 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
              Présentation
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Le festival
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            MarsAI réunit créateurs et public autour du film court généré ou
            co-créé avec l'IA. Première édition à Marseille en 2026 à La
            Plateforme — un rendez-vous unique pour découvrir et récompenser la
            création audiovisuelle assistée par l'intelligence artificielle.
          </p>
        </div>

        {/* Format de la sélection */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight">
            Format de la sélection
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formatSelection.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/20 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-slate-200 text-sm md:text-base pt-1.5">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Le lieu - La Plateforme */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
            Le lieu
          </h3>
          <p className="text-brand-primary font-semibold text-lg md:text-xl">
            {lieu.name}{' '}
            <span className="text-slate-400 font-normal">({lieu.exName})</span>
          </p>
          <ul className="mt-4 space-y-2 text-slate-300 text-sm md:text-base">
            {lieu.points.map((point, i) => (
              <li key={i} className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-primary/80" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conférences + Publics ciblés */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Deux journées de conférences gratuites
          </h3>
          <p className="text-slate-400 italic text-sm md:text-base mb-6">
            De débats engagés, de confrontations d'idées, d'interrogations
            stimulantes.
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-3">
            Publics ciblés
          </p>
          <ul className="flex flex-wrap gap-2">
            {conferences.publics.map((p) => (
              <li key={p}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                  <Users className="h-3.5 w-3.5 text-brand-primary" />
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mais aussi */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            … Mais aussi
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {aussi.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-snug">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* marsAI Night */}
        <div className="rounded-2xl border-2 border-brand-primary/40 bg-gradient-to-br from-brand-primary/10 to-transparent p-6 md:p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-primary mb-2">
            … Et enfin !
          </p>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
            {marsAINight.title}
          </h3>
          <p className="text-slate-300 text-sm md:text-base mb-1">
            {marsAINight.tagline}
          </p>
          <p className="text-white font-semibold mb-3">{marsAINight.type}</p>
          <p className="text-brand-primary font-bold text-lg">
            {marsAINight.date} — {marsAINight.time}
          </p>
          <div className="mt-4 flex justify-center">
            <Music className="h-8 w-8 text-brand-primary/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
