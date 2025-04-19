import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

// Utility: Cookie helpers
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

const API_BASE = import.meta.env.VITE_APP_LOGIN;

const useLoginAuth = create(
  persist(
    (set, get) => ({
      user: null,
      refreshToken: getCookie('refresh_token'),
      isAuthenticated: !!getCookie('refresh_token'),

      login: async (credentials) => {
        try {
          // Step 1: Authenticate
          await axios.post(`${API_BASE}/login`, credentials);
      
          // Step 2: Get all sessions
          const sessions = (await axios.get(`${API_BASE}/sessions`)).data;
      
          // Step 3: Determine the identifier used
          const identifierKey = credentials.email_address ? 'email_address' : 'username';
          const identifierValue = credentials[identifierKey];
      
          // Step 4: Find the correct session based on 'issued_by'
          const session = sessions.find(
            (s) => s.issued_by?.[identifierKey]?.toLowerCase() === identifierValue.toLowerCase()
          );
      
          if (session?.refresh_token && session?.issued_by) {
            const { refresh_token, issued_by } = session;
      
            // Save token in cookies
            setCookie('refresh_token', refresh_token, 7);
      
            // Normalize and persist to Zustand
            set({
              isAuthenticated: true,
              refreshToken: refresh_token,
              user: {
                ...issued_by,
                employee_role: Array.isArray(issued_by.employee_role)
                  ? issued_by.employee_role
                  : [issued_by.employee_role ?? ''],
              },
            });
          } else {
            throw new Error('No matching session found for this user.');
          }
        } catch (error) {
          console.error('Login failed:', error);
          set({ isAuthenticated: false, refreshToken: null, user: null });
          throw error;
        }
      },      

      logout: () => {
        deleteCookie('refresh_token');
        set({ isAuthenticated: false, refreshToken: null, user: null });
        localStorage.clear();
        sessionStorage.clear();
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLoginAuth;