import {
  BarChart3,
  Car,
  Clock,
  Hotel,
  Info,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Settings,
  Ship,
  Users,
  Utensils,
} from "lucide-react";

export interface ItemType {
  title: string;
  url: string;
  icon:
    | typeof BarChart3
    | typeof Car
    | typeof Hotel
    | typeof LayoutDashboard
    | typeof MapPin
    | typeof Settings
    | typeof Ship
    | typeof Users
    | typeof Utensils;
  badge: null;
}

export const mainItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Destinations",
    url: "destinations",
    icon: MapPin,
    badge: null,
  },
  {
    title: "Accommodations",
    url: "accommodations",
    icon: Hotel,
    badge: null,
  },
  {
    title: "Restaurants",
    url: "restaurants",
    icon: Utensils,
    badge: null,
  },
  {
    title: "Cultural and Heritage",
    url: "history",
    icon: Clock,
    badge: null,
  },
  {
    title: "About Tubigon",
    url: "about/cme6b9g3k00007k388asgnndz",
    icon: Info,
    badge: null,
  },
  {
    title: "Comments",
    url: "comments",
    icon: MessageSquare,
    badge: null,
  },
];

type MainItemsType = typeof mainItems;

export const transportationItems = [
  {
    title: "Water Transport",
    url: "water-transportations",
    icon: Ship,
    badge: null,
  },
  {
    title: "Land Transport",
    url: "land-transportations",
    icon: Car,
    badge: null,
  },
];

type TransportationType = typeof transportationItems;

// export const managementItems = [
//   {
//     title: "User Management",
//     url: "users",
//     icon: Users,
//     badge: null,
//   },
//   {
//     title: "Comments",
//     url: "comments",
//     icon: MessageSquare,
//     badge: null,
//   },

//   {
//     title: "Settings",
//     url: "settings",
//     icon: Settings,
//     badge: null,
//   },
// ];

// type ManagementItems = typeof managementItems;

// export type ItemsType = MainItemsType | TransportationType | ManagementItems;
export type ItemsType = MainItemsType | TransportationType;
