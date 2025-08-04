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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router";

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
        <Card
          key={restaurant.id}
          className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden flex flex-col h-full transition-shadow hover:shadow-xl"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          {/* Image Container - flush with card edges */}
          <div className="relative h-48 overflow-hidden shrink-0 -mx-6 -mt-6 mb-0">
            <div className="w-full h-full overflow-hidden">
              {restaurant.imageUrl_1 ? (
                <img
                  src={restaurant.imageUrl_1}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
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
            </div>

            {/* Image count badge */}
            {getImageCount(restaurant) > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                <Image className="w-3 h-3" />
                <span>{getImageCount(restaurant)}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(restaurant.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 ${
                  favorites.has(restaurant.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(restaurant.id) ? "fill-current" : ""
                  }`}
                />
              </button>
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Content */}
          <CardHeader className="px-6 pt-6 pb-3">
            <CardTitle className="text-xl text-gray-800">
              {restaurant.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow px-6 pb-4">
            <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-5">
              {restaurant.description}
            </CardDescription>

            {/* Meta Info */}
            <div className="space-y-2 mt-4">
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
            <div className="flex flex-wrap gap-2 mt-4">
              {restaurant.website && (
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 text-blue-600 rounded-full"
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
                  className="p-2 bg-blue-50 text-blue-600 rounded-full"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {restaurant.email && (
                <a
                  href={`mailto:${restaurant.email}`}
                  className="p-2 bg-blue-50 text-blue-600 rounded-full"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto px-6 pb-6">
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
