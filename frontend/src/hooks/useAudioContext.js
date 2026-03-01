import { useRef } from 'react';

/**
 * Hook personnalisé pour gérer le son de caméra et l'AudioContext
 * @returns {() => void} - Fonction pour jouer le son
 */
export function useAudioContext() {
  const audioCtxRef = useRef(null);

  const playCameraSound = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const duration = 0.08;
    const buffer = ctx.createBuffer(
      1,
      ctx.sampleRate * duration,
      ctx.sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Générer du bruit blanc avec décadence
    for (let i = 0; i < data.length; i += 1) {
      const decay = 1 - i / data.length;
      data[i] = (Math.random() * 2 - 1) * 0.4 * decay;
    }

    // Créer et configurer la source audio
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
  };

  return playCameraSound;
}
