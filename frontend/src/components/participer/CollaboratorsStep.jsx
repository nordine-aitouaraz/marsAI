import { useTranslation } from 'react-i18next';
import CollaboratorsForm from '../../components/forms/CollaboratorsForm';
import StepForm from './StepForm';

export default function CollaboratorsStep({
  value,
  onChange,
  onBack,
  onSubmit,
  submitting,
  error,
}) {
  const { t } = useTranslation();

  return (
    <StepForm
      onSubmit={onSubmit}
      onBack={onBack}
      backLabel={t('participate.backStep', { step: 4 })}
      submitLabel={t('participate.finalize')}
      submitting={submitting}
      error={error}
    >
      <CollaboratorsForm value={value} onChange={onChange} hasError={!!error} />
    </StepForm>
  );
}
