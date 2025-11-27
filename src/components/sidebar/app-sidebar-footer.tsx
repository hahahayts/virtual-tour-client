import { useAuth } from "@/contexts/authtContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui or similar
import axios from "axios";
import { API_BASE, JWT } from "@/constant";
import { toast } from "sonner";

export const AppSidebarFooter = () => {
  const { user } = useAuth(); // Assuming logout is available in context

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE}/auth/logout`,

        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Logged out successfully", {
        richColors: true,
      });

      window.location.reload();
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 text-white font-medium">
          {user?.first_name?.charAt(0)}
          {user?.last_name?.charAt(0)}
        </div>
        <div className="truncate">
          <p className="font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="icon"
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};
