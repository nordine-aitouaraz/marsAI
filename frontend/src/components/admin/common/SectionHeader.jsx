export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <header className="space-y-1">
      {badge && (
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          {badge}
        </p>
      )}
      <h1
        className={
          badge
            ? 'text-2xl font-semibold text-slate-50 md:text-3xl'
            : 'text-lg font-semibold text-slate-50'
        }
      >
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm text-brand-muted">{subtitle}</p>
      )}
    </header>
  );
}
