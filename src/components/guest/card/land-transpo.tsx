import { formatCurrency } from "@/lib/currency";
import { formatDescription } from "@/lib/formt-description";
import type { LandTranspoType } from "@/lib/types";
import { Car, Phone, Truck, Users } from "lucide-react";
import { Link } from "react-router";

interface Props {
  transport: LandTranspoType;
  isListView: boolean;
}

export const LandTransportCard = ({ transport, isListView = false }: Props) => {
  const getVehicleIcon = (vehicleType: string | null) => {
    switch (vehicleType) {
      case "Van":
      case "SUV":
        return <Car className="w-4 h-4" />;
      case "Truck":
        return <Truck className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isListView ? "flex gap-4 p-4" : "flex flex-col h-full"
      }`}
    >
      {/* Favorite Button */}

      {/* Image Section */}
      <div
        className={`relative ${
          isListView ? "w-32 h-24 flex-shrink-0" : "w-full h-48"
        } overflow-hidden ${isListView ? "rounded-xl" : "rounded-t-2xl"}`}
      >
        <img
          src={
            transport.imageUrl_1 ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
          }
          alt={transport.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 text-white">
          <div className="flex items-center gap-1 text-xs bg-black/50 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span>{transport.capacity} seats</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`${
          isListView ? "flex-1 flex flex-col" : "flex-1 flex flex-col p-4"
        }`}
      >
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              {transport.name}
            </h3>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(transport.baseFee)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {getVehicleIcon(transport.vehicleType)}
            <span className="text-sm text-blue-600">
              {transport.vehicleType}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-600">{transport.operator}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {formatDescription(transport.description)}
          </p>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Phone className="w-3 h-3" />
              <span>{transport.contactNumber}</span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Fee:</span>{" "}
              {transport.feeDescription}
            </div>
          </div>
        </div>

        {/* View Details Button - Fixed */}
        <div className="mt-auto pt-4">
          <Link
            to={`/land-transportations/${transport.id}`}
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
