import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, LogIn, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthSchema } from "../schema";
import type z from "zod";
import { ErrorMessage } from "@/components/form/err-message";
import { useAuth } from "@/contexts/authtContext";
import axios from "axios";
import { API_BASE, JWT } from "@/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const Form = () => {
  const { refetchUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "", // Fixed typo: was "passwrod"
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data: z.infer<typeof AuthSchema>) => {
    console.log("🚀 Login attempt started");

    try {
      await axios.post(`${API_BASE}/auth/login`, data, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        withCredentials: true,
      });

      toast.success("Logged in successfully", {
        richColors: true,
      });

      // Refetch user data after successful login
      // console.log("🔄 Refetching user data...");
      await refetchUser();
      // console.log("👤 User data after refetch:", userResult.data);

      // Navigate to admin root
      console.log("🧭 Navigating to /admin");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("❌ Login error:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        switch (status) {
          case 400:
          case 401:
            toast.error(message || "Invalid credentials", {
              richColors: true,
            });
            break;
          case 422:
            toast.error("Please check your input and try again", {
              richColors: true,
            });
            break;
          case 429:
            toast.error("Too many login attempts. Please try again later.", {
              richColors: true,
            });
            break;
          case 500:
          case 502:
          case 503:
            toast.error("Server error. Please try again later.", {
              richColors: true,
            });
            break;
          default:
            toast.error("Login failed. Please try again.", {
              richColors: true,
            });
        }
      } else {
        toast.error("Network error. Please check your connection.", {
          richColors: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Address
        </Label>
        <div className="relative">
          <Input
            {...register("email")} // Connected to react-hook-form
            id="email"
            type="email"
            placeholder="admin@municipality.gov"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Password
        </Label>
        <div className="relative">
          <Input
            {...register("password")} // Connected to react-hook-form
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="flex items-center justify-between text-sm">
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">Remember me</span>
        </div> */}
        {/* <Button
          type="button" // Prevent form submission
          variant="link"
          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          Forgot password?
        </Button> */}
      </div>

      <Button
        type="submit" // Make it a submit button
        disabled={isSubmitting} // Disable while submitting
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        {isSubmitting ? "Logging In..." : "Log In"}
      </Button>
    </form>
  );
};
