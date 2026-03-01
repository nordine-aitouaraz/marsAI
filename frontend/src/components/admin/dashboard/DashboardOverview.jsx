import { SectionHeader, ErrorAlert, StatCard } from '../common';
import { useDashboardStats } from '../hooks';
import { useAdmin } from '../../../contexts';
import { useFestivalPhase } from '../../../hooks/useFestivalPhase';

export default function DashboardOverview() {
  const { stats, loading, error } = useDashboardStats();
  const { admin } = useAdmin();
  const {
    phase,
    loading: phaseLoading,
    error: phaseError,
    updatePhase,
  } = useFestivalPhase();

  const handleSet = async (p) => {
    try {
      await updatePhase(p);
    } catch (err) {
      alert('Échec mise à jour phase: ' + (err.message || err));
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="Dashboard"
        title="Vue d'ensemble"
        subtitle="Surveillez l'activité du festival: soumissions, réalisateurs et engagement newsletter."
      />
      <ErrorAlert message={error || phaseError} />

      {/* contrôle de la phase (super_admin seulement) */}
      <section className="bg-white/10 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Phase du festival</h2>
        {phaseLoading ? (
          <p>Chargement...</p>
        ) : (
          <p className="mb-2">
            Phase courante : <strong>{phase || 'inconnue'}</strong>
          </p>
        )}
        {admin?.role === 'super_admin' && (
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={phase === 'phase1'}
              onClick={() => handleSet('phase1')}
            >
              Phase 1
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={phase === 'phase2'}
              onClick={() => handleSet('phase2')}
            >
              Phase 2
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={phase === 'phase3'}
              onClick={() => handleSet('phase3')}
            >
              Phase 3
            </button>
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Films soumis"
          value={stats.movies}
          loading={loading}
          description="Nombre total de films enregistrés dans la base."
        />
        <StatCard
          label="Réalisateurs inscrits"
          value={stats.filmmakers}
          loading={loading}
          description='Dossiers de réalisateurs créés via le formulaire "Participer".'
        />
        <StatCard
          label="Newsletter"
          value={stats.newsletter}
          loading={loading}
          description="Réalisateurs ayant accepté de recevoir les communications du festival."
        />
      </section>
    </div>
  );
}
