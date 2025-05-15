// forums.store.js
import { create } from "zustand";
import axios from "axios";

// Base URL from environment variable
const BASE_URL = import.meta.env.VITE_APP_HOTEL_FORUM;

export const useForumStore = create((set) => ({
  forums: [],
  selectedForum: null,
  isLoading: false,
  error: null,

  // Fetch all forums
  fetchAllForums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(BASE_URL);
      set({ forums: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch single forum by ID
  fetchForumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      set({ selectedForum: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Post user comment
  postUserComment: async (commentPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/user-comment`, commentPayload);
      return response.data; // optionally return the response for success handling
    } catch (error) {
      set({ error: error.message });
      throw error; // optionally rethrow for UI handling
    } finally {
      set({ isLoading: false });
    }
  },
}));