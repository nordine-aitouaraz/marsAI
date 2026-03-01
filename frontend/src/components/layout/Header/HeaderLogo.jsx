export default function HeaderLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* L'icône (conservée telle quelle) */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-primary via-brand-primary-soft to-brand-accent shadow-soft-md">
        <span className="text-sm font-bold text-slate-900">mAI</span>
      </div>

      {/* Le texte MarsAI */}
      <span className="font-display text-lg font-bold tracking-wide text-white">
        MarsAI
      </span>
    </div>
  );
}
