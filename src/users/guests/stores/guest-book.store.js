import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'

const useGuestBookStore = create(
  persist(
    (set, get) => ({
      guestBook: null,
      loading: false,
      error: null,

      fetchGuestBook: async (id) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_GUEST_BOOKING}/${id}`)
          set({ guestBook: response.data.data, loading: false })
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },

      createGuestBook: async (data) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.post(import.meta.env.VITE_APP_GUEST_BOOKING, data)
          set({ guestBook: response.data.data, loading: false })
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      }
    })
  )
)

export default useGuestBookStore