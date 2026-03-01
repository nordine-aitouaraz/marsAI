import React from 'react';
import { ProgramCard } from './ProgramCard';
import { LinkButton } from '../../ui';
import { NAV_ROUTES } from '../../../constants/homeConstants';
import { useTranslation } from 'react-i18next';
import { heroAnimationStyles } from '../../sections/heroAnimations';

export function ManifestoSection() {
  const { t } = useTranslation();
  return (
    <section className="px-6 py-12">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        {/* Main Grid: Texte + Volets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne 1: Texte Manifesto */}
          <div className="animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 mb-4">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                Vision
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-3">
              La technologie n'est pas le sujet.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                L'intention l'est.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              marsAI met en avant la réalisation, l'écriture, le montage et la
              direction artistique. L'IA peut faire partie du processus — mais
              ce qui compte, c'est la forme finale : une idée lisible, une image
              tenue, un son travaillé.
            </p>

            {/* Subtitle */}
            <p className="mt-3 text-sm text-white/60 italic">
              Un rendez-vous culturel, pas un produit tech.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <LinkButton to={NAV_ROUTES.ABOUT} variant="secondary">
                En savoir plus →
              </LinkButton>
            </div>
          </div>

          {/* Colonne 2: Les 3 Volets */}
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
              <ProgramCard
                title="Projections"
                description="Courts 60s. Un rythme, une idée, une vision."
              />
              <ProgramCard
                title="Talks"
                description="Créateurs partagent leurs retours d'expérience."
              />
              <ProgramCard
                title="Ateliers"
                description="Pratique : écriture, montage, direction."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
