import React from 'react';
import { useTranslation } from 'react-i18next';
import BannerBg from '../../assets/images/bn03.png';
import { legalData } from './legalData';
import LegalCard from './LegalCard';
import LegalHeader from './LegalHeader';

export default function CGU() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-slate-200 py-20 px-6 font-sans overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${BannerBg})`,
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <LegalHeader />

        {/* Grid Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalData.map((item) => (
            <LegalCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-24 text-center relative z-10 px-4">
          <p className="text-[12px] md:text-[15px] text-slate-600 uppercase tracking-[0.2em] md:tracking-[0.5em] mb-4 font-mono leading-loose">
            MarsAI x Mobile Film Festival x La Plateforme
          </p>
        </div>
      </div>
    </div>
  );
}
