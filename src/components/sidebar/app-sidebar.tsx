import { useState } from "react";
import { Car, Shield, Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "../ui/sidebar";
import { AppSidebarFooter } from "./app-sidebar-footer";
import {
  mainItems,
  managementItems,
  transportationItems,
} from "@/components/sidebar";
import { CollapsibleGroup } from "./collapsible";
import { SidebarMenuItemWithBadge } from "./item-badge";
import { useLocation } from "react-router";

export function AppSidebar() {
  const { pathname } = useLocation();
  const [isTransportCollapsed, setIsTransportCollapsed] = useState(false);
  const [isManagementCollapsed, setIsManagementCollapsed] = useState(false);

  console.log("pathname", pathname.split("/"));

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-sidebar-border scrollbar-none scrollbar-hide"
    >
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-4">
        <div className="flex items-center gap-3">
          <div className="bg-sidebar-primary rounded-lg p-2">
            <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Tourism Admin
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Management Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-semibold text-xs uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItemWithBadge
                  key={item.title}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Transportation Section */}
        <CollapsibleGroup
          title="Transportation"
          items={transportationItems}
          isCollapsed={isTransportCollapsed}
          setIsCollapsed={setIsTransportCollapsed}
          icon={Car}
        />

        {/* Management Section */}
        <CollapsibleGroup
          title="Management"
          items={managementItems}
          isCollapsed={isManagementCollapsed}
          setIsCollapsed={setIsManagementCollapsed}
          icon={Shield}
        />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
