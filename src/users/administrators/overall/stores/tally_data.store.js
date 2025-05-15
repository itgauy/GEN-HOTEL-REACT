import { create } from 'zustand';
import axios from 'axios';

const useTallyDateStore = create((set) => ({
  registrationData: null,
  roomData: null,
  reservation: null, // Ensure this matches the state key
  loading: false,
  error: null,

  // GET request to fetch registration data
  fetchGuestUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_APP_REGISTRATION);
      set({ registrationData: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // GET request to fetch room management data
  fetchRoomData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT);
      set({ roomData: response.data.rooms, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchBookingReservation: async () => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching booking reservations...");
      const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}/all`);
      console.log("API Response:", response);
      console.log("Booking Data:", response.data.data);
      set({ reservation: response.data.data, loading: false }); // Changed bookReserve to reservation
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      set({ error: error.message, loading: false });
    }
  }
}));

export default useTallyDateStore;