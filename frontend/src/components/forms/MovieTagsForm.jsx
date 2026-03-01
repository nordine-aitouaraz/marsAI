import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MovieTagsForm({ value, onChange, hasError }) {
  const list = Array.isArray(value) ? value : [];
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const addTag = () => {
    const raw = (input || '').trim();
    if (!raw) return;

    if (list.length >= 10) {
      setError(t('error.tags.max'));
      return;
    }

    const normalized = raw.startsWith('#') ? raw : `#${raw}`;

    // Autorise lettres/chiffres/_/- sans espace
    if (!/^#[A-Za-z0-9-_]{2,30}$/.test(normalized)) {
      setError(t('error.tags.pattern'));
      return;
    }

    if (list.includes(normalized)) {
      setInput('');
      setError(null);
      return;
    }

    onChange([...list, normalized]);
    setInput('');
    setError(null);
  };

  const removeTag = (tag) => {
    onChange(list.filter((t) => t !== tag));
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        5. Tags / Hashtags
      </h2>

      <p className="mb-3 text-xs text-brand-muted">
        Ajoutez des hashtags pour décrire le film (thématiques, techniques,
        ambiance, etc.). Exemple : <code>#ai</code>, <code>#animation</code>,{' '}
        <code>#marseille</code>.
      </p>

      <div className="flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="#hashtag"
          className="flex-1 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100"
        />
        <button
          type="button"
          onClick={addTag}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-white/90 md:mt-0"
        >
          Ajouter
        </button>
      </div>

      {error && <p className="mt-2 text-[11px] text-red-300">{error}</p>}

      {list.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {list.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-100"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-[10px] text-slate-400 hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
