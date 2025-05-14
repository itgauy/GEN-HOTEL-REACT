import { create } from 'zustand';
import axios from 'axios';

// Helper function to get processed_by_id from localStorage
const getProcessedById = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      console.log('Parsed auth-storage:', parsed); // Debug: Log parsed auth-storage
      return parsed.state?.user?._id || null;
    }
    console.log('auth-storage not found in localStorage'); // Debug: Log missing auth-storage
    return null;
  } catch (err) {
    console.error('Error parsing auth-storage:', err);
    return null;
  }
};

const useRoomImageStore = create((set) => ({
  uploadedImages: [],
  isUploading: false,
  error: null,

  uploadImages: async (files, processedById, onProgress) => {
    set({ isUploading: true, error: null });

    // Fetch processed_by_id from localStorage for query parameter
    const queryProcessedById = getProcessedById();
    console.log('Query processedById:', queryProcessedById); // Debug: Log query processedById

    if (!queryProcessedById) {
      const errorMsg = 'Error: User ID not found in auth-storage for query';
      console.log(errorMsg); // Debug: Log missing query processedById
      set({ error: errorMsg, isUploading: false });
      throw new Error(errorMsg);
    }

    const formData = new FormData();
    formData.append('processed_by_id', processedById); // Keep processedById from parameter in body

    files.forEach((file) => {
      formData.append('files[]', file);
    });

    try {
      const uploadUrl = `${import.meta.env.VITE_ADMIN_ROOM_UPLOAD}?processed_by_id=${encodeURIComponent(queryProcessedById)}`;
      console.log('Upload URL:', uploadUrl); // Debug: Log upload URL
      console.log('Files to upload:', files.map(f => f.name)); // Debug: Log file names

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`); // Debug: Log progress
            if (onProgress) {
              onProgress(percentCompleted, files);
            }
          }
        },
      });
      console.log('POST response:', response.data); // Debug: Log POST response

      // Fetch updated list of images
      const imagesResponse = await axios.get(import.meta.env.VITE_ADMIN_ROOM_UPLOAD);
      console.log('Fetched images:', imagesResponse.data); // Debug: Log fetched images

      // Extract _id values from GET response
      const newImageIds = imagesResponse.data.map(image => image._id);
      console.log('Upload successful, IDs:', newImageIds); // Debug: Log returned IDs

      // Store _id values in localStorage
      localStorage.setItem('lastUploadedImageIds', JSON.stringify(newImageIds));
      console.log('Stored in localStorage:', newImageIds); // Debug: Log stored IDs

      set({
        uploadedImages: imagesResponse.data,
        isUploading: false,
      });

      return newImageIds; // Return _id values
    } catch (error) {
      const errorMsg = error.message || 'Failed to upload images';
      console.error('Upload error:', error);
      set({
        error: errorMsg,
        isUploading: false,
      });
      throw error;
    }
  },

  fetchImages: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_ADMIN_ROOM_UPLOAD);
      console.log('Fetched images:', response.data); // Debug: Log fetched images
      set({ uploadedImages: response.data });
    } catch (error) {
      const errorMsg = error.message || 'Failed to fetch images';
      console.error('Fetch error:', error); // Debug: Log fetch error
      set({ error: errorMsg });
    }
  },
}));

export default useRoomImageStore;