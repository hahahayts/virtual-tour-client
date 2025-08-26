import { useMemo, useState } from "react";
import { Search, Grid3X3, List } from "lucide-react";
import { fetchData } from "@/db";
import { useQuery } from "@tanstack/react-query";
import type { AccommodationType } from "@/lib/types";
import { Header } from "@/components/guest/header";
import { AccommodationCard } from "./components/card";
import { Error } from "./components/error";
import { NoResults } from "./components/no-result";
import { Pending } from "@/components/guest/pending";

const GuestAccommodationPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { data, isPending, error } = useQuery({
    queryKey: ["accommodations"],
    queryFn: () => fetchData("accommodations"),
  });

  const accommodationTypes = ["All", "HOTEL", "INN", "RESORT", "APARTMENT"];

  const filteredAccommodations = useMemo(() => {
    if (!data?.accommodations) return [];

    const searchLower = searchTerm.toLowerCase();
    return data.accommodations.filter((accommodation: AccommodationType) => {
      const matchesType =
        selectedType === "All" || accommodation.type === selectedType;
      const matchesSearch =
        accommodation.name.toLowerCase().includes(searchLower) ||
        (accommodation.description &&
          accommodation.description.toLowerCase().includes(searchLower)) ||
        (accommodation.address &&
          accommodation.address.toLowerCase().includes(searchLower));

      return matchesType && matchesSearch;
    });
  }, [data, searchTerm, selectedType]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "RESORT":
        return "bg-green-100 text-green-600";
      case "HOTEL":
        return "bg-blue-100 text-blue-600";
      case "INN":
        return "bg-amber-100 text-amber-600";
      case "APARTMENT":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (error) {
    return <Error />;
  }

  if (isPending) {
    return <Pending />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with animation */}
      <Header
        title="Accommodations in"
        description="Find your perfect place to stay in Tubigon"
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar with animation */}
        <div
          className="bg-white rounded-lg shadow-md p-6 mb-8 "
          style={{
            animation: "fadeInUp 0.6s ease-out 0.2s both",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accommodations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {accommodationTypes.map((type, index) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
                  selectedType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.5 + index * 0.1
                  }s both`,
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div
          className="mb-6 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {filteredAccommodations.length}
            </span>{" "}
            accommodations
            {selectedType !== "All" && (
              <span>
                {" "}
                of type <span className="font-semibold">{selectedType}</span>
              </span>
            )}
          </p>
        </div>

        {/* Accommodations Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccommodations.map(
              (accommodation: AccommodationType, index: number) => (
                <div
                  key={accommodation.id}
                  className="animate-fade-in-up"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${
                      0.5 + index * 0.1
                    }s both`,
                  }}
                >
                  <AccommodationCard
                    accommodation={accommodation}
                    viewMode={viewMode}
                    getTypeColor={getTypeColor}
                  />
                </div>
              )
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAccommodations.map(
              (accommodation: AccommodationType, index: number) => (
                <div
                  key={accommodation.id}
                  className="animate-fade-in-up"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${
                      0.5 + index * 0.1
                    }s both`,
                  }}
                >
                  <AccommodationCard
                    accommodation={accommodation}
                    viewMode={viewMode}
                    getTypeColor={getTypeColor}
                  />
                </div>
              )
            )}
          </div>
        )}

        {/* No Results */}
        {filteredAccommodations.length === 0 && (
          <NoResults
            onClearFilters={() => {
              setSearchTerm("");
              setSelectedType("All");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GuestAccommodationPage;
