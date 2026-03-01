import { useTranslation } from 'react-i18next';
import FilmmakerForm from '../../components/forms/FilmmakerForm';
import StepForm from './StepForm';

export default function FilmmakerStep({
  value,
  onChange,
  onSubmit,
  submitting,
  error,
}) {
  const { t } = useTranslation();

  return (
    <StepForm
      onSubmit={onSubmit}
      submitLabel={t('participate.saveFilmmaker')}
      submitting={submitting}
      error={error}
    >
      <FilmmakerForm value={value} onChange={onChange} hasError={!!error} />
    </StepForm>
  );
}
