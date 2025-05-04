import { create } from 'zustand';
import axios from 'axios';

const PAYPAL_AUTH_URL = import.meta.env.VITE_APP_PAYPAL_LOGIN;

//

const usePaypalOAuthStore = create((set, get) => ({
  refreshToken: localStorage.getItem('paypal-auth') || null,
  authData: null,
  error: null,
  isLoading: false,

  // POST: Send login data to /paypal-auth endpoint
  requestPaypalAuth: async (authPayload) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${PAYPAL_AUTH_URL}/paypal-auth`, authPayload, {
        withCredentials: true, // for cookies
      });

      const { refreshToken } = response.data;

      // Save to localStorage
      localStorage.setItem('paypal-auth', refreshToken);

      // Save cookie manually if needed (note: secure & HttpOnly cookies must be set from server)
      document.cookie = `paypal-integration=true; path=/; max-age=${60 * 60 * 24 * 365}`;

      set({ refreshToken, authData: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data || err.message, isLoading: false });
    }
  },

  // GET: Fetch current PayPal user session/auth data
  fetchPaypalAuthData: async () => {
    set({ isLoading: true, error: null });

    try {
      const authStorage = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      const userId = authStorage?._id;

      if (!userId) {
        throw new Error('User ID not found in local storage.');
      }

      const response = await axios.get(`${PAYPAL_AUTH_URL}/${userId}`, {
        withCredentials: true,
      });

      set({ authData: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data || err.message, isLoading: false });
    }
  },

  // Clear state
  clearPaypalAuth: () => {
    localStorage.removeItem('paypal-auth');
    document.cookie = 'paypal-integration=; path=/; max-age=0';

    set({ refreshToken: null, authData: null, error: null });
  }
}));

export default usePaypalOAuthStore;