import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateFilmmakerField } from '../../utils/validation';

export default function FilmmakerForm({ value, onChange, hasError }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const validateField = (field, v) => {
    const key = validateFilmmakerField(field, v);
    return key ? t(key) : null;
  };

  const setField = (field, v) => {
    onChange({
      ...value,
      [field]: v,
    });
    const msg = validateField(field, v);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handle = (field) => (e) =>
    setField(
      field,
      e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    );

  const handleMobile = (e) => {
    const raw = e.target.value;
    // Autoriser uniquement chiffres, espaces et symboles usuels de téléphone
    const cleaned = raw.replace(/[^0-9+().\s-]/g, '');
    setField('mobile', cleaned);
  };

  return (
    <section
      className={[
        'rounded-lg border bg-brand-surface/80 p-4 shadow-soft-sm',
        hasError ? 'border-red-500/70' : 'border-slate-800/80',
      ].join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        1. Réalisateur / Réalisatrice
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Civilité</label>
          <select
            value={value.civility || ''}
            onChange={handle('civility')}
            required
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          >
            <option value="">Sélectionner</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Prénom</label>
          <input
            type="text"
            value={value.first_name || ''}
            onChange={handle('first_name')}
            required
            minLength={2}
            maxLength={80}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.first_name && (
            <p className="text-[11px] text-red-300">{errors.first_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Nom</label>
          <input
            type="text"
            value={value.last_name || ''}
            onChange={handle('last_name')}
            required
            minLength={2}
            maxLength={80}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.last_name && (
            <p className="text-[11px] text-red-300">{errors.last_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Date de naissance</label>
          <input
            type="date"
            value={value.birth_date || ''}
            onChange={handle('birth_date')}
            required
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Email</label>
          <input
            type="email"
            value={value.email || ''}
            onChange={handle('email')}
            required
            maxLength={200}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.email && (
            <p className="text-[11px] text-red-300">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Mobile</label>
          <input
            type="tel"
            value={value.mobile || ''}
            onChange={handleMobile}
            pattern="[0-9+().\s-]{6,20}"
            maxLength={20}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
          {errors.mobile && (
            <p className="text-[11px] text-red-300">{errors.mobile}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Profession</label>
          <input
            type="text"
            value={value.job || ''}
            onChange={handle('job')}
            maxLength={120}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Ville / Pays</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ville"
              value={value.city || ''}
              onChange={handle('city')}
              maxLength={80}
              className="w-1/2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
            />
            <input
              type="text"
              placeholder="Pays"
              value={value.country || ''}
              onChange={handle('country')}
              maxLength={80}
              className="w-1/2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Comment avez-vous découvert le festival ?
          </label>
          <input
            type="text"
            value={value.discovery_source || ''}
            onChange={handle('discovery_source')}
            maxLength={200}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <label className="mt-5 flex items-center gap-2 text-xs text-brand-muted">
          <input
            type="checkbox"
            checked={!!value.newsletter}
            onChange={handle('newsletter')}
            className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-brand-primary"
          />
          S&apos;abonner à la newsletter
        </label>
      </div>
    </section>
  );
}
