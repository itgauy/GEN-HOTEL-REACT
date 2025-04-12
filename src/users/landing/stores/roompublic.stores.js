import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useRoomStore = create(
  persist(
    (set) => ({
      rooms: [],
      loading: false,
      error: null,

      // Fetch rooms data
      fetchRooms: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT}`
          );
          
          // Ensure response structure matches expected format
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
    }),
    {
      name: "staysuite-room-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useRoomStore;