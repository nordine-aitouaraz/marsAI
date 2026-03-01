import { useContext } from 'react';
import { useAuthContext } from '../contexts';

export default function useAuth() {
  return useAuthContext();
}
