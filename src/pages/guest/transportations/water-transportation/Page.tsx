import { useState, useMemo } from "react";
import { MapPin, Anchor } from "lucide-react";
import { Header } from "@/components/guest/header";
import { SearchAndFilterBar } from "@/components/guest/search-filter";
import { GridListWaterTransportation } from "@/components/guest/grid-list/water-transportation";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/db";
import type { WaterTranspoType } from "@/lib/types";

const cleanSearchTerm = (term: string) =>
  term.replace(/[^a-zA-Z0-9\s\-.,]/g, "");

const GuestWaterTransportationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("All");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { data, isPending, isError } = useQuery({
    queryKey: ["water-transportations"],
    queryFn: () => fetchData("water-transportations"),
  });

  const handleSearch = (term: string) => {
    setSearchTerm(cleanSearchTerm(term));
  };

  const filteredTransports = useMemo(() => {
    if (!data?.waterTransportations) return [];

    return data.waterTransportations.filter((transport: WaterTranspoType) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        transport.name?.toLowerCase().includes(searchLower) ||
        transport.description?.toLowerCase().includes(searchLower);

      const matchesDay =
        selectedDay === "All" ||
        transport.departure_days?.includes(selectedDay);

      return matchesSearch && matchesDay && !transport.deletedAt;
    });
  }, [searchTerm, selectedDay, data]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Loading Error</h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the water transportation data. Please try again
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header
        title="Water Transportation"
        description="Explore Tubigon's waters with our reliable boat services - from fast
            ferries to scenic island tours"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilterBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        {(searchTerm || selectedDay !== "All") && (
          <div className="text-center">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDay("All");
              }}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="px-4 mb-6">
        <p className="text-center text-gray-600">
          {isPending
            ? "Loading..."
            : `${filteredTransports.length} water transportation${
                filteredTransports.length !== 1 ? "s" : ""
              } available`}
        </p>
      </div>

      <GridListWaterTransportation
        favorites={favorites}
        filteredTransports={filteredTransports}
        isListView={viewMode === "list"}
        isLoading={isPending}
        toggleFavorite={toggleFavorite}
        setSearchTerm={setSearchTerm}
        setSelectedDay={setSelectedDay}
        viewMode={viewMode}
      />

      <div className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Tubigon Port Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="mb-2">
                  <strong>Location:</strong> Tubigon Port, Bohol
                </p>
                <p className="mb-2">
                  <strong>Operating Hours:</strong> 24/7
                </p>
                <p className="mb-2">
                  <strong>Port Office:</strong> +63 38 515 1234
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Facilities:</strong> Waiting area, Restrooms, Parking
                </p>
                <p className="mb-2">
                  <strong>Payment:</strong> Cash, GCash, Maya accepted
                </p>
                <p className="mb-2">
                  <strong>Tips:</strong> Arrive 30 mins before departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
        aria-label="Quick action"
      >
        <Anchor className="w-6 h-6" />
      </button>
    </div>
  );
};

export default GuestWaterTransportationPage;
