import { create } from 'zustand';
import axios from 'axios';

const useBrgyStore = create((set) => ({
  barangays: [],
  isLoading: false,
  error: null,

  fetchBarangays: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(import.meta.env.VITE_PSGC_QC_BRGY);
      set({ barangays: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBrgyStore;