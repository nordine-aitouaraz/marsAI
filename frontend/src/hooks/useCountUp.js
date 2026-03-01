import { useEffect, useState, useRef } from 'react';

/**
 * Hook personnalisé pour animer un compteur avec IntersectionObserver
 * @param {number} target - Nombre cible à atteindre
 * @param {number} duration - Durée de l'animation en ms (défaut: 4000)
 * @param {boolean} triggerOnce - Activer une seule fois (défaut: true)
 * @param {boolean} enabled - Activer le hook (défaut: true)
 * @returns {[number, React.RefObject]} - [Valeur actuelle, Référence DOM]
 */
export function useCountUp(
  target,
  duration = 4000,
  triggerOnce = true,
  enabled = true,
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && (!triggerOnce || !hasStarted)) {
          setHasStarted(true);
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasStarted, triggerOnce, enabled]);

  return [count, ref];
}
