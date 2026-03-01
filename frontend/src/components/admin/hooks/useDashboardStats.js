import { useEffect, useState } from 'react';

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    movies: null,
    filmmakers: null,
    newsletter: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const admin = require('../../../services/admin').default;
        const [movies, filmmakers, newsletter] = await Promise.all([
          admin.getFilms(),
          admin.getFilmmakers(),
          admin.getNewsletterSubscribers(),
        ]);
        if (!cancelled) {
          const filmmakersList = Array.isArray(filmmakers) ? filmmakers : [];
          setStats({
            movies: Array.isArray(movies) ? movies.length : null,
            filmmakers: filmmakersList.length,
            newsletter: Array.isArray(newsletter) ? newsletter.length : null,
          });
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
