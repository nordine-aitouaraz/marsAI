import { useState, useCallback, useRef, useEffect } from 'react';

// useAsync: lightweight helper to run async functions with built-in
// loading/error state and safe cancellation on unmount.
// Usage:
// const op = useAsync(async (args) => { ... });
// await op.run(args);
// op.loading / op.error available for UI

export default function useAsync(fn) {
  const mounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(
    async (...args) => {
      if (typeof fn !== 'function')
        throw new Error('useAsync: missing function');
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        if (!mounted.current) return res;
        setLoading(false);
        return res;
      } catch (err) {
        if (mounted.current) {
          setError(err);
          setLoading(false);
        }
        throw err;
      }
    },
    [fn],
  );

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { run, loading, error, setError, reset };
}
