import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Outlet } from "react-router";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar (hidden on mobile, shown when toggled) */}
        <AppSidebar />

        {/* Main content area */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Header with mobile controls */}
          <header
            className={cn(
              "sticky top-0 z-10 flex h-16 items-center justify-between",
              "border-b bg-background px-4",
              "md:justify-end" // On desktop, align controls to right
            )}
          >
            <SidebarTrigger className="md:hidden" />
            <ThemeToggle />
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto scrollbar-none scrollbar-hide p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
