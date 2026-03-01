export default function MovieAssetsForm({ value, onChange, hasError }) {
  const data = value || {};

  const handleStillsChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    onChange({
      ...data,
      stills: files,
    });
  };

  const handleSubtitleChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    onChange({
      ...data,
      subtitle: file,
    });
  };

  const stillsCount = Array.isArray(data.stills) ? data.stills.length : 0;

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        4. Assets (captures &amp; sous-titres)
      </h2>

      <p className="mb-3 text-xs text-brand-muted">
        Uploadez jusqu&apos;à 3 captures d&apos;écran (fichiers image) et un
        fichier de sous-titres optionnel au format <code>.srt</code>. Ces
        fichiers seront stockés côté serveur avec votre film.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Captures d&apos;écran (max 3 fichiers image)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleStillsChange}
            className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-900 hover:file:bg-brand-accent"
          />
          {stillsCount > 0 && (
            <p className="text-[11px] text-brand-muted">
              {stillsCount} fichier(s) sélectionné(s).
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Fichier de sous-titres (optionnel, .srt uniquement)
          </label>
          <input
            type="file"
            accept=".srt"
            onChange={handleSubtitleChange}
            className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-900 hover:file:bg-white/90"
          />
          {data.subtitle && (
            <p className="text-[11px] text-brand-muted">
              Fichier sélectionné : {data.subtitle.name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
