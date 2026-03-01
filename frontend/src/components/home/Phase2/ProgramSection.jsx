import React from 'react';
import { ProgramCard } from './ProgramCard';
import { LinkButton } from '../../ui';
import { NAV_ROUTES } from '../../../constants/homeConstants';
import { heroAnimationStyles } from '../../sections/heroAnimations';

export function ProgramSection() {
  return (
    <section className="px-6 py-20">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1.5 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400"></div>
            <span className="text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
              Programme
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Trois{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              volets
            </span>
          </h3>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            Regarder. Comprendre. Expérimenter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
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

        <div className="text-center animate-fadeIn">
          <LinkButton to={NAV_ROUTES.PROGRAM} variant="primary">
            Programme complet →
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
