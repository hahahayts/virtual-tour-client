import { useMemo, useState } from "react";

import { Pending } from "@/components/guest/pending";
import { Error } from "@/components/guest/error";
import { Empty } from "@/components/guest/empty";
import { Header } from "@/components/guest/header";
import { SearchAndFilterBar } from "@/components/guest/search-filter";
import { GridListDestination } from "@/components/guest/grid-list/destination";
import { ListView } from "@/components/guest/list/destination";
import { NoResult } from "@/components/guest/no-result";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/db";
import type z from "zod";
import type { DestinationSchema } from "@/schema/destination";

const GuestDestination = () => {
  const [viewMode, setViewMode] = useState<string>("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState(new Set());

  const { data, isPending, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => fetchData("destinations"),
    refetchInterval: 20000,
    staleTime: 30000,
  });

  const filteredDestinations = useMemo(() => {
    if (!data?.destinations) return [];
    return data?.destinations?.filter(
      (destination: z.infer<typeof DestinationSchema>) => {
        const matchesSearch =
          destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          destination.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (destination.address &&
            destination.address
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));
        return matchesSearch;
      }
    );
  }, [data, searchTerm]);

  const handleSearch = (term: string) => {
    const cleanTerm = term.replace(/[^a-zA-Z0-9\s\-.,]/g, "");
    setSearchTerm(cleanTerm);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (isPending) {
    return <Pending />;
  }

  if (error) {
    return <Error name="Destinations" />;
  }

  if (!data || !data.destinations || data.destinations.length === 0) {
    return (
      <Empty
        name="Destinations"
        description="We're working on adding amazing destinations to explore"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header Section */}
      <Header
        title="Discover"
        description=" Explore breathtaking destinations and create unforgettable
              memories in beautiful Bohol"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        {/* Results Count */}
        <div
          className="mb-6"
          style={{
            animation: "fade-in 0.5s ease-out 0.4s both",
          }}
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredDestinations.length}
            </span>{" "}
            destinations
          </p>
        </div>

        {/* Destinations Grid/List */}
        {viewMode === "grid" ? (
          <GridListDestination
            favorites={favorites}
            filteredDestinations={filteredDestinations}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          /* List View */
          <ListView
            favorites={favorites}
            filteredDestinations={filteredDestinations}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <NoResult name="destination" setSearchTerm={setSearchTerm} />
        )}
      </div>
    </div>
  );
};

export default GuestDestination;
