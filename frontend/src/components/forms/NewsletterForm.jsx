import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError(t('newsletter.error.required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(t('newsletter.error.invalid'));
      return;
    }

    setLoading(true);
    try {
      const api = require('../../services/api').default;
      await api.post('/newsletters/subscribe', { email: trimmed });

      setSuccess(t('newsletter.success'));
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-left backdrop-blur"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Newsletter
        </p>
        <p className="mt-1 text-xs text-white/70">
          Recevoir les infos sur la programmation, les appels à films et les
          événements autour du festival.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email"
          required
          maxLength={200}
          className="w-full flex-1 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/70"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </div>

      {error && <p className="text-[11px] text-red-300">{error}</p>}
      {success && !error && (
        <p className="text-[11px] text-emerald-300">{success}</p>
      )}
    </form>
  );
}
