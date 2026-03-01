import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SmallLabel, InfoRow, Divider } from '../components/ui';

export default function AProposPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen text-white">
      <CinematicBackground />

      {/* HERO ABOUT */}
      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="rounded-[36px] p-8 md:p-10">
            <SmallLabel>{t('about.badge')}</SmallLabel>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t('about.heroTitle.part1')}{' '}
              <span className="text-white/85">
                {t('about.heroTitle.highlight')}
              </span>
              {t('about.heroTitle.part2')}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              {t('about.hero.paragraph')}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoRow label="Format" value="≈ 60 sec" />
              <InfoRow label="Accès" value="Ouvert" />
              <InfoRow label="Ville" value="Marseille" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ActionButton
                to="/programme"
                label={t('about.hero.cta.program')}
                variant="primary"
              />
              <ActionButton
                to="/contact"
                label={t('about.hero.cta.contact')}
                variant="secondary"
              />
            </div>
          </GlassCard>
          <div className="h-10" />
        </div>
      </section>

      {/* MANIFESTE / INTENTION */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <GlassCard className="p-7">
              <div className="text-xs font-semibold text-white/60">
                {t('about.manifesto.label')}
              </div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                {t('about.manifesto.title.part1')}{' '}
                <span className="text-white/80">
                  {t('about.manifesto.title.highlight')}
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {t('about.manifesto.body')}
              </p>

              <Divider />

              <div className="mt-5 grid gap-3">
                <InfoRow
                  label="Ce qu’on regarde"
                  value="Direction / Récit / Image / Son"
                />
                <InfoRow label="Durée" value="1 minute" />
                <InfoRow label="Esprit" value="Ciné • Éditorial • Moderne" />
              </div>
            </GlassCard>

            <div className="grid gap-6">
              <ContentCard
                title="Pour qui ?"
                text="Professionnels, étudiants, passionnés. L’événement est pensé pour être accueillant, lisible, et ouvert."
              />
              <ContentCard
                title="Sur place"
                text="Projections, talks et ateliers. Une programmation courte mais complète : regarder, comprendre, expérimenter."
              />
              <ContentCard
                title="Ambition"
                text="Créer un rendez-vous culturel à Marseille, avec une identité forte et une expérience simple, bien produite."
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARSEILLE + MAP */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <GlassCard className="p-7">
              <div className="text-xs font-semibold text-white/60">
                {t('about.location.label')}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                {t('about.location.title')}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {t('about.location.body')}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ActionButton
                  to="/contact"
                  label={t('about.location.cta.info')}
                  variant="secondary"
                />
                <ActionButton
                  to="/programme"
                  label={t('about.location.cta.program')}
                  variant="text"
                />
              </div>
            </GlassCard>

            <GlassCard className="p-3">
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                <iframe
                  title="Carte Marseille"
                  className="h-[360px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=5.305%2C43.266%2C5.430%2C43.335&layer=mapnik&marker=43.2965%2C5.3698"
                />
              </div>
              <div className="px-4 py-4">
                <div className="text-sm font-extrabold">Marseille</div>
                <div className="mt-1 text-sm text-white/65">
                  La Plateforme, 8 Rue d'Hozier, 13002 Marseille
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section id="partenaires" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="p-8">
            <div className="text-xs font-semibold text-white/60">
              {t('about.partners.label')}
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
              {t('about.partners.title')}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
              {t('about.partners.body')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <ActionButton
                to="/contact"
                label={t('about.partners.cta.contact')}
                variant="primary"
              />
              <ActionButton
                to="/programme"
                label={t('about.partners.cta.program')}
                variant="secondary"
              />
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

/* =========================================
   COMPOSANTS INTERNES RÉUTILISABLES
========================================= */

const CinematicBackground = () => (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
      <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
    </div>
  </>
);

const GlassCard = ({ children, className = '' }) => (
  <div
    className={`rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur ${className}`}
  >
    {children}
  </div>
);

const ContentCard = ({ title, text }) => (
  <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.16)] backdrop-blur transition hover:border-white/20">
    <div className="text-sm font-extrabold text-white">{title}</div>
    <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
  </div>
);

const ActionButton = ({ to, label, variant = 'primary' }) => {
  const baseStyles =
    'rounded-full px-6 py-3 text-sm font-extrabold transition-colors';

  const variants = {
    primary: 'bg-white text-black hover:bg-white/90 border border-transparent',
    secondary:
      'border border-white/20 bg-white/10 text-white hover:bg-white/20',
    text: 'text-white/70 hover:text-white px-4',
  };

  return (
    <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
      {label}
    </Link>
  );
};
