import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type AuthUser, apiMe, apiLogout } from '../api';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('fm_token');
    if (stored) {
      apiMe(stored)
        .then((u) => { setToken(stored); setUser(u); })
        .catch(() => localStorage.removeItem('fm_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const setAuth = (t: string, u: AuthUser) => {
    localStorage.setItem('fm_token', t);
    setToken(t);
    setUser(u);
  };

  const logout = async () => {
    if (token) await apiLogout(token).catch(() => {});
    localStorage.removeItem('fm_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
