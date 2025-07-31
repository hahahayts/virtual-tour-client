import {
  ArrowRight,
  Heart,
  Image,
  MapPin,
  Share2,
  Phone,
  Globe,
  Mail,
  Facebook,
} from "lucide-react";
import type { RestaurantType } from "@/lib/types";

interface Props {
  filteredRestaurants: RestaurantType[];
  toggleFavorite: (id: string) => void;
  favorites: Set<unknown>;
  getImageCount?: (restaurant: RestaurantType) => number;
}

export const GridListRestaurant = ({
  filteredRestaurants,
  toggleFavorite,
  favorites,
  getImageCount = () => 0,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRestaurants.map((restaurant, index) => (
        <div
          key={restaurant.id}
          className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {restaurant.imageUrl_1 ? (
              <img
                src={restaurant.imageUrl_1}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">
                    No image available
                  </span>
                </div>
              </div>
            )}

            {/* Image count badge */}
            {getImageCount(restaurant) > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                <Image className="w-3 h-3" />
                <span>{getImageCount(restaurant)}</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(restaurant.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
                  favorites.has(restaurant.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(restaurant.id) ? "fill-current" : ""
                  }`}
                />
              </button>
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {restaurant.name}
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-5">
              {restaurant.description}
            </p>

            {/* Meta Info */}
            <div className="space-y-2 mb-4">
              {restaurant.address && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.website && (
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {restaurant.facebook && (
                <a
                  href={restaurant.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {restaurant.email && (
                <a
                  href={`mailto:${restaurant.email}`}
                  className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center justify-center space-x-2">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
