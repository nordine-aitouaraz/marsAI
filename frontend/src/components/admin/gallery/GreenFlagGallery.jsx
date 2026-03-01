import { useMemo, useState, useEffect } from 'react';
import admin from '../../../services/admin';
import { SectionHeader, ErrorAlert } from '../common';
import { useGreenFlagFavorites } from '../hooks';
import GreenFlagModal from './GreenFlagModal';
import GreenFlagCard from './GreenFlagCard';

const PAGE_SIZE = 9;

export default function GreenFlagGallery() {
  const { groups, setGroups, loading, error } = useGreenFlagFavorites();
  const [activeFavorite, setActiveFavorite] = useState(null);
  const [selectingId, setSelectingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const flatFavorites = useMemo(
    () =>
      groups.flatMap((g) =>
        (g.movies || []).map((m) => ({ admin: g, movie: m })),
      ),
    [groups],
  );
  const totalPages = Math.max(
    1,
    Math.ceil((flatFavorites.length || 0) / PAGE_SIZE),
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedGroups = useMemo(() => {
    if (!flatFavorites.length) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = flatFavorites.slice(start, end);
    const byAdmin = new Map();
    pageItems.forEach(({ admin: a, movie }) => {
      if (!byAdmin.has(a.admin_id))
        byAdmin.set(a.admin_id, { ...a, movies: [] });
      byAdmin.get(a.admin_id).movies.push(movie);
    });
    return Array.from(byAdmin.values());
  }, [flatFavorites, currentPage]);

  const handleSelect = async () => {
    if (!activeFavorite) return;
    const movieId = activeFavorite.movie.id;
    setSelectingId(movieId);
    try {
      await admin.updateFilmStatus(movieId, 'selected');
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          movies: g.movies.map((m) =>
            m.id === movieId ? { ...m, status: 'selected' } : m,
          ),
        })),
      );
      setActiveFavorite(null);
    } catch (err) {
      // error is shown via parent state if needed
    } finally {
      setSelectingId(null);
    }
  };

  const hasData = flatFavorites.length > 0;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Galerie des vidéos (coups de cœur jury)"
        subtitle="Vidéos marquées en green flag par les membres du jury, regroupées par admin."
      />
      <ErrorAlert message={error} />
      {loading && (
        <div className="py-12 text-center text-brand-muted">
          Chargement des favoris du jury...
        </div>
      )}
      {!loading && !hasData && !error && (
        <div className="py-12 text-center text-brand-muted rounded-xl border border-slate-800 bg-slate-900/50">
          Aucun film en green flag pour le moment.
        </div>
      )}
      {!loading &&
        hasData &&
        paginatedGroups.map((group) => (
          <section key={group.admin_id} className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {group.first_name} {group.last_name}
                </h3>
                <p className="text-[11px] text-brand-muted">{group.email}</p>
              </div>
              <span className="text-[11px] text-brand-muted">
                {group.movies.length} film(s) en green flag
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.movies.map((movie) => (
                <GreenFlagCard
                  key={movie.id}
                  group={group}
                  movie={movie}
                  onOpen={setActiveFavorite}
                />
              ))}
            </div>
          </section>
        ))}
      {hasData && (
        <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-brand-muted">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
          >
            Précédent
          </button>
          <span>
            Page{' '}
            <span className="font-semibold text-slate-100">{currentPage}</span>{' '}
            / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
          >
            Suivant
          </button>
        </div>
      )}
      <GreenFlagModal
        favorite={activeFavorite}
        onClose={() => setActiveFavorite(null)}
        onSelect={handleSelect}
        selecting={!!selectingId}
      />
    </div>
  );
}
