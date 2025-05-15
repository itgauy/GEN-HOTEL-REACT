import { create } from 'zustand';
import axios from 'axios';

const useGuestBookStore = create((set, get) => ({
  guestBook: null,
  activityLogs: [],
  loading: false,
  alertLoading: false, // New state for loading dialog
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
    set({ loading: true, alertLoading: true, error: null }); // Enable loading dialog
    try {
      console.log('createGuestBook Payload:', JSON.stringify(data, null, 2));
      const response = await axios.post(import.meta.env.VITE_APP_GUEST_BOOKING, data);
      console.log('createGuestBook Response:', JSON.stringify(response.data, null, 2));
      
      // Add 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      set({ 
        guestBook: response.data.data, 
        loading: false, 
        alertLoading: false // Disable loading dialog
      });
      return response.data; // Return response for component to handle success
    } catch (error) {
      console.error('createGuestBook Error:', error.response?.data?.message || 'Failed to create guest book', error);
      // Add 2-second delay even on error
      await new Promise((resolve) => setTimeout(resolve, 2000));
      set({ 
        error: error.response?.data?.message || 'Failed to create guest book', 
        loading: false, 
        alertLoading: false // Disable loading dialog
      });
      throw error; // Re-throw for component to handle error
    }
  },

  // Optional: Reset alertLoading if needed
  resetAlertLoading: () => set({ alertLoading: false })
}));

export default useGuestBookStore;