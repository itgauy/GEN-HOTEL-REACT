import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import useLoginAuth from "@/users/credentials/stores/useLoginAuth";

// Utility: Get cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Utility: Delete cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// 🔁 Centralized Role Routing Logic
const handleRoleSelection = (roles = []) => {
  switch (true) {
    case roles.includes("Manager"):
      return "/auth/login/manager-check";

    case roles.includes("Guest User"):
      return "/user/onboard";

    case roles.includes("Staff") &&
      roles.includes("Knowledge / Article Managing"):
      return "/kms-admin";

    case roles.includes("Staff") &&
      roles.includes("Room Data Management"):
      return "/room-admin";

    case roles.includes("Staff") &&
      roles.includes("Booking Reservations Department"):
      return "/reservations-admin";

    case roles.includes("Staff") &&
      roles.includes("Booking Assistance Inquiries"):
      return "/assistance-admin";

    default:
      return null;
  }
};

export function RegisterAuth({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestAuthenticated, setIsGuestAuthenticated] = useState(false);

  useEffect(() => {
    const checkGuestToken = () => {
      // From Zustand-persisted store
      const localToken = JSON.parse(localStorage.getItem('guest-signup-storage'))?.state?.accessToken;
      const cookieToken = getCookie('hotel-guest-registration');
      const sessionToken = sessionStorage.getItem('temporary_access');

      // If either exists, consider authenticated
      if (localToken || cookieToken || sessionToken) {
        setIsGuestAuthenticated(true);
      }

      setIsLoading(false);
    };

    checkGuestToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
      </div>
    );
  }

  // This part is only applicable if the authentication does not have yet.
  if (!isGuestAuthenticated) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}

// ✅ Already existing auth wrappers
export function RequiredAuth({ children }) {
  const { isAuthenticated } = useLoginAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = getCookie("refresh_token");
      setIsLoading(false);
    };
    checkAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
      </div>
    );
  }

  if (!isAuthenticated && !getCookie("refresh_token")) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}

export function CheckAuth({ children }) {
  const { isAuthenticated, user } = useLoginAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
      </div>
    );
  }

  const refreshToken = getCookie("refresh_token");

  if (refreshToken && isAuthenticated) {
    const employeeRoles = Array.isArray(user?.employee_role)
      ? user.employee_role
      : user?.employee_role
        ? [user.employee_role]
        : [];

    const guestRoles = Array.isArray(user?.guest_role)
      ? user.guest_role
      : user?.guest_role
        ? [user.guest_role]
        : [];

    const allRoles = [...employeeRoles, ...guestRoles];

    const redirectPath = handleRoleSelection(allRoles);

    if (redirectPath && location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }
  }

  return children;
}