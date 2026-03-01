import { createContext, useContext } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const auth = useAdminAuth();
  return <AdminContext.Provider value={auth}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return ctx;
}
