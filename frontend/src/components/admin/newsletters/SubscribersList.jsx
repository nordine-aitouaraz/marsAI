import { LoadingRow, EmptyRow } from '../common';

export default function SubscribersList({ subscribers, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs">
        <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
          <tr>
            <th className="px-2 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
          {loading && (
            <LoadingRow colSpan={3} message="Chargement des inscrits..." />
          )}
          {!loading && subscribers.length === 0 && (
            <EmptyRow colSpan={3} message="Aucun inscrit à la newsletter." />
          )}
          {!loading &&
            subscribers.map((sub) => (
              <tr key={sub.id}>
                <td className="px-2 py-2">{sub.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
