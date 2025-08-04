import type { WaterTranspoType } from "@/lib/types";
import { Ship } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { WaterTransportCard } from "../card/water-transpo";

const SkeletonCard = ({ isListView = false }) => (
  <Card className={`${isListView ? "flex gap-4 p-4" : ""}`}>
    <div
      className={`${
        isListView ? "w-32 h-24 flex-shrink-0" : "w-full h-48"
      } bg-gray-200 animate-pulse ${
        isListView ? "rounded-xl" : "rounded-t-2xl"
      }`}
    />
    <div className={`${isListView ? "flex-1 space-y-2" : "p-4 space-y-3"}`}>
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="h-8 bg-gray-200 rounded animate-pulse" />
    </div>
  </Card>
);

interface Props {
  isLoading: boolean;
  viewMode: string;
  filteredTransports: WaterTranspoType[];
  setSearchTerm: (s: string) => void;
  setSelectedDay: (d: string) => void;
  isListView: boolean;
  favorites: Set<unknown>;
  toggleFavorite: (id: string) => void;
}

export const GridListWaterTransportation = ({
  filteredTransports,
  isLoading,
  setSearchTerm,
  setSelectedDay,
  viewMode,
  favorites,
  toggleFavorite,
}: Props) => {
  return (
    <div className="px-4 pb-12">
      {isLoading ? (
        <div
          className={`max-w-6xl mx-auto ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} isListView={viewMode === "list"} />
          ))}
        </div>
      ) : filteredTransports.length === 0 ? (
        <div className="text-center py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <Ship className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                No water transportation found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all available
                options.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDay("All");
                }}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200"
              >
                View All Options
              </button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div
          className={`max-w-6xl mx-auto ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredTransports.map((transport, index) => (
            <WaterTransportCard
              key={transport.id}
              transport={transport}
              isListView={viewMode === "list"}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
