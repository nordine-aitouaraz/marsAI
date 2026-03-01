import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useParticiperState from './useParticiperState';
import useParticiperValidation from './useParticiperValidation';
import useParticiperSubmit from './useParticiperSubmit';

export default function useParticiper() {
  const { t } = useTranslation();

  const state = useParticiperState();

  const {
    filmmaker,
    setFilmmaker,
    movie,
    setMovie,
    aiDeclaration,
    setAiDeclaration,
    collaborators,
    setCollaborators,
    assets,
    setAssets,
    tags,
    setTags,
    movieVideo,
    setMovieVideo,
    currentStep,
    setCurrentStep,
    filmmakerId,
    setFilmmakerId,
    movieId,
    setMovieId,
    aiSaved,
    setAiSaved,
    collaboratorsSaved,
    setCollaboratorsSaved,
    assetsTagsSaved,
    setAssetsTagsSaved,
    submitting,
    setSubmitting,
    error,
    setError,
    movieUploadProgress,
    setMovieUploadProgress,
    assetsUploadProgress,
    setAssetsUploadProgress,
    finished,
  } = state;

  const {
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
  } = useParticiperValidation();

  // clear erreurs et état de soumission global quand on change d'étape
  useEffect(() => {
    setError(null);
    setSubmitting(false);
  }, [currentStep, setError, setSubmitting]);

  // submission logic
  const submit = useParticiperSubmit({
    filmmaker: state.filmmaker,
    movie: state.movie,
    movieVideo: state.movieVideo,
    collaborators: state.collaborators,
    assets: state.assets,
    tags: state.tags,
    filmmakerId: state.filmmakerId,
    movieId: state.movieId,
    setFilmmakerId: state.setFilmmakerId,
    setMovieId: state.setMovieId,
    setAiSaved: state.setAiSaved,
    setCollaboratorsSaved: state.setCollaboratorsSaved,
    setAssetsTagsSaved: state.setAssetsTagsSaved,
    setSubmitting: state.setSubmitting,
    setError: state.setError,
    setCurrentStep: state.setCurrentStep,
    setMovieUploadProgress: state.setMovieUploadProgress,
    setAssetsUploadProgress: state.setAssetsUploadProgress,
    aiDeclaration: state.aiDeclaration,
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
    currentStep: state.currentStep,
    t,
  });

  return {
    filmmaker,
    setFilmmaker,
    movie,
    setMovie,
    movieVideo,
    setMovieVideo,
    aiDeclaration,
    setAiDeclaration,
    collaborators,
    setCollaborators,
    assets,
    setAssets,
    tags,
    setTags,
    currentStep,
    setCurrentStep,
    filmmakerId,
    movieId,
    aiSaved,
    collaboratorsSaved,
    assetsTagsSaved,
    submitting,
    error,
    movieUploadProgress,
    assetsUploadProgress,
    finished,
    handleSubmitFilmmaker: submit.handleSubmitFilmmaker,
    handleSubmitMovie: submit.handleSubmitMovie,
    handleSubmitAIDeclaration: submit.handleSubmitAIDeclaration,
    handleSubmitCollaborators: submit.handleSubmitCollaborators,
    handleSubmitAssetsTags: submit.handleSubmitAssetsTags,
  };
}
