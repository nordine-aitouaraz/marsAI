import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { useAdmins } from '../hooks';
import AdminCreateForm from './AdminCreateForm';
import AdminsTable from './AdminsTable';

const INITIAL_FORM = { first_name: '', last_name: '', email: '', password: '' };

export default function AdminsManagement() {
  const { admins, loading, error, refetch } = useAdmins();
  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateLoading(true);
    try {
      const admin = require('../../../services/admin').default;
      await admin.createAdmin(form);
      setForm(INITIAL_FORM);
      setCreating(false);
      refetch();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion des admins"
        subtitle="Créez, éditez ou désactivez les comptes administrateurs."
      />
      <SectionCard
        title="Liste des admins"
        action={
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? 'Annuler' : '+ Nouvel admin'}
          </button>
        }
      >
        <ErrorAlert message={error} className="mb-3" />
        <AdminCreateForm
          form={form}
          onChange={handleChange}
          onSubmit={handleCreate}
          loading={createLoading}
          error={createError}
          onCancel={() => setCreating(false)}
          isOpen={creating}
        />
        <AdminsTable admins={admins} loading={loading} />
      </SectionCard>
    </div>
  );
}
