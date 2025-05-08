import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      books: [],
      booking: null,
      loading: false,
      error: null,

      fetchBooksAll: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(import.meta.env.VITE_APP_GUEST_BOOKING);
          set({ books: response.data.data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      fetchBookingById: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}/book/${id}`);
          set({ booking: response.data.data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "booking-storage",
    }
  )
);

export default useBookingStore;