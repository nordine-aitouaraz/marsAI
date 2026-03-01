import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';

export default function VideosDistribution({ currentAdmin }) {
  const [minReviewers, setMinReviewers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  const handleDistribute = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/admin/films/distribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ minReviewers: Number(minReviewers) || 2 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error ||
            data.message ||
            'Impossible de lancer la répartition automatique.',
        );
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Répartition automatique des vidéos"
        subtitle={`Distribue chaque vidéo à au moins ${minReviewers} admin(s) en équilibrant la charge.`}
      />
      {!isSuperAdmin && (
        <p className="rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
          Seul un compte <span className="font-semibold">super_admin</span> peut
          lancer la répartition.
        </p>
      )}
      <SectionCard title="Répartition">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <label className="block text-[11px] font-medium text-brand-muted">
              Nombre minimum d&apos;admins par vidéo
            </label>
            <input
              type="number"
              min={1}
              value={minReviewers}
              onChange={(e) => setMinReviewers(e.target.value)}
              className="w-28 rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
            />
            <p className="text-[11px] text-brand-muted max-w-md">
              Laissez à 2 pour que chaque vidéo soit vue par au moins deux
              admins.
            </p>
          </div>
          <button
            type="button"
            disabled={loading || !isSuperAdmin}
            onClick={handleDistribute}
            className="inline-flex rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Répartition en cours...' : 'Lancer la répartition'}
          </button>
        </div>
        <ErrorAlert message={error} className="mt-3" />
        {result && (
          <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-950/30 px-3 py-3 text-xs text-emerald-100 space-y-1">
            <p className="font-semibold text-emerald-200">
              Répartition effectuée avec succès.
            </p>
            <p>
              Films concernés :{' '}
              <span className="font-mono">{result.moviesCount ?? '—'}</span>
            </p>
            <p>
              Nouvelles assignations :{' '}
              <span className="font-mono">
                {result.assignmentsCreated ?? '0'}
              </span>
            </p>
            <p>
              Minimum admins/vidéo :{' '}
              <span className="font-mono">
                {result.reviewersRequired ?? minReviewers}
              </span>
            </p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
