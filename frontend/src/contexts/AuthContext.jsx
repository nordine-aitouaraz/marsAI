import React, { createContext, useContext, useEffect, useState } from 'react';
import adminService from '../services/admin';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    setChecking(true);
    try {
      const ok = await adminService.checkAuth();
      setIsAuthenticated(!!ok);
      return ok;
    } catch (err) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setChecking(false);
    }
  };

  const login = async (credentials) => {
    // credentials: { email, password }
    const data = await api.post('/admins/auth/login', credentials);
    // backend should set session cookie; re-check auth
    await checkAuth();
    return data;
  };

  const logout = async () => {
    // best-effort: call logout endpoint if present, then update state
    try {
      await api.post('/admins/auth/logout');
    } catch (err) {
      // ignore network errors — still clear client state
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checking, user, checkAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
