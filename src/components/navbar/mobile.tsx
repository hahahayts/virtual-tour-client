import {
  ArrowRight,
  Bed,
  ChevronDown,
  Compass,
  MapPin,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { accommodationTypes } from ".";
import { Footer } from "./footer";

interface Props {
  toggleMenu: () => void;
  showAccommodationSubmenu: boolean;
  setShowAccommodationSubmenu: (showAccommodationSubmenu: boolean) => void;
}

export const MobileNav = ({
  setShowAccommodationSubmenu,
  showAccommodationSubmenu,
  toggleMenu,
}: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/95 to-teal-800/95 backdrop-blur-lg z-30 md:hidden">
      <div className="flex flex-col h-full">
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-md border border-white/30 rounded-full p-2">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Tara na sa <span className="text-yellow-300">TUBIGON</span>
            </span>
          </div>
          <button
            onClick={toggleMenu}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
          {/* Destinations */}
          <a
            href="#destinations"
            className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
            onClick={toggleMenu}
          >
            <div className="bg-gradient-to-br from-blue-400/40 to-cyan-500/40 rounded-xl p-3">
              <Compass className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">
                Destinations
              </div>
              <div className="text-sm text-white/70">
                Explore amazing places
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Accommodations */}
          <div className="space-y-3">
            <button
              className="w-full flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
              onClick={() =>
                setShowAccommodationSubmenu(!showAccommodationSubmenu)
              }
            >
              <div className="bg-gradient-to-br from-green-400/40 to-emerald-500/40 rounded-xl p-3">
                <Bed className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-lg font-semibold text-white">
                  Accommodations
                </div>
                <div className="text-sm text-white/70">
                  Find your perfect stay
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/60 transition-transform ${
                  showAccommodationSubmenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accommodation Submenu */}
            {showAccommodationSubmenu && (
              <div className="ml-4 space-y-2 animate-in slide-in-from-top-5 duration-300">
                {accommodationTypes.map((type, index) => (
                  <a
                    key={index}
                    href={`#${type.name.toLowerCase()}`}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300 group/item"
                    onClick={toggleMenu}
                  >
                    <div className="bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-lg p-2">
                      <type.icon className="w-4 h-4 text-white group-hover/item:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {type.name}
                      </div>
                      <div className="text-xs text-white/60">{type.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 ml-auto group-hover/item:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Restaurants */}
          <a
            href="#restaurants"
            className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group"
            onClick={toggleMenu}
          >
            <div className="bg-gradient-to-br from-orange-400/40 to-red-500/40 rounded-xl p-3">
              <UtensilsCrossed className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">
                Restaurants
              </div>
              <div className="text-sm text-white/70">Taste local flavors</div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Footer */}
        <Footer />
      </div>
    </div>
  );
};
