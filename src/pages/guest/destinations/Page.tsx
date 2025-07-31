import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Clock,
  Heart,
  Share2,
  Search,
  Grid3X3,
  List,
  ArrowRight,
  Image,
  Compass,
} from "lucide-react";

// Mock data for demonstration - replace with your actual data structure
const mockDestinations = [
  {
    id: 1,
    name: "Chocolate Hills",
    imageUrl_1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    description:
      "Famous geological formation with over 1,200 cone-shaped hills",
    category: "Nature",
    rating: 4.8,
    reviewCount: 1247,
    duration: "2-3 hours",
    location: "Carmen, Bohol",
    isPopular: true,
    tags: ["Scenic", "Photography", "Hiking"],
  },
  {
    id: 2,
    name: "Tarsier Sanctuary",
    imageUrl_1:
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
    description: "Home to the world's smallest primates - Philippine Tarsiers",
    category: "Wildlife",
    rating: 4.7,
    reviewCount: 892,
    duration: "1-2 hours",
    location: "Corella, Bohol",
    isPopular: true,
    tags: ["Wildlife", "Conservation", "Educational"],
  },
  {
    id: 3,
    name: "Baclayon Church",
    imageUrl_1:
      "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?w=800&q=80",
    description: "Historic stone church built by Spanish missionaries in 1595",
    category: "Heritage",
    rating: 4.5,
    reviewCount: 645,
    duration: "30-45 mins",
    location: "Baclayon, Bohol",
    isPopular: false,
    tags: ["History", "Architecture", "Culture"],
  },
  {
    id: 4,
    name: "Loboc River",
    imageUrl_1:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Scenic river cruise with floating restaurant experience",
    category: "Adventure",
    rating: 4.6,
    reviewCount: 1156,
    duration: "2-3 hours",
    location: "Loboc, Bohol",
    isPopular: true,
    tags: ["River Cruise", "Dining", "Scenic"],
  },
  {
    id: 5,
    name: "Mag-Aso Falls",
    imageUrl_1:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    description: "Hidden waterfall perfect for swimming and nature photography",
    category: "Nature",
    rating: 4.4,
    reviewCount: 423,
    duration: "Half day",
    location: "Antequera, Bohol",
    isPopular: false,
    tags: ["Waterfall", "Swimming", "Adventure"],
  },
  {
    id: 6,
    name: "Blood Compact Site",
    imageUrl_1:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    description:
      "Historical monument commemorating the first treaty of friendship",
    category: "Heritage",
    rating: 4.2,
    reviewCount: 287,
    duration: "30 mins",
    location: "Tagbilaran, Bohol",
    isPopular: false,
    tags: ["History", "Monument", "Culture"],
  },
];

const GuestDestination = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state
  const isPending = false;
  const error = null;

  // Use mock data for demonstration
  const data = { destinations: mockDestinations };

  useEffect(() => {
    // Trigger animation on component mount
    setIsLoaded(true);
  }, []);

  const filteredDestinations =
    data?.destinations?.filter((destination) => {
      const matchesCategory =
        selectedCategory === "All" || destination.category === selectedCategory;
      const matchesSearch =
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 animate-pulse"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div
          className="bg-red-50/80 backdrop-blur-md border border-red-200/50 rounded-2xl p-8 text-center max-w-md"
          style={{
            animation: "slide-in-from-top-5 0.5s ease-out both",
          }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Destinations
          </h3>
          <p className="text-red-600 text-sm">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.destinations || data.destinations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div
          className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center max-w-md shadow-xl"
          style={{
            animation: "fadeInUp 0.6s ease-out both",
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            No Destinations Yet
          </h3>
          <p className="text-gray-600 mb-6">
            We're working on adding amazing destinations to explore. Check back
            soon!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg">
            Add Destination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-from-top-5 {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header Section */}
      <div
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-16"
        style={{
          animation: "slide-in-from-top-5 0.8s ease-out both",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-yellow-300">Tubigon</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore breathtaking destinations and create unforgettable
              memories in beautiful Bohol
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div
          className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-8 shadow-xl"
          style={{
            animation: "fadeInUp 0.6s ease-out 0.2s both",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-white/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-white/50"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-white/50"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

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
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-teal-600">
                  {selectedCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Destinations Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.5 + index * 0.1
                  }s both`,
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

                  {/* Popular Badge */}
                  {destination.isPopular && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Popular
                      </span>
                    </div>
                  )}

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
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-600">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{destination.duration}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags?.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center justify-center space-x-2">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.5 + index * 0.1
                  }s both`,
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
                    {destination.isPopular && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium text-gray-600">
                            {destination.rating} ({destination.reviewCount})
                          </span>
                        </div>
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
                              favorites.has(destination.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {destination.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {destination.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
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
        )}

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div
            className="text-center py-12"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDestination;
