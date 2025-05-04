import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_APP_GUEST_USER_UPDATE

const useGuestUpdateStore = create(
  persist(
    (set, get) => ({
      isLoading: false,
      error: null,
      success: false,

      updateGuestUser: async (updateData) => {
        set({ isLoading: true, error: null, success: false })

        try {
          const stored = localStorage.getItem('auth-storage')
          if (!stored) throw new Error('No auth-storage found')

          const parsed = JSON.parse(stored)
          const userId = parsed?.state?.user?._id

          if (!userId) throw new Error('User ID not found in auth-storage')

          const endpoint = `${API_BASE}/${userId}`

          // Filter out only allowed fields
          const allowedFields = [
            'username',
            'firstName',
            'lastName',
            'email_address',
            'guest_password',
          ]
          const payload = Object.fromEntries(
            Object.entries(updateData).filter(([key]) =>
              allowedFields.includes(key)
            )
          )

          await axios.put(endpoint, payload)

          set({ isLoading: false, success: true })
        } catch (error) {
          console.error('Update failed:', error)
          set({ isLoading: false, error: error.message || 'Update failed' })
        }
      },

      resetStatus: () => set({ error: null, success: false }),
    }),
    // {
    //   name: 'guest-update-store',
    //   storage: createJSONStorage(() => localStorage),
    // }
  )
)

export default useGuestUpdateStore;