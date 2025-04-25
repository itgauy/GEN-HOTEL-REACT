import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useRoomStore = create(
  persist(
    (set) => ({
      rooms: [],
      selectedRoom: null, // Store single room data
      loading: false,
      error: null,

      // Fetch all rooms
      fetchRooms: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT}`
          );

          if (response.data && response.data.rooms) {
            set({ rooms: response.data.rooms, loading: false });
          } else {
            throw new Error("Invalid response format");
          }
        } catch (error) {
          console.error("Room Fetch Error:", error);
          set({ error: error.message, loading: false });
        }
      },

      // Fetch single room by ID
      fetchRoomById: async (id) => {
        set({ loading: true, error: null, selectedRoom: null });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT}/${id}`
          );

          if (response.data && response.data.rooms) {
            set({ selectedRoom: response.data.rooms, loading: false });
          } else {
            throw new Error("Invalid room data");
          }
        } catch (error) {
          console.error("Single Room Fetch Error:", error);
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "staysuite-room-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useRoomStore;