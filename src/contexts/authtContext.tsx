// auth-context.tsx
import { API_BASE } from "@/constant";
import type { AuthContextType, User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

// Create axios instance with interceptor
const authAxios = axios.create();

// Add response interceptor to handle auth errors globally
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Return null for auth errors instead of throwing
      return Promise.resolve({ data: null });
    }
    return Promise.reject(error);
  }
);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, refetch, error } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await authAxios.get(`${API_BASE}/auth/me`, {
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        // If there's an error, return null (user not authenticated)
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 mins
    retry: false, // Don't retry auth requests
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Always check auth on mount
  });

  console.log("Auth data:", data, "Loading:", isLoading, "Error:", error);

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isLoading,
        refetchUser: () => refetch(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
