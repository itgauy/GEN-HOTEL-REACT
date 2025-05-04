import { create } from 'zustand';
import axios from 'axios';

const useGuestBookStore = create((set, get) => ({
  guestBook: null,
  activityLogs: [], // Added dedicated state for activity logs
  loading: false,
  error: null,

  // Applicable for per user records (bookings)
  fetchGuestBookUser: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}/${id}`);
      set({ guestBook: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch guest book', loading: false });
    }
  },

  // Applicable for dynamic payment receipt
  fetchGuestBookReceipt: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}/book/${id}`);
      set({ guestBook: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch guest book', loading: false });
    }
  },

  // Applicable for per user activity logs
  fetchActivityLogs: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_ACTIVITY_LOGS}/${id}`);
      set({ activityLogs: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch activity logs', loading: false });
    }
  },

  // GET the data
  fetchGuestBook: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}`);
      set({ guestBook: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch guest book', loading: false });
    }
  },

  createGuestBook: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(import.meta.env.VITE_APP_GUEST_BOOKING, data);
      set({ guestBook: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create guest book', loading: false });
    }
  }
}));

export default useGuestBookStore;