import {
  ArrowRight,
  Image,
  MapPin,
  Phone,
  Globe,
  Mail,
  Facebook,
} from "lucide-react";
import type { RestaurantType } from "@/lib/types";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router";

interface Props {
  filteredRestaurants: RestaurantType[];
  getImageCount?: (restaurant: RestaurantType) => number;
}

export const RestaurantListView = ({
  filteredRestaurants,

  getImageCount = () => 0,
}: Props) => {
  return (
    <div className="space-y-4">
      {filteredRestaurants.map((restaurant, index) => (
        <Card
          key={restaurant.id}
          className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          <div className="flex flex-col md:flex-row ">
            {/* Image without padding */}
            <div className="relative w-full md:w-48 h-32 flex-shrink-0 pl-5">
              {restaurant.imageUrl_1 ? (
                <img
                  src={restaurant.imageUrl_1}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}
              {getImageCount(restaurant) > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-1.5 py-0.5 rounded-md text-xs flex items-center gap-1">
                  <Image className="w-3 h-3" />
                  <span>{getImageCount(restaurant)}</span>
                </div>
              )}
            </div>

            {/* Content with padding */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {restaurant.name}
                </CardTitle>
              </div>

              <CardContent className="text-gray-600 mb-3 leading-relaxed line-clamp-3 p-0">
                {restaurant.description}
              </CardContent>

              <div className="space-y-1.5 mb-3">
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

              <CardFooter className="flex items-center justify-between p-0">
                <div className="flex flex-wrap gap-2">
                  {restaurant.website && (
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Website</span>
                    </a>
                  )}
                  {restaurant.facebook && (
                    <a
                      href={restaurant.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
                    >
                      <Facebook className="w-3 h-3" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {restaurant.email && (
                    <a
                      href={`mailto:${restaurant.email}`}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                  )}
                </div>
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center space-x-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
