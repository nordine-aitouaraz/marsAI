// Pure, reusable validators — return an i18n key (string) on error or null when valid.
// These functions are intentionally free of React/i18n so they can be reused/tested easily.

const EMAIL_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_SIMPLE = /^[0-9+().\s-]{6,20}$/;

export function validateFilmmaker(f) {
  if (!f) return null;
  if (
    !f.first_name ||
    !f.first_name.trim() ||
    !f.last_name ||
    !f.last_name.trim()
  ) {
    return 'error.filmmaker.namePair.required';
  }
  if (!f.birth_date) return 'error.filmmaker.birthDate.required';
  if (!f.email || !EMAIL_SIMPLE.test(f.email))
    return 'error.filmmaker.email.invalid';
  if (f.mobile && f.mobile.trim().length > 0 && !MOBILE_SIMPLE.test(f.mobile)) {
    return 'error.filmmaker.mobile.invalid';
  }
  if (f.city && f.city.length > 80) return 'error.filmmaker.city.tooLong';
  if (f.country && f.country.length > 80)
    return 'error.filmmaker.country.tooLong';
  return null;
}

// Field-level validator helpers for forms (return i18n key or null)
export function validateFilmmakerField(field, v) {
  const val = typeof v === 'string' ? v.trim() : v;
  switch (field) {
    case 'first_name':
      if (!val) return 'error.filmmaker.firstName.required';
      if (val.length < 2) return 'error.filmmaker.firstName.min';
      return null;
    case 'last_name':
      if (!val) return 'error.filmmaker.lastName.required';
      if (val.length < 2) return 'error.filmmaker.lastName.min';
      return null;
    case 'email':
      if (!val) return 'error.filmmaker.email.required';
      if (!EMAIL_SIMPLE.test(val)) return 'error.filmmaker.email.invalid';
      return null;
    case 'mobile':
      if (!val) return null; // mobile optional
      if (val.replace(/\D/g, '').length < 6)
        return 'error.filmmaker.mobile.minDigits';
      return null;
    default:
      return null;
  }
}

export function validateMovie(m) {
  if (!m) return null;
  if (!m.original_title || !m.original_title.trim())
    return 'error.movie.originalTitle.required';
  if (!m.english_title || !m.english_title.trim())
    return 'error.movie.englishTitle.required';

  if (m.youtube_url && m.youtube_url.length > 0) {
    try {
      // basic URL check
      // eslint-disable-next-line no-new
      new URL(m.youtube_url);
    } catch (err) {
      return 'error.movie.youtube.invalid';
    }
  }
  return null;
}

export function validateAiDeclaration(d) {
  if (!d) return null;
  if (!d.artwork_type) return 'error.ai.artworkType.required';
  if (!d.methodology || d.methodology.trim().length < 30)
    return 'error.ai.methodology.min';
  return null;
}

export function validateCollaborators(list) {
  if (!Array.isArray(list)) return null;
  for (const collab of list) {
    const hasAnyField =
      (collab.first_name && collab.first_name.trim()) ||
      (collab.last_name && collab.last_name.trim()) ||
      (collab.role && collab.role.trim()) ||
      (collab.email && collab.email.trim());
    if (!hasAnyField) continue;

    if (
      !collab.first_name ||
      !collab.first_name.trim() ||
      !collab.last_name ||
      !collab.last_name.trim()
    ) {
      return 'error.collaborators.name.required';
    }
    if (!collab.role || !collab.role.trim())
      return 'error.collaborators.role.required';
    if (
      collab.email &&
      collab.email.trim().length > 0 &&
      !EMAIL_SIMPLE.test(collab.email)
    ) {
      return 'error.collaborators.email.invalid';
    }
  }
  return null;
}
