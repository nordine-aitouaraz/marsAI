import { useEffect, useState, useRef } from 'react';
import api from '../services/api';

/**
 * Hook pour récupérer la phase actuelle du festival
 * et calculer un décompte temps-réel côté frontend.
 *
 * Le backend fournit :
 * - phase : phase1 | phase2 | phase3 | ended
 * - label : étiquette lisible
 * - serverTime : date/heure serveur
 * - target : date/heure de fin de la phase courante
 * - remaining : décompte calculé côté serveur au moment de la réponse
 */
export function useFestivalCountdown(pollIntervalMs = 60000) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    phase: null,
    label: null,
    target: null,
    remaining: null,
  });

  const baseServerTimeRef = useRef(null);
  const targetTimeRef = useRef(null);
  const lastSyncRef = useRef(null);
  const refreshTimerRef = useRef(null);
  const tickTimerRef = useRef(null);

  useEffect(() => {
    const syncFromServer = async () => {
      try {
        const data = await api.get('/festival-phase');

        const serverNow = new Date(data.serverTime);
        const target = new Date(data.target);

        baseServerTimeRef.current = serverNow.getTime();
        targetTimeRef.current = target.getTime();
        lastSyncRef.current = Date.now();

        setState({
          loading: false,
          error: null,
          phase: data.phase,
          label: data.label,
          target,
          remaining: data.remaining,
        });
      } catch (err) {
        // On garde l'état précédent si possible, mais on signale l'erreur
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            prev.error ||
            'Impossible de récupérer le compte à rebours du festival.',
        }));
      }
    };

    const tick = () => {
      if (!baseServerTimeRef.current || !targetTimeRef.current) return;

      const nowLocal = Date.now();
      const elapsedSinceSync = nowLocal - (lastSyncRef.current || nowLocal);
      const currentServerMs = baseServerTimeRef.current + elapsedSinceSync;
      const diffMs = Math.max(0, targetTimeRef.current - currentServerMs);
      const totalSeconds = Math.floor(diffMs / 1000);

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setState((prev) => ({
        ...prev,
        remaining: {
          totalSeconds,
          days,
          hours,
          minutes,
          seconds,
        },
      }));

      // Si on arrive à zéro, on resynchronise pour récupérer la phase suivante
      if (totalSeconds <= 0) {
        syncFromServer();
      }
    };

    // Première synchronisation
    syncFromServer();

    // Tick toutes les secondes pour mettre à jour le décompte
    tickTimerRef.current = setInterval(tick, 1000);

    // On resynchronise périodiquement avec le backend pour éviter la dérive
    refreshTimerRef.current = setInterval(syncFromServer, pollIntervalMs);

    return () => {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [pollIntervalMs]);

  return state;
}
