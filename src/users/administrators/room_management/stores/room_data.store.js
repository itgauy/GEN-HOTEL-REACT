import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

const useRoomDataStore = create(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      roomData: null,

      addRoomData: async (formData) => {
        set({ loading: true, error: null });

        try {
          console.log('Received formData:', JSON.stringify(formData, null, 2));

          if (!formData || typeof formData !== 'object') {
            throw new Error('Invalid formData: formData is missing or not an object');
          }

          const requiredFields = [
            'hotel_type',
            'room_status',
            'slot_availability',
            'location',
            'room_details',
            'action',
            'comments',
            'processed_by_id',
          ];
          const missingFields = requiredFields.filter((field) => !formData[field]);
          if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
          }

          if (!formData.location || typeof formData.location !== 'object') {
            throw new Error('Invalid location: location is missing or not an object');
          } else if (!Array.isArray(formData.room_details) || formData.room_details.length === 0) {
            throw new Error('Invalid room_details: room_details is not a non-empty array');
          } else if (!formData.processed_by_id) {
            throw new Error('Invalid processed_by_id: processed_by_id is missing');
          }

          const apiUrl = import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT;
          if (!apiUrl) {
            throw new Error('VITE_STAYSUITE_ROOM_MANAGEMENT environment variable is not defined');
          }

          console.log('Sending payload to API:', JSON.stringify(formData, null, 2));

          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // After successful POST, fetch fresh data to update roomData and persist it
          await get().fetchRoomData();

          set({ loading: false });
          console.log('Room data posted successfully:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error posting room data:', error);
          console.error('Error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          set({
            loading: false,
            error: error.response?.data?.message || error.message || 'Failed to post room data',
          });
          throw error;
        }
      },

      fetchRoomData: async () => {
        set({ loading: true, error: null });

        try {
          const apiUrl = import.meta.env.VITE_STAYSUITE_ROOM_MANAGEMENT;
          if (!apiUrl) {
            throw new Error('VITE_STAYSUITE_ROOM_MANAGEMENT environment variable is not defined');
          }

          const response = await axios.get(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Ensure response.data.rooms exists and is an array
          if (!response.data.rooms || !Array.isArray(response.data.rooms)) {
            throw new Error('Invalid response: rooms is missing or not an array');
          }

          set({ loading: false, roomData: response.data.rooms });
          console.log('Room data fetched successfully:', response.data.rooms);
          return response.data.rooms;
        } catch (error) {
          console.error('Error fetching room data:', error);
          console.error('Error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
          set({
            loading: false,
            error: error.response?.data?.message || error.message || 'Failed to fetch room data',
          });
          throw error;
        }
      },
    }),
    {
      name: 'room-data-admin',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ roomData: state.roomData }), // Persist only roomData
    }
  )
);

export default useRoomDataStore;