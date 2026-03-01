import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  UserPlus,
  Copyright,
  BrainCircuit,
  MessageCircle,
  FileText,
} from 'lucide-react';

import BannerBg from '../assets/images/bn03.png';

export default function CGU() {
  const { t } = useTranslation();

  const legalData = [
    {
      id: 1,
      side: 'left',
      title: '01. OBJET DU SERVICE',
      desc: 'Le Festival marsAI est un concours de courts-métrages de 60 secondes maximum, générés par Intelligence Artificielle. La plateforme permet la soumission et la diffusion de ces œuvres.',
      icon: <FileText className="text-pink-500" size={50} />,
    },
    {
      id: 2,
      side: 'right',
      title: '02. PROPRIÉTÉ INTELLECTUELLE',
      desc: 'Le Festival marsAI est un concours de courts-métrages de 60 secondes maximum, générés par Intelligence Artificielle. La plateforme permet la soumission et la diffusion de ces œuvres.',
      icon: <Copyright className="text-blue-400" size={50} />,
    },
    {
      id: 3,
      side: 'left',
      title: '03. ACCÈS ET INSCRIPTION',
      desc: "L'inscription est gratuite et ouverte aux créateurs du monde entier (+120 pays). Un compte 'Réalisateur' est obligatoire pour soumettre un film et suivre son statut de validation.",
      icon: <UserPlus className="text-pink-500" size={50} />,
    },
    {
      id: 4,
      side: 'right',
      title: '04. ÉTHIQUE ET RESPONSABILITÉ',
      desc: "L'usage de l'IA doit être responsable. Tout contenu haineux, discriminatoire ou portant atteinte à la dignité humaine (deepfakes non consentis) est strictement interdit.",
      icon: <BrainCircuit className="text-blue-400" size={50} />,
    },
    {
      id: 5,
      side: 'left',
      title: '05. PROTECTION DES DONNÉES',
      desc: "Conformément au RGPD, vos données personnelles sont collectées uniquement pour la gestion du concours. Vous disposez d'un droit d'accès et de suppression via votre tableau de bord.",
      icon: <ShieldCheck className="text-pink-500" size={50} />,
    },
    {
      id: 6,
      side: 'right',
      title: '06. CONTACT ET SUPPORT',
      desc: 'Pour toute question juridique ou technique, contactez notre équipe à support@mars-ai.com. Nous répondons sous 48h aux demandes des participants.',
      icon: <MessageCircle className="text-blue-400" size={50} />,
    },
  ];

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
        <header className="relative text-center mb-16 md:mb-24 px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-24 md:h-32 bg-blue-500/20 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>

          <div className="flex justify-center items-center mb-4 gap-2 md:gap-4 relative z-10">
            <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-blue-500/50"></div>
            <span className="text-[10px] md:text-[15px] tracking-[0.3em] md:tracking-[0.5em] text-blue-400 uppercase font-bold">
              Protocoles Juridiques
            </span>
            <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-pink-500/50"></div>
          </div>

          <h1
            className="relative z-10 text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-r from-blue-400 from-[35%] to-pink-500 to-[65%] bg-clip-text text-transparent inline-block 
               [paint-order:stroke_fill]
               [-webkit-text-stroke:1.5px_white] md:[-webkit-text-stroke:1px_white]
               drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] 
               filter"
          >
            MARS.AI
          </h1>

          <p className="relative z-10 mt-4 md:mt-6 text-white uppercase tracking-[0.15em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm leading-relaxed">
            Conditions Générales d'Utilisation{' '}
            <span className="mx-1 md:mx-2 text-white">//</span>
            <span className="text-white font-mono">2026</span>
          </p>
        </header>

        {/* Grid Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalData.map((item) => (
            <div
              key={item.id}
              className={`
                relative p-[1.5px] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]
                ${
                  item.side === 'left'
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                    : 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                }
              `}
            >
              <div className="bg-[#020617]/90 backdrop-blur-md rounded-[14px] p-8 h-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase italic">
                      {item.title}
                    </h3>
                    <p className="text-white text-sm leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
