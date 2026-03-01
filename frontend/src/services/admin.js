import api from './api';

export async function checkAuth() {
  try {
    await api.get('/admins');
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAdmins() {
  return await api.get('/admins');
}

export async function createAdmin(payload) {
  return await api.post('/admins/auth/signup', payload);
}

export async function getFilms(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return await api.get(`/admin/films${qs ? `?${qs}` : ''}`);
}

export async function getGreenFlagFavorites() {
  return await api.get('/admin/films/green-flags');
}

export async function updateFilmStatus(id, status) {
  return await api.patch(`/admin/films/${id}/status`, { status });
}

export async function deleteFilm(id) {
  return await api.del(`/admin/films/${id}`);
}

export async function getFilmmakers() {
  return await api.get('/filmmakers');
}

// Jury
export async function getJury() {
  return await api.get('/jury');
}
export async function createJuryMember(payload) {
  return await api.post('/jury', payload);
}
export async function deleteJuryMember(id) {
  return await api.del(`/jury/${id}`);
}

// Partners
export async function getPartners() {
  return await api.get('/partners');
}
export async function createPartner(payload) {
  return await api.post('/partners', payload);
}
export async function deletePartner(id) {
  return await api.del(`/partners/${id}`);
}

// Newsletters
export async function getNewsletterSubscribers() {
  return await api.get('/newsletters/subscribers');
}
export async function sendNewsletter(payload) {
  return await api.post('/newsletters/send', payload);
}

// expose a default object for easy imports
export default {
  checkAuth,
  getAdmins,
  createAdmin,
  getFilms,
  getGreenFlagFavorites,
  updateFilmStatus,
  deleteFilm,
  getFilmmakers,
  getJury,
  createJuryMember,
  deleteJuryMember,
  getPartners,
  createPartner,
  deletePartner,
  getNewsletterSubscribers,
  sendNewsletter,
};
