export default function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-soft-md hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Enregistrement...' : children}
    </button>
  );
}
