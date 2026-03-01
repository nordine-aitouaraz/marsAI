import { useTranslation } from 'react-i18next';
import MovieForm from '../../components/forms/MovieForm';
import StepForm from './StepForm';

export default function MovieStep({
  value,
  onChange,
  onVideoChange,
  onBack,
  onSubmit,
  submitting,
  error,
  uploadProgress = 0,
}) {
  const { t } = useTranslation();
  return (
    <StepForm
      onSubmit={onSubmit}
      onBack={onBack}
      backLabel={t('participate.backStep', { step: 1 })}
      submitLabel={t('participate.saveMovie')}
      submitting={submitting}
      error={error}
    >
      <MovieForm
        value={value}
        onChange={onChange}
        onVideoChange={onVideoChange}
        hasError={!!error}
        videoRequired={!value?.youtube_url}
      />

      {uploadProgress > 0 && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded bg-slate-800">
            <div
              className="h-2 bg-brand-primary transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-white/60">
            Téléversement : {uploadProgress}%
          </div>
        </div>
      )}
    </StepForm>
  );
}
