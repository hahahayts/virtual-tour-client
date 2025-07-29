import { ChevronDown, ChevronRight, GroupIcon, Shield } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { SidebarMenuItemWithBadge } from "./item-badge";
import type { ItemsType } from "@/components/sidebar";
import { useLocation } from "react-router";

interface Props {
  title: string;
  items: ItemsType;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  icon: typeof GroupIcon | typeof Shield;
}

export const CollapsibleGroup = ({
  title,
  items,
  isCollapsed,
  setIsCollapsed,
  icon: GroupIcon,
}: Props) => {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent/50 rounded-md px-2 py-1 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <GroupIcon className="h-4 w-4" />
          <span>{title}</span>
        </div>
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </SidebarGroupLabel>
      {!isCollapsed && (
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItemWithBadge
                key={item.title}
                item={item}
                pathname={pathname}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
};
