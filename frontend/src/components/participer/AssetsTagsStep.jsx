import { useTranslation } from 'react-i18next';
import MovieAssetsForm from '../../components/forms/MovieAssetsForm';
import MovieTagsForm from '../../components/forms/MovieTagsForm';
import StepForm from './StepForm';

export default function AssetsTagsStep({
  assets,
  onAssetsChange,
  tags,
  onTagsChange,
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
      backLabel={t('participate.backStep', { step: 3 })}
      submitLabel={t('participate.saveAssetsTags')}
      submitting={submitting}
      error={error}
    >
      <MovieAssetsForm
        value={assets}
        onChange={onAssetsChange}
        hasError={!!error}
      />
      <MovieTagsForm value={tags} onChange={onTagsChange} hasError={!!error} />

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
