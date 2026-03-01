import { LoadingRow, EmptyRow } from '../common';

export default function PartnersTable({
  partners,
  loading,
  deletingId,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs">
        <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
          <tr>
            <th className="px-2 py-2">Nom</th>
            <th className="px-2 py-2">Site web</th>
            <th className="px-2 py-2">Description</th>
            <th className="px-2 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
          {loading && (
            <LoadingRow colSpan={4} message="Chargement des partenaires..." />
          )}
          {!loading && partners.length === 0 && (
            <EmptyRow colSpan={4} message="Aucun partenaire." />
          )}
          {!loading &&
            partners.map((p) => (
              <tr key={p.id}>
                <td className="px-2 py-2">{p.name}</td>
                <td className="px-2 py-2 text-xs text-brand-muted">
                  {p.website_url ? (
                    <a
                      href={p.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-dotted"
                    >
                      {p.website_url}
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-2 py-2 text-xs text-brand-muted max-w-xs truncate">
                  {p.description || '—'}
                </td>
                <td className="px-2 py-2 text-right text-[11px]">
                  <button
                    type="button"
                    disabled={deletingId === p.id}
                    onClick={() => onDelete(p.id)}
                    className="rounded-full bg-red-500/90 px-2 py-0.5 text-[11px] font-semibold text-slate-900 hover:bg-red-400 disabled:opacity-60"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
