import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { formatDescription } from "@/lib/formt-description";
import type { WaterTranspoType } from "@/lib/types";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

export const WaterTransportCard = ({
  transport,
  isListView = false,
  index,
}: {
  transport: WaterTranspoType;
  isListView: boolean;
  index: number;
}) => (
  <Card
    className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
      isListView ? "flex gap-4 p-4" : "p-0"
    }`}
    style={{
      animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
    }}
  >
    {/* Image Section */}
    <div
      className={`
        relative 
        ${isListView ? "w-32 h-24 flex-shrink-0" : "w-full h-48"}
        overflow-hidden 
        ${isListView ? "rounded-xl" : "rounded-t-2xl"}
      `}
    >
      <img
        src={
          transport.imageUrl_1 ||
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
        }
        alt={transport.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>

    {/* Content Section */}
    <div
      className={`${isListView ? "flex-1 p-0" : "p-4"} flex flex-col h-full`}
    >
      <CardHeader className="p-0">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {transport.name}
          </CardTitle>
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(transport.expected_fee)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-grow">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {formatDescription(transport.description)}
        </p>

        {/* <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block mb-1">Departure:</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {transport.departure_time.split("\n").map((time, index) => (
                  <div key={index} className="whitespace-nowrap">
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="flex flex-wrap gap-1 mb-3">
          {transport.departure_days.slice(0, 3).map((day, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
            >
              {day.slice(0, 3)}
            </span>
          ))}
          {transport.departure_days.length > 3 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
              +{transport.departure_days.length - 3}
            </span>
          )}
        </div> */}
      </CardContent>

      <CardFooter className="p-0 mt-auto">
        <Link
          to={`/water-transportations/${transport.id}`}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 text-center"
        >
          View Details
        </Link>
      </CardFooter>
    </div>
  </Card>
);
