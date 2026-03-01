import { useEffect, useState, useCallback } from 'react';

export default function useGreenFlagFavorites() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const admin = require('../../../services/admin').default;
      const data = await admin.getGreenFlagFavorites();
      setGroups(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { groups, setGroups, loading, error, refetch: fetchFavorites };
}
