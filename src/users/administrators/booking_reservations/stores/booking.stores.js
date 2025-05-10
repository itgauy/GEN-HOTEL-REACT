import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

// Utility to normalize URL by removing duplicate slashes
const normalizeUrl = (baseUrl, path) => {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

const useBookingStore = create(
  persist(
    (set) => ({
      books: [],
      booking: null,
      loading: false,
      error: null,
      alert: { show: false, message: "", type: "success" },

      setAlert: (message, type = "success") => {
        set({ alert: { show: true, message, type } });
      },
      clearAlert: () => {
        set({ alert: { show: false, message: "", type: "success" } });
      },

      fetchBooksAll: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(import.meta.env.VITE_APP_GUEST_BOOKING);
          set({ books: response.data.data, loading: false });
          set({ alert: { show: true, message: "Successfully fetched all bookings!", type: "success" } });
        } catch (error) {
          set({ error: error.message, loading: false });
          set({ alert: { show: true, message: `Failed to fetch bookings: ${error.message}`, type: "error" } });
        }
      },

      fetchBookingById: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(normalizeUrl(import.meta.env.VITE_APP_GUEST_BOOKING, `book/${id}`));
          set({ booking: response.data.data, loading: false });
          set({ alert: { show: true, message: "Successfully fetched booking details!", type: "success" } });
        } catch (error) {
          set({ error: error.message, loading: false });
          set({ alert: { show: true, message: `Failed to fetch booking: ${error.message}`, type: "error" } });
        }
      },

      bookingUpdate: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.put(normalizeUrl(import.meta.env.VITE_APP_GUEST_BOOKING, `book/${id}`), updatedData);
          set({ booking: response.data.data, loading: false });
          set({ alert: { show: true, message: "Booking updated successfully!", type: "success" } });
        } catch (error) {
          set({ error: error.message, loading: false });
          set({ alert: { show: true, message: `Failed to update booking: ${error.message}`, type: "error" } });
        }
      },
    }),
    {
      name: "booking-storage",
    }
  )
);

export default useBookingStore;