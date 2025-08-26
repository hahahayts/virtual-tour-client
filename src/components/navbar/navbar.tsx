import {
  Bed,
  Building,
  ChevronDown,
  Compass,
  Globe,
  Info,
  MapPin,
  Menu,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { LinkNavigation } from "./links";
import { aboutItems, transportationTypes } from ".";

interface Props {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}
export const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
  return (
    <nav className="relative z-20 flex items-center justify-between p-4 md:p-6 lg:px-12">
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

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to={"/destinations"}
          className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 group"
        >
          <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Destinations</span>
        </Link>

        {/* Accommodations */}
        <Link
          to={"/accommodations"}
          className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 group"
        >
          <Building className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Accommodation</span>
        </Link>

        <Link
          to="restaurants"
          className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 group"
        >
          <UtensilsCrossed className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Dine</span>
        </Link>
        {/* Transportation */}
        <div className="relative group cursor-pointer ">
          <span className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105">
            <Bed className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Transportations</span>
            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
          </span>

          {/* Desktop accommodation submenu */}
          <LinkNavigation links={transportationTypes} />
        </div>
        {/* About */}
        <div className="relative group cursor-pointer ">
          <span className="flex items-center space-x-2 text-white/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105">
            <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>About</span>
            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
          </span>

          {/* Desktop accommodation submenu */}
          <LinkNavigation links={aboutItems} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white hover:from-blue-500/30 hover:to-teal-500/30 transition-all duration-300 shadow-lg">
          <Globe className="w-4 h-4" />
          <span>EN</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <button
          className="md:hidden bg-gradient-to-br from-blue-500/30 to-teal-500/30 backdrop-blur-md border border-white/30 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300"
          onClick={toggleMenu}
        >
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
