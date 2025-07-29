import { Link } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import type { ItemType } from "@/components/sidebar";

interface Props {
  item: ItemType;
  pathname: string;
}

export const SidebarMenuItemWithBadge = ({ item, pathname }: Props) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      size="lg"
      asChild
      className={`
          group relative overflow-hidden transition-all duration-200 
          hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
          ${
            item.url.includes(pathname.split("/")[2])
              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
              : ""
          }
        `}
    >
      <Link
        to={`${item.url}`}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-5 w-5 transition-colors" />
          <span className="font-medium">{item.title}</span>
        </div>
        {item.badge && (
          <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {item.badge}
          </span>
        )}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);
