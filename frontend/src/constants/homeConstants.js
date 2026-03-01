// Données des cartes de statistiques
export const STATS_DATA = [
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

// Données d'analytique
export const ANALYTICS_DATA = [
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

// Routes de navigation
export const NAV_ROUTES = {
  PROGRAM: '/programme',
  ABOUT: '/a-propos',
  CONTACT: '/contact',
  LOGIN: '/login',
};

// HOME_TEXTS has been migrated to i18n (see src/i18n/*/translation.json)
// (left intentionally empty to avoid duplication)

// Configuration des maps
export const MAP_MODES = {
  GTA: 'gta',
  REAL: 'real',
};
