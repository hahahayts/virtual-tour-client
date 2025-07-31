import type { DestinationSchema } from "@/schema/destination";
import { ArrowRight, Heart, Image, MapPin, Share2 } from "lucide-react";
import { Link } from "react-router";
import type z from "zod";

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
        <div
          key={destination.id}
          className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {destination.imageUrl_1 ? (
              <img
                src={destination.imageUrl_1}
                alt={destination.name}
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(destination.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
                  favorites.has(destination.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(destination.id) ? "fill-current" : ""
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
                {destination.name}
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-5">
              {destination.description}
            </p>

            {/* Meta Info */}
            {destination.address && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{destination.address}</span>
              </div>
            )}

            {/* Action Button */}
            <Link
              to={`/destinations/${destination.id}`}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center justify-center space-x-2"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
