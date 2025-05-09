import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

// Utility: Set cookie with expiration in minutes
function setCookie(name, value, minutes) {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

// Utility: Delete cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const useGuestSignup = create(
  persist(
    (set, get) => ({
      email: "",
      accessToken: "",
      alert: {
        isOpen: false,
        message: "",
        type: "success", // 'success' or 'error'
      },
      setEmail: (email) => set({ email }),

      // Action to set alert state
      setAlert: (alert) => set({ alert }),

      // Clear alert
      clearAlert: () => set({ alert: { isOpen: false, message: "", type: "success" } }),

      // ✅ Step 1: Trigger backend to generate a new OTP (POST)
      verifyEmail: async (email) => {
        try {
          // ✅ Step 1: Request backend to send a new OTP
          await axios.post(import.meta.env.VITE_APP_OTP_VERIFY, { email });

          // ✅ Step 2: Save email in Zustand state
          set({ email });

          // ✅ Step 3: Retrieve the latest OTP record to get access_token
          const getResponse = await axios.get(import.meta.env.VITE_APP_OTP_VERIFY);
          const data = getResponse?.data;

          if (!Array.isArray(data) || data.length === 0) {
            set({
              alert: {
                isOpen: true,
                message: "No OTP records found.",
                type: "error",
              },
            });
            return { success: false, message: "No OTP records found." };
          }

          const latest = data[data.length - 1];

          // ✅ Step 4: Save access_token as a cookie (expires in 45 minutes)
          const token = latest.access_token;
          if (token) {
            const expiresAt = Date.now() + 45 * 60 * 1000;
            const cookieExpiry = new Date(expiresAt).toUTCString();

            document.cookie = `hotel-guest-registration=${token}; expires=${cookieExpiry}; path=/; SameSite=Strict`;
            sessionStorage.setItem("temporary_access", JSON.stringify({ token, expiresAt }));

            set({ accessToken: token });
          }

          set({
            alert: {
              isOpen: true,
              message: "OTP sent successfully to your email.",
              type: "success",
            },
          });
          return { success: true, message: "OTP sent and access token cookie issued." };
        } catch (error) {
          console.error("OTP Request Failed:", error);
          set({
            alert: {
              isOpen: true,
              message: error.message || "Failed to send OTP. Please try again.",
              type: "error",
            },
          });
          return { success: false, message: error.message };
        }
      },

      // ✅ Step 2: Validate OTP and Expiration (GET)
      verifyOTP: async (otp) => {
        const email = get().email;
        if (!email) {
          set({
            alert: {
              isOpen: true,
              message: "Email is not set.",
              type: "error",
            },
          });
          return { success: false, message: "Email is not set." };
        }

        try {
          const getResponse = await axios.get(import.meta.env.VITE_APP_OTP_VERIFY);
          const data = getResponse?.data;

          if (!Array.isArray(data) || data.length === 0) {
            set({
              alert: {
                isOpen: true,
                message: "No OTP records found.",
                type: "error",
              },
            });
            return { success: false, message: "No OTP records found." };
          }

          const latest = data[data.length - 1];

          if (latest.email !== email) {
            set({
              alert: {
                isOpen: true,
                message: "Email mismatch in latest OTP record.",
                type: "error",
              },
            });
            return { success: false, message: "Email mismatch in latest OTP record." };
          }

          if (latest.otp !== otp) {
            set({
              alert: {
                isOpen: true,
                message: "Invalid OTP. Please try again.",
                type: "error",
              },
            });
            return { success: false, message: "OTP does not match." };
          }

          const now = new Date();
          const expiresAt = new Date(latest.expiration);
          if (expiresAt < now) {
            set({
              alert: {
                isOpen: true,
                message: "OTP has expired. Please request a new one.",
                type: "error",
              },
            });
            return { success: false, message: "OTP has expired." };
          }

          set({
            alert: {
              isOpen: true,
              message: "OTP verified successfully!",
              type: "success",
            },
          });
          return {
            success: true,
            message: "OTP verified successfully.",
          };
        } catch (error) {
          console.error("OTP Validation Failed:", error);
          set({
            alert: {
              isOpen: true,
              message: error.message || "Failed to verify OTP. Please try again.",
              type: "error",
            },
          });
          return { success: false, message: error.message };
        }
      },

      // ✅ Guest Registration
      register_account: async ({ firstName, lastName, username, guest_password }) => {
        try {
          const rawData = localStorage.getItem("guest-signup-storage");

          let email_address = "";
          if (rawData) {
            try {
              const parsed = JSON.parse(rawData);
              email_address = parsed?.state?.email || "";
            } catch (err) {
              console.error("Failed to parse guest-signup-storage:", err);
            }
          }

          const payload = {
            email_address,
            guest_name: { firstName, lastName },
            username,
            guest_password,
          };

          const response = await axios.post(
            import.meta.env.VITE_APP_REGISTRATION,
            payload
          );

          // Clean up
          localStorage.removeItem("guest-signup-storage");
          sessionStorage.removeItem("temporary_access");
          deleteCookie("hotel-guest-registration");
          set({ email: "", accessToken: "" });

          set({
            alert: {
              isOpen: true,
              message: "Registration successful!",
              type: "success",
            },
          });
          return { success: true, data: response.data };
        } catch (error) {
          console.error("Registration failed:", error);
          set({
            alert: {
              isOpen: true,
              message: error.message || "Registration failed. Please try again.",
              type: "error",
            },
          });
          return { success: false, message: error.message };
        }
      },
    }),
    {
      name: "guest-signup-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        email: state.email,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useGuestSignup;