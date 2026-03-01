import { FormField, ErrorAlert } from '../common';

export default function PartnerCreateForm({
  form,
  onChange,
  onSubmit,
  loading,
  error,
  onCancel,
  isOpen,
}) {
  if (!isOpen) return null;
  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 grid gap-3 rounded-md border border-slate-800/80 bg-slate-950/40 px-3 py-3 text-xs md:grid-cols-2"
    >
      <FormField
        label="Nom du partenaire"
        name="name"
        value={form.name}
        onChange={onChange}
        required
      />
      <FormField
        label="Site web (optionnel)"
        type="url"
        name="website_url"
        value={form.website_url}
        onChange={onChange}
      />
      <FormField
        label="URL du logo (optionnel)"
        type="url"
        name="logo_url"
        value={form.logo_url}
        onChange={onChange}
      />
      <FormField
        label="Description (optionnelle)"
        name="description"
        value={form.description}
        onChange={onChange}
        rows={3}
        className="md:col-span-2"
      />
      <div className="md:col-span-2">
        <ErrorAlert message={error} />
      </div>
      <div className="md:col-span-2 flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Création...' : 'Ajouter le partenaire'}
        </button>
      </div>
    </form>
  );
}
