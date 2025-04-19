import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useLoginAuth from "@/users/credentials/stores/useLoginAuth";
import { LoaderCircle } from "lucide-react";

// Utility: Get cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// 🔁 Centralized Role Routing Logic
const handleRoleSelection = (roles = []) => {
  switch (true) {
    case roles.includes("Manager"):
      return "/auth/login/manager-check";

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
      return null; // Let them continue to the normal route
  }
};


export function RequiredAuth({ children }) {
  const { isAuthenticated } = useLoginAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = getCookie("refresh_token");
      setIsLoading(false); // Regardless, we just check once
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
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export function CheckAuth({ children }) {
  const { isAuthenticated, user } = useLoginAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Quick placeholder for any future checks
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
    console.log('User:', user);

    const roles = Array.isArray(user?.employee_role)
      ? user.employee_role
      : user?.employee_role
      ? [user.employee_role]
      : [];

    const redirectPath = handleRoleSelection(roles);

    console.log("Authenticated:", isAuthenticated);
    console.log("Roles:", roles);
    console.log("Redirect path:", redirectPath);

    if (redirectPath && location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }
  }

  return children;
}