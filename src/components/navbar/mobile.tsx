import {
  ArrowRight,
  Bed,
  Car,
  ChevronDown,
  Compass,
  MapPin,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { aboutItems, transportationTypes } from ".";
import { Footer } from "./footer";
import { Link } from "react-router";

interface Props {
  toggleMenu: () => void;
  showAccommodationSubmenu: boolean;
  setShowAccommodationSubmenu: (showAccommodationSubmenu: boolean) => void;
  showTransportationSubmenu?: boolean;
  setShowTransportationSubmenu?: (showTransportationSubmenu: boolean) => void;
}

export const MobileNav = ({
  setShowAccommodationSubmenu,
  showAccommodationSubmenu,
  toggleMenu,
  showTransportationSubmenu = false,
  setShowTransportationSubmenu = () => {},
}: Props) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/95 to-teal-800/95 backdrop-blur-lg z-50 md:hidden animate-in fade-in duration-300">
      <div className="flex flex-col h-full">
        {/* Fixed Mobile Menu Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/20 animate-in slide-in-from-top duration-500 bg-gradient-to-r from-blue-900/90 to-teal-800/90 backdrop-blur-md">
          <div className="flex items-center space-x-3 animate-in slide-in-from-left duration-700">
            <div className="bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-md border border-white/30 rounded-full p-2 animate-in zoom-in duration-500 delay-300">
              <MapPin className="w-6 h-6 text-white animate-pulse" />
            </div>
            <Link to={"/"} className="text-xl font-bold text-white">
              Tara na sa{" "}
              <span className="text-yellow-300 animate-pulse">TUBIGON</span>
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all hover:rotate-90 animate-in slide-in-from-right duration-500"
          >
            <X className="w-6 h-6 text-white transition-transform" />
          </button>
        </div>

        {/* Scrollable Mobile Menu Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-6 py-6 space-y-6 min-h-full">
            {/* Destinations */}
            <Link
              to="/destinations"
              className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-in slide-in-from-left duration-700 delay-100"
              onClick={toggleMenu}
            >
              <div className="bg-gradient-to-br from-blue-400/40 to-cyan-500/40 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  Destinations
                </div>
                <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  Explore amazing places
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/60 ml-auto group-hover:translate-x-2 group-hover:text-cyan-300 transition-all duration-300" />
            </Link>

            {/* Accommodations */}
            <div className="animate-in slide-in-from-left duration-700 delay-200 mb-6">
              <Link
                to={"/accommodations"}
                className="w-full flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                onClick={toggleMenu}
              >
                <div className="bg-gradient-to-br from-green-400/40 to-emerald-500/40 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Bed className="w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors">
                    Accommodations
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    Find your perfect stay
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/60 ml-auto group-hover:translate-x-2 group-hover:text-cyan-300 transition-all duration-300" />
              </Link>
            </div>

            {/* Restaurants */}
            <Link
              to="/restaurants"
              className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all group hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-in slide-in-from-left duration-700 delay-300"
              onClick={toggleMenu}
            >
              <div className="bg-gradient-to-br from-orange-400/40 to-red-500/40 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                <UtensilsCrossed className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-white group-hover:text-orange-200 transition-colors">
                  Restaurants
                </div>
                <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  Taste local flavors
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/60 ml-auto group-hover:translate-x-2 group-hover:text-orange-300 transition-all duration-300" />
            </Link>

            {/* About Items Dropdown */}
            <div className="space-y-3 animate-in slide-in-from-left duration-700 delay-400">
              <button
                className="w-full flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                onClick={() =>
                  setShowAccommodationSubmenu(!showAccommodationSubmenu)
                }
              >
                <div className="bg-gradient-to-br from-purple-400/40 to-pink-500/40 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                    About Items
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    Learn more about us
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white/60 group-hover:text-purple-300 transition-all duration-300 ${
                    showAccommodationSubmenu ? "rotate-180 text-purple-300" : ""
                  }`}
                />
              </button>

              {/* About Items Submenu */}
              {showAccommodationSubmenu && (
                <div className="ml-4 space-y-2 animate-in slide-in-from-top-5 fade-in duration-500">
                  {aboutItems.map((type, index) => (
                    <Link
                      key={index}
                      to={`${type.url}`}
                      className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300 group/item hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 animate-in slide-in-from-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={toggleMenu}
                    >
                      <div className="bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-lg p-2 group-hover/item:scale-110 transition-transform duration-300">
                        <type.icon className="w-4 h-4 text-white group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white group-hover/item:text-purple-200 transition-colors">
                          {type.name}
                        </div>
                        <div className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors">
                          {type.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 ml-auto group-hover/item:translate-x-2 group-hover/item:text-purple-300 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Transportation Types Dropdown */}
            <div className="space-y-3 animate-in slide-in-from-left duration-700 delay-500">
              <button
                className="w-full flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                onClick={() =>
                  setShowTransportationSubmenu(!showTransportationSubmenu)
                }
              >
                <div className="bg-gradient-to-br from-green-400/40 to-emerald-500/40 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors">
                    Transportations
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    Get around easily
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white/60 group-hover:text-green-300 transition-all duration-300 ${
                    showTransportationSubmenu ? "rotate-180 text-green-300" : ""
                  }`}
                />
              </button>

              {/* Transportation Submenu */}
              {showTransportationSubmenu && (
                <div className="ml-4 space-y-2 animate-in slide-in-from-top-5 fade-in duration-500">
                  {transportationTypes.map((type, index) => (
                    <Link
                      key={index}
                      to={`${type.url}`}
                      className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:bg-white/15 transition-all duration-300 group/item hover:scale-105 hover:shadow-lg hover:shadow-green-500/10 animate-in slide-in-from-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={toggleMenu}
                    >
                      <div className="bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-lg p-2 group-hover/item:scale-110 transition-transform duration-300">
                        <type.icon className="w-4 h-4 text-white group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white group-hover/item:text-green-200 transition-colors">
                          {type.name}
                        </div>
                        <div className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors">
                          {type.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 ml-auto group-hover/item:translate-x-2 group-hover/item:text-green-300 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Spacer for better scrolling experience */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Fixed Mobile Menu Footer */}
        <div className="flex-shrink-0 border-t border-white/20 bg-gradient-to-r from-blue-900/90 to-teal-800/90 backdrop-blur-md animate-in slide-in-from-bottom duration-700 delay-400">
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};
