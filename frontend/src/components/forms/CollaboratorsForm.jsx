export default function CollaboratorsForm({ value, onChange, hasError }) {
  const list = value || [];

  const updateRow = (index, field, newValue) => {
    const next = list.map((row, i) =>
      i === index ? { ...row, [field]: newValue } : row,
    );
    onChange(next);
  };

  const addRow = () => {
    onChange([
      ...list,
      { civility: '', first_name: '', last_name: '', role: '', email: '' },
    ]);
  };

  const removeRow = (index) => {
    onChange(list.filter((_, i) => i !== index));
  };

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-100">
          4. Collaborateurs (optionnel)
        </h2>
        <button
          type="button"
          onClick={addRow}
          className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-800"
        >
          Ajouter un collaborateur
        </button>
      </div>

      {list.length === 0 && (
        <p className="text-xs text-brand-muted">
          Ajoutez les autres personnes ayant contribué à l&apos;œuvre
          (producteurs, co-réalisateurs, compositeurs, etc.).
        </p>
      )}

      <div className="mt-2 space-y-3">
        {list.map((collab, index) => (
          <div
            key={index}
            className="grid gap-2 rounded-md border border-slate-800/80 bg-slate-950/40 p-3 md:grid-cols-5"
          >
            <select
              value={collab.civility || ''}
              onChange={(e) => updateRow(index, 'civility', e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-100"
            >
              <option value="">Civ.</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
            <input
              type="text"
              placeholder="Prénom"
              value={collab.first_name || ''}
              onChange={(e) => updateRow(index, 'first_name', e.target.value)}
              maxLength={80}
              className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-100"
            />
            <input
              type="text"
              placeholder="Nom"
              value={collab.last_name || ''}
              onChange={(e) => updateRow(index, 'last_name', e.target.value)}
              maxLength={80}
              className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-100"
            />
            <input
              type="text"
              placeholder="Rôle (ex : Producteur)"
              value={collab.role || ''}
              onChange={(e) => updateRow(index, 'role', e.target.value)}
              maxLength={120}
              className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-100"
            />
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email"
                value={collab.email || ''}
                onChange={(e) => updateRow(index, 'email', e.target.value)}
                maxLength={200}
                className="flex-1 rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-100"
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-300 hover:border-red-400 hover:text-red-300"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
