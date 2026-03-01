import { useTranslation } from 'react-i18next';
import {
  validateFilmmaker as vFilmmaker,
  validateMovie as vMovie,
  validateAiDeclaration as vAiDeclaration,
  validateCollaborators as vCollaborators,
} from '../utils/validation';

export default function useParticiperValidation() {
  const { t } = useTranslation();

  const validateFilmmaker = (f) => {
    const key = vFilmmaker(f);
    return key ? t(key) : null;
  };

  const validateMovie = (m) => {
    const key = vMovie(m);
    return key ? t(key) : null;
  };

  const validateAiDeclaration = (d) => {
    const key = vAiDeclaration(d);
    return key ? t(key) : null;
  };

  const validateCollaborators = (list) => {
    const key = vCollaborators(list);
    return key ? t(key) : null;
  };

  return {
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
  };
}
