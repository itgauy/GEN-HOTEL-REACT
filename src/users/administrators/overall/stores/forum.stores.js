import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useHotelForumStore = create(
  persist(
    (set, get) => ({
      threads: [],
      selectedThread: null,
      loading: false,
      error: null,

      // GET: Fetch all forum threads
      fetchThreads: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            import.meta.env.VITE_APP_HOTEL_FORUM
          );
          set({ threads: response.data, loading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch threads",
            loading: false,
          });
        }
      },

      // GET: Fetch single thread by ID
      fetchThreadById: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_HOTEL_FORUM}/${id}`
          );
          set({ selectedThread: response.data, loading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch thread",
            loading: false,
          });
        }
      },

      // POST: Add main thread (staff admin only)
      addMainThread: async (threadData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_HOTEL_FORUM}/add-thread`,
            threadData
          );
          set((state) => ({
            threads: [...state.threads, response.data],
            loading: false,
          }));
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to add thread",
            loading: false,
          });
          throw error;
        }
      },

      // POST: Add user comment to existing thread
      addUserComment: async (threadId, commentData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_HOTEL_FORUM}/user-comment`,
            { threadId, ...commentData }
          );
          set((state) => ({
            selectedThread: state.selectedThread
              ? {
                  ...state.selectedThread,
                  comments: [
                    ...(state.selectedThread.comments || []),
                    response.data,
                  ],
                }
              : state.selectedThread,
            loading: false,
          }));
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to add comment",
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "hotel-forum-storage",
      partialize: (state) => ({
        threads: state.threads,
        selectedThread: state.selectedThread,
      }),
    }
  )
);

export default useHotelForumStore;