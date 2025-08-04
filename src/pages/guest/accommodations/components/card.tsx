import type { AccommodationType } from "@/lib/types";
import { Building, Eye, Heart, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export const AccommodationCard = ({
  accommodation,
  viewMode,
  isFavorite,
  toggleFavorite,
  getTypeColor,
}: {
  accommodation: AccommodationType;
  viewMode: "grid" | "list";
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  getTypeColor: (type: string) => string;
}) => {
  return viewMode === "grid" ? (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {accommodation.imageUrl_1 ? (
          <img
            src={accommodation.imageUrl_1}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => toggleFavorite(accommodation.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">
            {accommodation.name}
          </h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${getTypeColor(
              accommodation.type
            )}`}
          >
            {accommodation.type}
          </span>
        </div>

        {accommodation.address && (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{accommodation.address}</span>
          </div>
        )}

        {accommodation.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {accommodation.description}
          </p>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {accommodation.phone && (
              <a
                href={`tel:${accommodation.phone}`}
                className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>
          <Link
            to={`/accommodations/${accommodation.id}`}
            preventScrollReset={true}
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 h-48">
          {accommodation.imageUrl_1 ? (
            <img
              src={accommodation.imageUrl_1}
              alt={accommodation.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {accommodation.name}
            </h3>
            <span
              className={`px-3 py-1 text-sm rounded-full ${getTypeColor(
                accommodation.type
              )}`}
            >
              {accommodation.type}
            </span>
          </div>

          {accommodation.address && (
            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{accommodation.address}</span>
            </div>
          )}

          {accommodation.description && (
            <p className="text-gray-600 mb-4">{accommodation.description}</p>
          )}

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFavorite(accommodation.id)}
                className={`p-2 rounded-lg ${
                  isFavorite
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              {accommodation.phone && (
                <a
                  href={`tel:${accommodation.phone}`}
                  className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
                >
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
            <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
