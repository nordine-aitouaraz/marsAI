export default function AIDeclarationForm({ value, onChange, hasError }) {
  const handle = (field) => (e) =>
    onChange({ ...value, [field]: e.target.value });

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        3. Déclaration IA
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Type d&apos;œuvre générée
          </label>
          <select
            value={value.artwork_type || ''}
            onChange={handle('artwork_type')}
            required
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          >
            <option value="" disabled>
              Sélectionner
            </option>
            <option value="100_ai">100% IA</option>
            <option value="hybrid">Hybride (IA + tournage réel)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Stack technologique principale
          </label>
          <input
            type="text"
            placeholder="Ex : Stable Diffusion, Runway, GPT-4, etc."
            value={value.tech_stack || ''}
            onChange={handle('tech_stack')}
            maxLength={200}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <label className="text-xs text-brand-muted">
          Méthodologie de création
        </label>
        <textarea
          rows={4}
          value={value.methodology || ''}
          onChange={handle('methodology')}
          minLength={30}
          maxLength={2000}
          className="resize-none rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
        />
      </div>
    </section>
  );
}
