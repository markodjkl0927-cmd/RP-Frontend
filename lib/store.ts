import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RpRole = 'RP_MEMBER' | 'RP_ADMIN';

export interface RpUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  accountNumber?: string;
  role: RpRole;
}

interface AuthState {
  user: RpUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: RpUser, token: string) => void;
  updateUser: (patch: Partial<RpUser>) => void;
  clearAuth: () => void;
}

export const useRpAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('rp-token', token);
          document.cookie = `rp-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }
        set({ user, token, isAuthenticated: true });
      },
      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : state.user,
        })),
      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('rp-token');
          document.cookie = 'rp-token=; path=/; max-age=0';
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'rp-auth-storage', partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: !!s.token }) }
  )
);
