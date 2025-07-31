import type { RestaurantType } from "@/lib/types";
import {
  Facebook,
  Globe,
  Heart,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

interface Props {
  restaurant: RestaurantType;
  isListView?: boolean;
  getImageCount: (restaurant: RestaurantType) => number;
  toggleFavorite: (id: string) => void;
  favorites: Set<unknown>;
}

export const RestaurantCard = ({
  restaurant,
  isListView = false,
  getImageCount,
  toggleFavorite,
  favorites,
}: Props) => (
  <div
    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
      isListView ? "flex" : ""
    }`}
  >
    {/* Image */}
    <div className={`relative ${isListView ? "w-1/3 h-48" : "w-full h-48"}`}>
      {restaurant.imageUrl_1 ? (
        <img
          src={restaurant.imageUrl_1}
          alt={restaurant?.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-gray-400" />
        </div>
      )}
      {getImageCount(restaurant) > 1 && (
        <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          <span>{getImageCount(restaurant)}</span>
        </div>
      )}
      <button
        onClick={() => toggleFavorite(restaurant.id)}
        className={`absolute top-3 right-3 p-2 rounded-full ${
          favorites.has(restaurant.id)
            ? "bg-red-500 text-white"
            : "bg-white/80 text-gray-700"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${
            favorites.has(restaurant.id) ? "fill-current" : ""
          }`}
        />
      </button>
    </div>

    {/* Content */}
    <div className={`p-4 ${isListView ? "w-2/3" : ""}`}>
      <h3 className="text-lg font-bold mb-2">{restaurant.name}</h3>

      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {restaurant.description}
      </p>

      <div className="space-y-1 text-sm text-gray-500 mb-3">
        {restaurant.address && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.address}</span>
          </div>
        )}
        {restaurant.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{restaurant.phone}</span>
          </div>
        )}
      </div>

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

      <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors">
        View Details
      </button>
    </div>
  </div>
);
