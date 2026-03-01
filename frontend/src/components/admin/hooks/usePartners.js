import { useEffect, useState, useCallback } from 'react';

export default function usePartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const admin = require('../../../services/admin').default;
      const data = await admin.getPartners();
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  return { partners, loading, error, setPartners, refetch: fetchPartners };
}
