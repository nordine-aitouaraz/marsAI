import { LoadingRow, EmptyRow } from '../common';

export default function AdminsTable({ admins, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs">
        <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
          <tr>
            <th className="px-2 py-2">Nom</th>
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Rôle</th>
            <th className="px-2 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
          {loading && (
            <LoadingRow
              colSpan={4}
              message="Chargement des administrateurs..."
            />
          )}
          {!loading && admins.length === 0 && (
            <EmptyRow
              colSpan={4}
              message="Aucun administrateur trouvé pour le moment."
            />
          )}
          {!loading &&
            admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-2 py-2">
                  {admin.first_name} {admin.last_name}
                </td>
                <td className="px-2 py-2">{admin.email}</td>
                <td className="px-2 py-2 text-xs text-brand-muted">
                  {admin.role}
                </td>
                <td className="px-2 py-2 text-right text-xs text-brand-muted">
                  —
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
