import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Customer } from '@/src/types';

interface AuthState {
  customer: Customer | null;
  token:    string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth:    (customer: Customer, token: string) => void;
  clearAuth:  () => void;
  setCustomer:(customer: Customer) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer:        null,
      token:           null,
      isAuthenticated: false,

      setAuth: (customer, token) =>
        set({ customer, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ customer: null, token: null, isAuthenticated: false }),

      setCustomer: (customer) =>
        set({ customer }),
    }),
    {
      name: 'kk-auth', // localStorage key
      partialize: (state) => ({
        customer: state.customer,
        token:    state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
