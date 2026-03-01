export default function SectionCard({
  title,
  action,
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm ${className}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
          {title}
        </p>
        {action}
      </div>
      {children}
    </div>
  );
}
