import { useEffect, useState, useMemo } from 'react';
import MyMoviesGrid from './MyMoviesGrid';
import MyMovieModal from './MyMovieModal';

export default function MyMoviesGallery() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flagFilter, setFlagFilter] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [savingReviewId, setSavingReviewId] = useState(null);
  const [savingFlagId, setSavingFlagId] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/films', {
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
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const displayMovies = useMemo(() => {
    if (!flagFilter) return movies;
    if (flagFilter === 'unseen') return movies.filter((m) => !m.my_flag);
    return movies.filter((m) => m.my_flag === flagFilter);
  }, [movies, flagFilter]);

  const handleSaveReview = async (id, payload) => {
    if (
      payload.rating !== null &&
      (Number.isNaN(payload.rating) ||
        payload.rating < 1 ||
        payload.rating > 10)
    ) {
      setError('La note doit être un nombre entre 1 et 10.');
      return;
    }
    setSavingReviewId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            "Impossible d'enregistrer votre note/commentaire.",
        );
      setMovies((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, my_rating: payload.rating, my_comment: payload.comment }
            : m,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingReviewId(null);
    }
  };

  const handleUpdateFlag = async (id, flag) => {
    setSavingFlagId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/flag`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ flag }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            'Impossible de mettre à jour votre flag personnel.',
        );
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, my_flag: flag } : m)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingFlagId(null);
    }
  };

  const currentMovie =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < displayMovies.length
      ? displayMovies[activeIndex]
      : null;

  const goNext = () => {
    if (!displayMovies.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      const next = prev + 1;
      return next >= displayMovies.length ? prev : next;
    });
  };

  const goPrev = () => {
    if (!displayMovies.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      const next = prev - 1;
      return next < 0 ? prev : next;
    });
  };

  return (
    <div className="space-y-4 relative">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Mes vidéos assignées
        </h2>
        <p className="text-sm text-brand-muted">
          Visionnez les films qui vous sont assignés, prenez une décision et
          laissez éventuellement une note et un commentaire privés.
        </p>
      </header>
      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Mes vidéos
          </p>
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-brand-muted">
              Filtre:
            </label>
            <select
              value={flagFilter}
              onChange={(e) => setFlagFilter(e.target.value)}
              className="rounded-full border border-slate-800/80 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-100 outline-none"
            >
              <option value="">Tous mes films</option>
              <option value="green">Green flag</option>
              <option value="yellow">Yellow flag</option>
              <option value="red">Red flag</option>
              <option value="unseen">Non visionnés</option>
            </select>
          </div>
        </div>
        {error && (
          <p className="mb-3 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}
        {loading && (
          <div className="text-center py-8 text-sm text-brand-muted">
            Chargement...
          </div>
        )}
        {!loading && (
          <MyMoviesGrid
            movies={displayMovies}
            onSelect={(index) => setActiveIndex(index)}
          />
        )}
      </div>
      <MyMovieModal
        movie={currentMovie}
        isOpen={currentMovie != null}
        onClose={() => setActiveIndex(null)}
        onNext={goNext}
        onPrev={goPrev}
        onSaveReview={handleSaveReview}
        onUpdateFlag={handleUpdateFlag}
        savingReview={savingReviewId}
        savingFlag={savingFlagId}
      />
    </div>
  );
}
