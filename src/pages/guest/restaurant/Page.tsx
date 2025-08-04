import { useState, useMemo } from "react";
import { NoResult } from "@/components/guest/no-result";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/db";
import type { RestaurantType } from "@/lib/types";
import { Pending } from "@/components/guest/pending";
import { Error } from "@/components/guest/error";

import { Empty } from "@/components/guest/empty";
import { Header } from "@/components/guest/header";
import { GridListRestaurant } from "@/components/guest/grid-list/restaurant";
import { RestaurantListView } from "@/components/guest/list/restaurant";
import { SearchAndFilterBar } from "@/components/guest/search-filter";
import { useMetadata } from "@/hooks/use-metadata";

const GuestRestaurantPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { data, isPending, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchData("restaurants"),
  });

  useMetadata({
    title: "Best Restaurants in Tubigon",
    description: "Discover the top-rated dining experiences across Tubigon",
    keywords: ["Tubigon restaurants", "best food Tubigon", "dining guide"],
  });

  // Safer filtering with useMemo
  const filteredRestaurants = useMemo(() => {
    if (!data?.restaurants) return [];

    return data.restaurants.filter((restaurant: RestaurantType) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (restaurant.address &&
          restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [data, searchTerm]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const handleSearch = (term: string) => {
    const cleanTerm = term.replace(/[^a-zA-Z0-9\s\-.,]/g, "");
    setSearchTerm(cleanTerm);
  };

  const getImageCount = (restaurant: RestaurantType) => {
    let count = 0;
    if (restaurant.imageUrl_1) count++;
    if (restaurant.imageUrl_2) count++;
    if (restaurant.imageUrl_3) count++;
    return count;
  };

  if (isPending) {
    return <Pending />;
  }

  if (error) {
    return <Error name="Restaurants" />;
  }

  if (!data?.restaurants || data.restaurants.length === 0) {
    return (
      <Empty
        name="Restaurants"
        description="We're working on adding the best destinations to our list."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Restaurants"
        description="Discover the best dining experiences in Tubigon"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
            found
          </h2>
        </div>

        {/* Restaurants Display */}
        {viewMode === "grid" ? (
          <GridListRestaurant
            favorites={favorites}
            filteredRestaurants={filteredRestaurants}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <RestaurantListView
            favorites={favorites}
            filteredRestaurants={filteredRestaurants}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* Empty State */}
        {filteredRestaurants.length === 0 && searchTerm && (
          <NoResult name="restaurant" setSearchTerm={setSearchTerm} />
        )}
      </main>
    </div>
  );
};

export default GuestRestaurantPage;
