export default function StatCard({ label, value, loading, description }) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-50">
        {loading || value === null ? '—' : value}
      </p>
      {description && (
        <p className="mt-1 text-xs text-brand-muted">{description}</p>
      )}
    </div>
  );
}
