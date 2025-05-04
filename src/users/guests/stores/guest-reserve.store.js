import { create } from 'zustand';
import axios from 'axios';

const useGuestReserveStore = create((set, get) => ({
  reservations: [],
  loading: false,
  error: null,

  // GET all reservations
  fetchReservationsId: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_RESERVE_QUEUE}/${id}`);
      set({ 
        reservations: response.data.data, 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch reservation', 
        loading: false 
      });
    }
  },

  // Revalidate reservations
  revalidateReservations: async (userId) => {
    set({ loading: true, error: null });
    if (userId) {
      await get().fetchReservationsId(userId);
    } else {
      set({ 
        error: 'No user ID provided for revalidation', 
        loading: false 
      });
    }
  },

  // POST new reservation
  createReservation: async (reservationData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_GUEST_RESERVE_QUEUE,
        reservationData
      );
      set((state) => ({
        reservations: [...state.reservations, response.data.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create reservation', 
        loading: false 
      });
      throw error;
    }
  },

  // PUT update reservation by ID
  updateReservation: async (id, reservationData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_GUEST_RESERVE_QUEUE}/${id}`,
        reservationData
      );
      set((state) => ({
        reservations: state.reservations.map((reservation) =>
          reservation._id === id ? response.data.data : reservation
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update reservation', 
        loading: false 
      });
      throw error;
    }
  },

  // DELETE reservation by ID
  deleteReservation: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${import.meta.env.VITE_APP_GUEST_RESERVE_QUEUE}/${id}`);
      set((state) => ({
        reservations: state.reservations.filter((reservation) => reservation._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete reservation', 
        loading: false 
      });
      throw error;
    }
  }
}));

export default useGuestReserveStore;