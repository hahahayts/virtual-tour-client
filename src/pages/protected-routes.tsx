import type { ProtectedRoutesTypes } from "@/lib/types";
import { Navigate } from "react-router";
import { useAuth } from "@/contexts/authtContext";

const ProtectedRoutes = ({
  redirectPath = "/admin/auth/login",
  children,
}: Omit<ProtectedRoutesTypes, "user">) => {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600"></span>
      </div>
    );
  }

  // If no user after loading is complete, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
