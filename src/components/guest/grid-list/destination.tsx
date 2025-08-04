import type { DestinationSchema } from "@/schema/destination";
import { ArrowRight, Heart, Image, MapPin, Share2 } from "lucide-react";
import { Link } from "react-router";
import type z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Props {
  filteredDestinations: z.infer<typeof DestinationSchema>[];
  toggleFavorite: (id: string) => void;
  favorites: Set<unknown>;
}

export const GridListDestination = ({
  filteredDestinations,
  toggleFavorite,
  favorites,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDestinations.map((destination, index) => (
        <Card
          key={destination.id}
          className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden flex flex-col h-full transition-shadow hover:shadow-xl"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          {/* Image container without top padding */}
          <div className="relative h-48 overflow-hidden shrink-0 -mt-6 -mx-6 -mb-0">
            {" "}
            {/* Negative margins to remove padding */}
            {destination.imageUrl_1 ? (
              <img
                src={destination.imageUrl_1}
                alt={destination.name}
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
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(destination.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 ${
                  favorites.has(destination.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(destination.id) ? "fill-current" : ""
                  }`}
                />
              </button>
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rest of the card content remains the same */}
          <CardHeader className="px-6 pt-6 pb-3">
            <CardTitle className="text-xl text-gray-800">
              {destination.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow px-6 pb-4">
            <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-5">
              {destination.description}
            </CardDescription>

            {/* Meta Info */}
            {destination.address && (
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{destination.address}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto px-6 pb-6">
            <Link
              to={`/destinations/${destination.id}`}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
