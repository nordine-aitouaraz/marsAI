import { useTranslation } from 'react-i18next';

export default function MovieForm({
  value,
  onChange,
  onVideoChange,
  hasError,
  videoRequired = false,
}) {
  const { t } = useTranslation();
  const handle = (field) => (e) =>
    onChange({ ...value, [field]: e.target.value });

  const handleDuration = (e) => {
    let val = e.target.value.replace(',', '.');
    // Autoriser uniquement chiffres et point
    val = val.replace(/[^0-9.]/g, '');
    if (val === '') {
      onChange({ ...value, duration: '' });
      return;
    }

    const num = parseFloat(val);
    if (!Number.isFinite(num)) {
      onChange({ ...value, duration: '' });
      return;
    }

    // Durée en minutes : autoriser décimales entre 0 (non nul) et 1 minute max
    let clamped = Math.max(0, Math.min(1, num));
    onChange({ ...value, duration: clamped.toString() });
  };

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        2. Film soumis
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Titre original</label>
          <input
            type="text"
            value={value.original_title || ''}
            onChange={handle('original_title')}
            required
            minLength={2}
            maxLength={150}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Titre anglais</label>
          <input
            type="text"
            value={value.english_title || ''}
            onChange={handle('english_title')}
            required
            minLength={2}
            maxLength={150}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Langue principale</label>
          <input
            type="text"
            value={value.language || ''}
            onChange={handle('language')}
            maxLength={80}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Synopsis (langue originale)
          </label>
          <textarea
            rows={3}
            value={value.synopsis_original || ''}
            onChange={handle('synopsis_original')}
            maxLength={1000}
            className="resize-none rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Synopsis (anglais)</label>
          <textarea
            rows={3}
            value={value.synopsis_english || ''}
            onChange={handle('synopsis_english')}
            maxLength={1000}
            className="resize-none rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Fichier vidéo (16:9, max 1 min)
          </label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            required={videoRequired}
            onChange={(e) =>
              onVideoChange && onVideoChange(e.target.files?.[0] || null)
            }
            className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-900 hover:file:bg-brand-accent"
          />
          <p className="mt-1 text-[11px] text-brand-muted">
            {t('participate.videoHint')}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Lien YouTube (optionnel, si déjà publié)
          </label>
          <input
            type="url"
            value={value.youtube_url || ''}
            onChange={handle('youtube_url')}
            maxLength={255}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
    </section>
  );
}
