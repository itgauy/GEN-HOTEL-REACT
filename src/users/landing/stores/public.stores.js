import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const usePublicStore = create(
  persist(
    (set) => ({
      landingData: null,
      isLoading: false,
      error: null,

      fetchLandingData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(
            import.meta.env.VITE_ADMIN_LANDING
          );
          set({ landingData: response.data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: "public-storage",
    }
  )
);

export default usePublicStore;