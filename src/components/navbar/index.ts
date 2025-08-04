import {
  Bed,
  Building,
  Camera,
  Car,
  Compass,
  Home,
  Ship,
  TreePine,
  UtensilsCrossed,
} from "lucide-react";

export const heroTexts = [
  "Discover Paradise in Bohol",
  "Experience Natural Wonders",
  "Create Unforgettable Memories",
];

export const accommodationTypes = [
  { icon: Building, name: "Hotels", desc: "Luxury stays", url: "hotels" },
  { icon: Home, name: "Inns", desc: "Cozy comfort", url: "inns" },
  { icon: TreePine, name: "Resorts", desc: "Beach paradise", url: "resorts" },
  {
    icon: Bed,
    name: "Apartments",
    desc: "Home away from home",
    url: "apartments",
  },
];

export const transportationTypes = [
  {
    icon: Car,
    name: "Land",
    desc: "Travel by road using cars, buses, or trycycles.",
    url: "land-transportations",
  },
  {
    icon: Ship,
    name: "Water",
    desc: "Navigate the seas with boats or ferries.",
    url: "water-transportations",
  },
];
export const quickActions = [
  { icon: Compass, title: "Explore Places", desc: "Discover hidden gems" },
  { icon: Bed, title: "Book Stay", desc: "Find accommodations" },
  { icon: Camera, title: "Virtual Tours", desc: "360° experiences" },
  { icon: UtensilsCrossed, title: "Local Food", desc: "Taste Bohol" },
];

type AccommodationTypes = typeof accommodationTypes;
type TransportationTypes = typeof transportationTypes;

export type LinkNavigationType = AccommodationTypes | TransportationTypes;
