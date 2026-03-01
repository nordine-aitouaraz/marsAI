import { useEffect } from 'react';
import useSubmission from './useSubmission';
import useAsync from './useAsync';

export default function useParticiperSubmit({
  // state pieces & setters from useParticiperState
  filmmaker,
  movie,
  movieVideo,
  collaborators,
  assets,
  tags,
  filmmakerId,
  movieId,
  setFilmmakerId,
  setMovieId,
  setAiSaved,
  setCollaboratorsSaved,
  setAssetsTagsSaved,
  setSubmitting,
  setError,
  setCurrentStep,
  // progress setters
  setMovieUploadProgress,
  setAssetsUploadProgress,
  // include aiDeclaration (used as fallback in submit handler)
  aiDeclaration,
  // validators
  validateFilmmaker,
  validateMovie,
  validateAiDeclaration,
  validateCollaborators,
  // translation helper
  currentStep,
  t,
}) {
  const submission = useSubmission();

  // --- operations using useAsync ---
  const filmmakerOp = useAsync(async (filmmakerLocal) => {
    const data = await submission.createFilmmaker(filmmakerLocal);
    setFilmmakerId(data.id);
    setCurrentStep(2);
    return data;
  });

  const movieOp = useAsync(async (localMovie) => {
    const payload = { ...localMovie, filmmaker_id: filmmakerId };
    // reset progress
    if (typeof setMovieUploadProgress === 'function') setMovieUploadProgress(0);

    const data = await submission.submitMovieWithProgress(
      payload,
      movieVideo,
      (pct) => {
        if (typeof setMovieUploadProgress === 'function')
          setMovieUploadProgress(pct);
      },
    );

    // ensure progress shown as complete briefly
    if (typeof setMovieUploadProgress === 'function')
      setMovieUploadProgress(100);

    setMovieId(data.movie_id);
    setCurrentStep(3);
    return data;
  });

  const aiOp = useAsync(async (payload) => {
    await submission.saveAiDeclaration(movieId, payload);
    setAiSaved(true);
    setCurrentStep(4);
  });

  const collabOp = useAsync(async () => {
    if (!collaborators.length) {
      setCollaboratorsSaved(true);
      return;
    }
    await Promise.all(
      collaborators.map((c) => submission.addCollaborator(movieId, c)),
    );
    setCollaboratorsSaved(true);
  });

  const assetsOp = useAsync(async () => {
    const stillFiles = Array.isArray(assets.stills) ? assets.stills : [];
    if (stillFiles.length > 0 || assets.subtitle) {
      stillFiles.forEach((file) => {
        if (!file.type.startsWith('image/'))
          throw new Error(t('error.assets.still.invalidType'));
      });
      if (assets.subtitle) {
        const name = assets.subtitle.name || '';
        if (!name.toLowerCase().endsWith('.srt'))
          throw new Error(t('error.assets.subtitle.invalidType'));
      }
    }

    // reset progress
    if (typeof setAssetsUploadProgress === 'function')
      setAssetsUploadProgress(0);

    const requests = [];
    if (stillFiles.length > 0 || assets.subtitle)
      requests.push(
        submission.uploadAssetsWithProgress(
          movieId,
          stillFiles,
          assets.subtitle,
          (pct) => {
            if (typeof setAssetsUploadProgress === 'function')
              setAssetsUploadProgress(pct);
          },
        ),
      );
    const cleanTags = (tags || [])
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    cleanTags.forEach((label) =>
      requests.push(submission.addTag(movieId, label)),
    );

    if (requests.length > 0) await Promise.all(requests);

    // ensure progress shown as complete briefly
    if (typeof setAssetsUploadProgress === 'function')
      setAssetsUploadProgress(100);

    setAssetsTagsSaved(true);
    setCurrentStep(5);
  });

  // aggregate loading dans l'état global `submitting`,
  // mais uniquement pour l'étape courante (pour éviter qu'une étape
  // précédente laisse le bouton de la nouvelle étape bloqué en mode "loading").
  useEffect(() => {
    setSubmitting(
      !!(
        (currentStep === 1 && filmmakerOp.loading) ||
        (currentStep === 2 && movieOp.loading) ||
        (currentStep === 3 && aiOp.loading) ||
        (currentStep === 4 && assetsOp.loading) ||
        (currentStep === 5 && collabOp.loading)
      ),
    );
  }, [
    filmmakerOp.loading,
    movieOp.loading,
    aiOp.loading,
    assetsOp.loading,
    collabOp.loading,
    currentStep,
    setSubmitting,
  ]);

  // propagate async errors to shared `error` state (only when an op reports an error)
  useEffect(() => {
    const opError =
      filmmakerOp.error ||
      movieOp.error ||
      aiOp.error ||
      collabOp.error ||
      assetsOp.error;
    if (opError) setError(opError.message || String(opError));
  }, [
    filmmakerOp.error,
    movieOp.error,
    aiOp.error,
    collabOp.error,
    assetsOp.error,
    setError,
  ]);

  // --- public handlers (validate synchronously, then delegate to useAsync.run) ---
  const handleSubmitFilmmaker = async (filmmakerLocal) => {
    setError(null);
    const validationError = validateFilmmaker(filmmakerLocal || filmmaker);
    if (validationError) return setError(validationError);

    try {
      await filmmakerOp.run(filmmakerLocal || filmmaker);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleSubmitMovie = async (movieLocal) => {
    if (!filmmakerId) return;
    setError(null);
    const validationError = validateMovie(movieLocal || movie);
    if (validationError) return setError(validationError);

    const localMovie = movieLocal || movie;

    const hasYouTube =
      localMovie.youtube_url && localMovie.youtube_url.trim().length > 0;
    if (!movieVideo && !hasYouTube) {
      return setError(t('error.movie.video.required'));
    }

    if (movieVideo) {
      if (!movieVideo.type || !movieVideo.type.startsWith('video/')) {
        return setError(t('error.movie.video.invalidType'));
      }
      const MAX_BYTES = 50 * 1024 * 1024; // 50 MB
      if (movieVideo.size > MAX_BYTES) {
        return setError(t('error.movie.video.tooLarge'));
      }
    }

    try {
      await movieOp.run(localMovie);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleSubmitAIDeclaration = async (aiLocal) => {
    if (!movieId) return;
    setError(null);
    const payload = aiLocal || aiDeclaration;
    const validationError = validateAiDeclaration(payload);
    if (validationError) return setError(validationError);

    try {
      await aiOp.run(payload);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleSubmitCollaborators = async () => {
    if (!movieId) return;
    setError(null);
    const validationError = validateCollaborators(collaborators);
    if (validationError) return setError(validationError);

    try {
      await collabOp.run();
    } catch (err) {
      setError(t('error.collaborators.saveFailed'));
    }
  };

  const handleSubmitAssetsTags = async () => {
    if (!movieId) return;
    setError(null);

    try {
      await assetsOp.run();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return {
    handleSubmitFilmmaker,
    handleSubmitMovie,
    handleSubmitAIDeclaration,
    handleSubmitCollaborators,
    handleSubmitAssetsTags,
  };
}
