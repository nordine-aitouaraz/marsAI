import { useEffect, useState, useCallback } from 'react';
import AdminFilmGallery from './AdminFilmGallery';

export default function MoviesManagement({ currentAdmin }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Onglet "Films (sélection & gagnants)" : on ne charge que les films selected (et donc les gagnants, qui en sont un sous-ensemble).
  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('statuses', 'selected,winner');
      const res = await fetch(`/api/admin/films?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error(data.error || 'Erreur de chargement.');
      setMovies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const winnersCount = movies.filter((m) => m.is_winner).length;

  return (
    <div className="space-y-4 relative">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des films
        </h2>
        <p className="text-sm text-brand-muted">
          Visualisez les soumissions, filtrez par statut et marquez les films
          gagnants.
        </p>
      </header>
      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        {!isSuperAdmin ? (
          <p className="text-xs text-brand-muted">
            Cette section est réservée au super administrateur. Utilisez
            l&apos;onglet{' '}
            <span className="font-semibold text-slate-100">« Mes vidéos »</span>{' '}
            pour gérer vos films assignés.
          </p>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                Liste des films
              </p>
              <div className="flex items-center gap-3 text-[11px] text-brand-muted">
                <span>
                  Gagnants actuels :{' '}
                  <span className="font-semibold text-slate-100">
                    {winnersCount} / 6
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    Affichage :{' '}
                    <span className="text-slate-100">
                      Sélectionnés & Gagnants
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <AdminFilmGallery
              movies={movies}
              loading={loading}
              error={error}
              onReload={fetchMovies}
            />
          </>
        )}
      </div>
    </div>
  );
}
