import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { useJury } from '../hooks';
import JuryCreateForm from './JuryCreateForm';
import JuryTable from './JuryTable';

const INITIAL_FORM = {
  first_name: '',
  last_name: '',
  role: '',
  bio: '',
  photo_url: '',
};

export default function JuryManagement() {
  const { members, loading, error, setMembers, refetch } = useJury();
  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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
      await admin.createJuryMember(form);
      setForm(INITIAL_FORM);
      setCreating(false);
      refetch();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce membre du jury ?')) return;
    setDeletingId(id);
    try {
      const admin = require('../../../services/admin').default;
      await admin.deleteJuryMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion du jury"
        subtitle="Ajoutez les membres du jury, leurs bios et leurs spécialités."
      />
      <SectionCard
        title="Membres du jury"
        action={
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? 'Annuler' : '+ Ajouter un juré'}
          </button>
        }
      >
        <ErrorAlert message={error} className="mb-3" />
        <JuryCreateForm
          form={form}
          onChange={handleChange}
          onSubmit={handleCreate}
          loading={createLoading}
          error={createError}
          onCancel={() => setCreating(false)}
          isOpen={creating}
        />
        <JuryTable
          members={members}
          loading={loading}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </SectionCard>
    </div>
  );
}
