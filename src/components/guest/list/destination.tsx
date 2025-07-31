import type { DestinationSchema } from "@/schema/destination";
import { ArrowRight, Heart, Image, MapPin } from "lucide-react";
import type z from "zod";

interface Props {
  filteredDestinations: z.infer<typeof DestinationSchema>[];
  toggleFavorite: (id: string) => void;
  favorites: Set<unknown>;
}

export const ListView = ({
  filteredDestinations,
  toggleFavorite,
  favorites,
}: Props) => {
  return (
    <div className="space-y-4">
      {filteredDestinations.map((destination, index) => (
        <div
          key={destination.id}
          className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{
            animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
          }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
              {destination.imageUrl_1 ? (
                <img
                  src={destination.imageUrl_1}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {destination.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    favorites.has(destination.id)
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.has(destination.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <p className="text-gray-600 mb-3 leading-relaxed line-clamp-5">
                {destination.description}
              </p>

              {destination.address && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{destination.address}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {destination.website && (
                    <a
                      href={destination.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      Website
                    </a>
                  )}
                  {destination.facebook && (
                    <a
                      href={destination.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      Facebook
                    </a>
                  )}
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center space-x-2">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
