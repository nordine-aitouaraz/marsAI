import { Calendar, Clock } from 'lucide-react';

/**
 * Chronologie des événements marsAI (cahier des charges).
 * 1) Planning potentiel annuel (Fév–Juin)
 * 2) Programme des 2 jours (Vendredi / Samedi)
 */

const annualPhases = [
  {
    id: 'appel',
    label: "Ouverture de l'appel à projet",
    months: 'Février – Mars',
    weeks: 'S1 à S9',
    detail:
      'Candidatures ouvertes sur la plateforme en ligne du Mobile Film Festival dans la section dédiée à marsAI',
    color: 'bg-sky-500/20 border-sky-500/40 text-sky-200',
  },
  {
    id: 'selection',
    label: 'Sélection des 50 courts-métrages en compétition officielle',
    months: 'Avril',
    weeks: 'S10 à S13',
    detail: null,
    color: 'bg-sky-500/20 border-sky-500/40 text-sky-200',
  },
  {
    id: 'diffusion',
    label: 'Diffusion en ligne des courts-métrages sélectionnés',
    months: 'Mai',
    weeks: 'S14 à S18',
    detail: 'Plateforme web et réseaux sociaux',
    color: 'bg-sky-500/20 border-sky-500/40 text-sky-200',
  },
  {
    id: 'festival',
    label: 'Festival marsAI',
    months: 'Juin',
    weeks: 'S19 à S21',
    detail: 'Deux jours à La Plateforme',
    color: 'bg-brand-primary/25 border-brand-primary/50 text-brand-primary',
  },
];

const vendredi = [
  {
    time: '10:00 – 11:00',
    title: 'Ouverture du festival',
    desc: 'Présentation du Festival, des partenaires et des sélections',
  },
  {
    time: '11:00 – 13:00',
    title: 'Workshop',
    desc: 'Les outils IA récents dédiés à la post-production',
  },
  { time: '13:00 – 14:00', title: 'Pause', desc: null },
  {
    time: '14:00 – 16:00',
    title: 'Table ronde',
    desc: "Débat : impact actuel de l'IA générative sur les industries créatives",
  },
  {
    time: '16:00 – 17:00',
    title: 'Diffusion des œuvres hors-compétition',
    desc: null,
  },
  {
    time: '17:00 – 19:00',
    title: 'Carte blanche',
    desc: "Réalisateur·ice utilisant l'IA",
  },
];

const samedi = [
  {
    time: '10:00 – 11:00',
    title: 'Table ronde',
    desc: "Créateurs ayant adopté les outils IA dans l'écriture et la réalisation de films",
  },
  {
    time: '11:00 – 13:00',
    title: 'Fireside chat',
    desc: 'Avec les membres du Jury',
  },
  { time: '13:00 – 14:00', title: 'Pause', desc: null },
  {
    time: '14:00 – 16:00',
    title: 'Présentation des projets sélectionnés',
    desc: null,
  },
  {
    time: '16:00 – 18:00',
    title: 'Keynote',
    desc: 'Avec les entreprises développant de nouveaux outils IA',
  },
  { time: '18:00 – 19:00', title: 'Remise des prix', desc: null },
  {
    time: 'À partir de 19:00',
    title: 'Soirée de clôture',
    desc: 'marsAI Night — Fête électro mêlant IA et futurs souhaitables',
  },
];

export default function Phase1Chronology() {
  return (
    <section className="relative py-16 md:py-24 px-4" id="chronologie">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-4">
          <Calendar className="h-4 w-4 text-brand-primary mr-2" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
            Chronologie
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
          Planning des événements
        </h2>

        {/* Planning annuel */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-white mb-6">
            Planning potentiel — de février à juin
          </h3>
          <div className="space-y-4">
            {annualPhases.map((phase) => (
              <div
                key={phase.id}
                className={`rounded-xl border p-4 md:p-5 ${phase.color}`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-white">{phase.label}</span>
                  <span className="text-xs opacity-90">• {phase.months}</span>
                  <span className="text-[11px] opacity-75">
                    ({phase.weeks})
                  </span>
                </div>
                {phase.detail && (
                  <p className="text-sm opacity-90 mt-2">{phase.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Programme 2 jours */}
        <h3 className="text-lg font-semibold text-white mb-6">
          Programme du festival — Vendredi & Samedi
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Vendredi */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h4 className="text-amber-200 font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Vendredi
            </h4>
            <ul className="space-y-3">
              {vendredi.map((slot, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-24 font-mono text-amber-200/90">
                    {slot.time}
                  </span>
                  <div>
                    <span className="font-semibold text-white">
                      {slot.title}
                    </span>
                    {slot.desc && (
                      <p className="text-slate-400 text-xs mt-0.5">
                        {slot.desc}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Samedi */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
            <h4 className="text-violet-200 font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Samedi
            </h4>
            <ul className="space-y-3">
              {samedi.map((slot, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-28 font-mono text-violet-200/90">
                    {slot.time}
                  </span>
                  <div>
                    <span className="font-semibold text-white">
                      {slot.title}
                    </span>
                    {slot.desc && (
                      <p className="text-slate-400 text-xs mt-0.5">
                        {slot.desc}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
