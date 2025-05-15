import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useLandingStore = create(
  persist(
    (set) => ({
      landingData: [],
      articles: [],
      loading: false,
      error: null,

      fetchLandingData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(import.meta.env.VITE_ADMIN_LANDING);
          console.log(response.data);
          // Ensure landingData is an array
          const data = Array.isArray(response.data) ? response.data : [response.data];
          set({ landingData: data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      postLandingData: async (newData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(import.meta.env.VITE_ADMIN_LANDING, newData);
          set((state) => ({
            landingData: [...state.landingData, response.data],
            loading: false,
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      putLandingData: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.put(`${import.meta.env.VITE_ADMIN_LANDING}/${id}`, updatedData);
          set((state) => ({
            landingData: state.landingData.map((item) =>
              item.id === id ? response.data : item
            ),
            loading: false,
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      fetchArticlesData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(import.meta.env.VITE_ADMIN_KMS_ARTICLE);
          console.log(response.data);
          // Ensure articles is an array
          const data = Array.isArray(response.data) ? response.data : [response.data];
          set({ articles: data, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      createArticles: async (newArticle) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(import.meta.env.VITE_ADMIN_KMS_ARTICLE, newArticle);
          console.log(response.data);
          set((state) => ({
            articles: [...state.articles, response.data],
            loading: false,
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      fetchArticlesById: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${import.meta.env.VITE_ADMIN_KMS_ARTICLE}/article/${id}`);
          console.log(response.data);
          // Store the single article in articles array (or handle as needed)
          set({ articles: [response.data], loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "landing-storage",
    }
  )
);

export default useLandingStore;