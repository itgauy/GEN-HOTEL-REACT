import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useArticleStore = create(
  persist(
    (set) => ({
      articles: [],
      article: null,
      loading: false,
      error: null,

      // Fetch all articles
      fetchArticles: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            import.meta.env.VITE_ADMIN_KMS_ARTICLE
          );
          set({ articles: response.data, loading: false });
        } catch (error) {
          set({
            error: error.message || "Failed to fetch articles",
            loading: false,
          });
        }
      },

      // Fetch single article by ID
      fetchArticleById: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_ADMIN_KMS_ARTICLE}/article/${id}`
          );
          set({ article: response.data, loading: false });
        } catch (error) {
          set({
            error: error.message || "Failed to fetch article",
            loading: false,
          });
        }
      },
    }),
    {
      name: "article-storage", // Persist storage name
    }
  )
);

export default useArticleStore;