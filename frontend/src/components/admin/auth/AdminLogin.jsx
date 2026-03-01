import { useState } from 'react';
import { ErrorAlert, FormField } from '../common';

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const api = require('../../../services/api').default;
      const data = await api.post('/admins/auth/login', { email, password });
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-12">
      <div className="space-y-2 text-center">
        <p className="inline-flex items-center justify-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          Accès restreint
        </p>
        <h1 className="text-2xl font-semibold text-slate-50">
          Connexion espace admin
        </h1>
        <p className="text-sm text-brand-muted">
          Connectez-vous avec un compte administrateur pour gérer le festival
          marsAI.
        </p>
      </div>
      <ErrorAlert message={error} />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-brand-border/60 bg-brand-surface/80 p-4 shadow-soft-md"
      >
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-soft-md hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
