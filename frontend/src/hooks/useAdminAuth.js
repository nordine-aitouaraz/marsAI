import { useCallback, useEffect, useState } from 'react';

export function useAdminAuth() {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setChecking(true);
    setError(null);

    try {
      const res = await fetch('/api/admins/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        setAdmin(data || null);
        setIsAuthenticated(true);
      } else if (res.status === 401 || res.status === 403) {
        setAdmin(null);
        setIsAuthenticated(false);
      } else {
        setError("Impossible de vérifier l'authentification admin.");
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Erreur réseau lors de la vérification de l'accès admin.");
      setIsAuthenticated(false);
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admins/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // ignore
    } finally {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  }, []);

  return {
    admin,
    role: admin?.role || null,
    checking,
    isAuthenticated,
    error,
    reload: load,
    logout,
  };
}
