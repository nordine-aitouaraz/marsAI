import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageBackground } from '../components/home';
import {
  Phase1Hero,
  FestivalDescription,
  Phase1Chronology,
  Phase1Map,
  NewsletterSection,
} from '../components/home/Phase1';
import {
  CTASection,
  HeroCamera,
  StatsSection as ProjectorStatsSection,
} from '../components/home/Phase2';
import { Phase3Winners } from '../components/home/Phase3';
import { HOME_STYLES } from '../constants/homeStyles';
import { CookieBanner } from '../components/ui/CookieBanner';
import { heroAnimationStyles } from '../components/sections/heroAnimations';
import api from '../services/api';
import { useFestivalPhase } from '../hooks/useFestivalPhase';

/**
 * Page d'accueil – 3 phases :
 * Phase 1 : Hero vidéo + description festival + newsletter
 * Phase 2 : HeroCamera (films sélectionnés), stats, manifeste, CTA
 * Phase 3 : Grand Prix / Palmarès (winners)
 */
export default function Home() {
  const [searchParams] = useSearchParams();
  const phaseParam = parseInt(searchParams.get('phase'), 10);
  const fallback = [1, 2, 3].includes(phaseParam) ? phaseParam : 1;

  const { phase: apiPhase, loading: phaseLoading } = useFestivalPhase();

  // states must be declared unconditionally at top level
  const [phase2Movies, setPhase2Movies] = useState([]);
  const [phase3Winners, setPhase3Winners] = useState([]);
  const [phase3Loading, setPhase3Loading] = useState(false);

  // determine phase after states
  const phase =
    !phaseLoading && apiPhase
      ? Number(apiPhase.replace('phase', ''))
      : fallback;

  // effects must be declared before any early return so hooks order remains stable
  useEffect(() => {
    if (phase !== 2) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get('/movies');
        if (!cancelled) setPhase2Movies(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPhase2Movies([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) return;
    let cancelled = false;
    setPhase3Loading(true);
    (async () => {
      try {
        const data = await api.get('/movies/winners');
        if (!cancelled) setPhase3Winners(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPhase3Winners([]);
      } finally {
        if (!cancelled) setPhase3Loading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  if (phaseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Chargement phase...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <PageBackground />

      {/* ——— Phase 1 : Hero + Description + Newsletter ——— */}
      {phase === 1 && (
        <>
          <Phase1Hero
            videoSrc="/video/video4.mp4"
            title="Un festival pour raconter fort, en une minute."
            subtitle="1 minute pour créer. 1 minute pour choquer. 1 minute pour marquer."
            ctaLabel="Participer au projet"
            ctaTo="/participer"
          />
          <FestivalDescription />
          <Phase1Chronology />
          <Phase1Map />
          <NewsletterSection />
        </>
      )}
      {/* ——— Phase 2 : Camera, stats, manifeste, CTA ——— */}
      {phase === 2 && (
        <>
          <Phase1Hero
            videoSrc="/video/video4.mp4"
            title="Un festival AI, en une minute."
            subtitle="Un second souffle pour le festival : plus de films, plus de participants, plus d'ambition. Découvrez les chiffres clés du festival et rejoignez l'aventure !"
            ctaLabel="Découvrir les films"
            ctaTo="/catalogue"
          />
          <HeroCamera moviesFromApi={phase2Movies} />
          <ProjectorStatsSection />
          <CTASection />
        </>
      )}

      {/* ——— Phase 3 : Grand Prix / Palmarès ——— */}
      {phase === 3 && (
        <>
          <Phase3Winners
            winnersFromApi={phase3Winners}
            loading={phase3Loading}
          />
        </>
      )}

      <CookieBanner />

      <style>{HOME_STYLES}</style>
      <style>{heroAnimationStyles}</style>
    </div>
  );
}
