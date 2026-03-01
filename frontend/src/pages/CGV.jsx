import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CGV() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="relative min-h-screen text-white">
      <CinematicBackground />

      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 md:p-12 shadow-[0_25px_90px_rgba(0,0,0,.18)] backdrop-blur">
            {currentLang === 'fr' ? <CGVFrench /> : <CGVEnglish />}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --- TEXTE EN FRANÇAIS (CGV & RÈGLEMENT) --- */
const CGVFrench = () => (
  <>
    <div className="mb-10 border-b border-white/10 pb-6">
      <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-2 block text-blue-500">
        Légal
      </span>
      <h1 className="font-cy text-3xl md:text-5xl text-white font-black uppercase tracking-tight">
        Règlement du Festival & CGV
      </h1>
      <p className="mt-4 text-sm text-white/50 font-mono">
        Dernière mise à jour : Février 2026
      </p>
    </div>

    <div className="prose prose-invert max-w-none text-sm text-white/80 leading-relaxed space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          1. Organisateur et Objet
        </h2>
        <p>
          Le festival de courts-métrages "MarsAI" est organisé conjointement par
          La Plateforme et le Mobile Film Festival, dont le siège est situé au 8
          Rue d'Hozier, 13002 Marseille (ci-après "l'Organisateur"). Les
          présentes conditions régissent la soumission d'œuvres
          cinématographiques et l'achat éventuel de billetterie.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          2. Conditions d'Éligibilité des Films
        </h2>
        <p>
          Pour être sélectionné, le film soumis doit respecter impérativement
          les critères suivants :
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Durée maximale : 1 minute (60 secondes) générique inclus.</li>
          <li>
            Utilisation de l'Intelligence Artificielle : Le film doit être soit
            100% généré par IA, soit hybride, avec une déclaration transparente
            des outils (Tech Stack) utilisés lors de la soumission.
          </li>
          <li>
            Ne contenir aucun message incitant à la haine, discriminatoire, ou
            contraire aux bonnes mœurs.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          3. Propriété Intellectuelle & Intelligence Artificielle
        </h2>
        <p>
          Le Participant garantit qu'il dispose de tous les droits
          d'exploitation nécessaires sur l'œuvre soumise. Étant donné la nature
          du festival, le Participant garantit expressément que son utilisation
          d'outils d'Intelligence Artificielle (génération d'images, de voix, de
          musiques) respecte les Conditions d'Utilisation desdits outils.
          L'Organisateur décline toute responsabilité en cas de plainte pour
          violation de droits d'auteur émanant d'un tiers.
          <br />
          <br />
          En soumettant son film, le Participant concède à l'Organisateur, à
          titre gratuit et non exclusif, le droit de diffuser l'œuvre lors de
          l'événement physique, ainsi que d'utiliser des extraits et des images
          fixes (stills) pour la promotion du festival sur tous supports.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          4. Inscriptions, Tarifs et Rétractation
        </h2>
        <p>
          L'inscription d'un film ou l'achat de billets pour l'événement
          physique se fait via la plateforme. Conformément à l'article L221-28
          du Code de la consommation, le droit de rétractation de 14 jours ne
          s'applique pas aux prestations d'activités de loisirs fournies à une
          date déterminée. Par conséquent, les frais d'inscription ou d'achat de
          billets sont définitifs et non remboursables, même en cas de
          non-sélection du film par le jury.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          5. Décisions du Jury
        </h2>
        <p>
          Les décisions du comité de sélection et du jury de MarsAI sont
          souveraines, confidentielles et sans appel. L'Organisateur n'est pas
          tenu de justifier le refus d'un film.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">6. Loi Applicable</h2>
        <p>
          Le présent règlement est soumis au droit français. Tout litige relatif
          à son interprétation ou à son exécution sera de la compétence
          exclusive des tribunaux de Marseille.
        </p>
      </div>
    </div>
  </>
);

/* --- TEXTE EN ANGLAIS (CGV & RÈGLEMENT) --- */
const CGVEnglish = () => (
  <>
    <div className="mb-10 border-b border-white/10 pb-6">
      <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-2 block text-blue-500">
        Legal
      </span>
      <h1 className="font-cy text-3xl md:text-5xl text-white font-black uppercase tracking-tight">
        Festival Rules & Terms of Sale
      </h1>
      <p className="mt-4 text-sm text-white/50 font-mono">
        Last updated: February 2026
      </p>
    </div>

    <div className="prose prose-invert max-w-none text-sm text-white/80 leading-relaxed space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          1. Organizer and Purpose
        </h2>
        <p>
          The "MarsAI" short film festival is jointly organized by La Plateforme
          and the Mobile Film Festival, headquartered at 8 Rue d'Hozier, 13002
          Marseille, France (hereinafter "the Organizer"). These terms govern
          the submission of cinematic works and the potential purchase of
          tickets.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          2. Film Eligibility Conditions
        </h2>
        <p>
          To be selected, the submitted film must strictly adhere to the
          following criteria:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Maximum duration: 1 minute (60 seconds) including credits.</li>
          <li>
            Use of Artificial Intelligence: The film must be either 100%
            AI-generated or hybrid, with a transparent declaration of the tools
            (Tech Stack) used upon submission.
          </li>
          <li>
            Must not contain any hate speech, discriminatory content, or violate
            public morals.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          3. Intellectual Property & Artificial Intelligence
        </h2>
        <p>
          The Participant guarantees that they hold all necessary exploitation
          rights for the submitted work. Given the nature of the festival, the
          Participant expressly guarantees that their use of Artificial
          Intelligence tools complies with the Terms of Use of said tools. The
          Organizer declines all responsibility in the event of a copyright
          infringement claim by a third party.
          <br />
          <br />
          By submitting their film, the Participant grants the Organizer, free
          of charge and on a non-exclusive basis, the right to screen the work
          during the physical event, as well as to use excerpts and still images
          for the promotion of the festival on all media.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          4. Registration, Fees, and Withdrawal
        </h2>
        <p>
          Film registration or ticket purchases for the physical event are done
          via the platform. In accordance with Article L221-28 of the French
          Consumer Code, the 14-day right of withdrawal does not apply to
          leisure activities provided on a specific date. Consequently,
          registration or ticket fees are final and non-refundable, even if the
          film is not selected by the jury.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">5. Jury Decisions</h2>
        <p>
          The decisions of the MarsAI selection committee and jury are final,
          confidential, and not subject to appeal. The Organizer is not
          obligated to justify the rejection of a film.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">6. Applicable Law</h2>
        <p>
          These rules are subject to French law. Any dispute relating to their
          interpretation or execution shall be under the exclusive jurisdiction
          of the courts of Marseille.
        </p>
      </div>
    </div>
  </>
);

const CinematicBackground = () => (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
      <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
    </div>
  </>
);
