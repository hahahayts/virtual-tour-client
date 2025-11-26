import type { ProtectedRoutesTypes } from "@/lib/types";
import { Navigate } from "react-router";
import { useAuth } from "@/contexts/authtContext";

const GuestProtectedRoutes = ({
  redirectPath = "/admin/dashboard",
  children,
}: Omit<ProtectedRoutesTypes, "user">) => {
  const { user } = useAuth();

  // Show loading spinner while checking authentication
  // If no user after loading is complete, redirect to login
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default GuestProtectedRoutes;
