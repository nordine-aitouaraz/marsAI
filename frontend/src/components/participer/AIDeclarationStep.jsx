import { useTranslation } from 'react-i18next';
import AIDeclarationForm from '../../components/forms/AIDeclarationForm';
import StepForm from './StepForm';

export default function AIDeclarationStep({
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
      backLabel={t('participate.backStep', { step: 2 })}
      submitLabel={t('participate.saveAi')}
      submitting={submitting}
      error={error}
    >
      <AIDeclarationForm value={value} onChange={onChange} hasError={!!error} />
    </StepForm>
  );
}
