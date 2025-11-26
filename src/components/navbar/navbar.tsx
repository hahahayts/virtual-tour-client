import {
  Bed,
  Building,
  ChevronDown,
  Compass,
  Info,
  MapPin,
  Menu,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { LinkNavigation } from "./links";
import { aboutItems, transportationTypes } from ".";
import { cn } from "@/lib/utils";

interface Props {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => path === route;

  const isTransportActive =
    path.includes("transportation") ||
    path.includes("land-transportations") ||
    path.includes("water-transportations");

  const isAboutActive =
    path.includes("about-tubigon") ||
    path.includes("mission-vision") ||
    path.includes("cultural-heritage");

  return (
    <nav className="relative z-20 flex items-center justify-between p-4 md:p-6 lg:px-12">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-br from-blue-400/30 to-teal-500/30 backdrop-blur-md border border-white/30 rounded-full p-2 shadow-lg">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
        </div>
        <Link
          to={"/"}
          className="text-lg md:text-2xl font-bold text-white drop-shadow-sm"
        >
          Tara na sa <span className="text-yellow-300">TUBIGON</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/destinations"
          className={cn(
            "flex items-center space-x-2 transition-all duration-300 hover:scale-105 group",
            isActive("/destinations")
              ? "text-yellow-300"
              : "text-white/90 hover:text-yellow-300"
          )}
        >
          <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Destinations</span>
        </Link>

        <Link
          to="/accommodations"
          className={cn(
            "flex items-center space-x-2 transition-all duration-300 hover:scale-105 group",
            isActive("/accommodations")
              ? "text-yellow-300"
              : "text-white/90 hover:text-yellow-300"
          )}
        >
          <Building className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Accommodation</span>
        </Link>

        <Link
          to="/restaurants"
          className={cn(
            "flex items-center space-x-2 transition-all duration-300 hover:scale-105 group",
            isActive("/restaurants")
              ? "text-yellow-300"
              : "text-white/90 hover:text-yellow-300"
          )}
        >
          <UtensilsCrossed className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Dine</span>
        </Link>

        {/* Transportations Dropdown */}
        <div className="relative group cursor-pointer">
          <span
            className={cn(
              "flex items-center space-x-2 transition-all duration-300 hover:scale-105",
              isTransportActive
                ? "text-yellow-300"
                : "text-white/90 hover:text-yellow-300"
            )}
          >
            <Bed className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Transportations</span>
            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
          </span>
          <LinkNavigation links={transportationTypes} />
        </div>

        {/* About Dropdown */}
        <div className="relative group cursor-pointer">
          <span
            className={cn(
              "flex items-center space-x-2 transition-all duration-300 hover:scale-105",
              isAboutActive
                ? "text-yellow-300"
                : "text-white/90 hover:text-yellow-300"
            )}
          >
            <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>About</span>
            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
          </span>
          <LinkNavigation links={aboutItems} />
        </div>
      </div>

      {/* Mobile menu button (optional) */}
      {/* Uncomment if needed */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </nav>
  );
};
