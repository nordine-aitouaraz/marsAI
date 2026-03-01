import api from '../services/api';

export default function useSubmission() {
  const createFilmmaker = async (payload) => {
    return await api.post('/filmmakers', payload);
  };

  const submitMovie = async (payload, videoFile) => {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    if (videoFile) formData.append('video', videoFile);
    return await api.postForm('/movies/submit', formData);
  };

  // version with progress callback (onProgress receives 0-100)
  const submitMovieWithProgress = async (payload, videoFile, onProgress) => {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    if (videoFile) formData.append('video', videoFile);
    return await api.postFormWithProgress(
      '/movies/submit',
      formData,
      onProgress,
    );
  };

  const saveAiDeclaration = async (movieId, data) => {
    return await api.put(`/movies/${movieId}/ai-declaration`, data);
  };

  const addCollaborator = async (movieId, collaborator) => {
    return await api.post(`/movies/${movieId}/collaborators`, collaborator);
  };

  const uploadAssets = async (movieId, stillFiles = [], subtitle = null) => {
    const formData = new FormData();
    stillFiles.forEach((f) => formData.append('stills', f));
    if (subtitle) formData.append('subtitle', subtitle);
    return await api.postForm(`/movies/${movieId}/assets`, formData);
  };

  const uploadAssetsWithProgress = async (
    movieId,
    stillFiles = [],
    subtitle = null,
    onProgress,
  ) => {
    const formData = new FormData();
    stillFiles.forEach((f) => formData.append('stills', f));
    if (subtitle) formData.append('subtitle', subtitle);
    return await api.postFormWithProgress(
      `/movies/${movieId}/assets`,
      formData,
      onProgress,
    );
  };

  const addTag = async (movieId, label) => {
    return await api.post(`/movies/${movieId}/tags`, { label });
  };

  return {
    createFilmmaker,
    submitMovie,
    submitMovieWithProgress,
    saveAiDeclaration,
    addCollaborator,
    uploadAssets,
    uploadAssetsWithProgress,
    addTag,
  };
}
