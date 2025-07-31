import React, { useState } from "react";
import {
  Building,
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Coffee,
  Wind,
  Tv,
  Phone,
  Calendar,
  Users,
  Heart,
  Share2,
  Filter,
  Search,
  Grid3X3,
  List,
  ArrowRight,
  ChevronDown,
  Image,
  Eye,
  Camera,
  Clock,
  Shield,
  Award,
  Zap,
  Bath,
  Bed,
  Home,
} from "lucide-react";

// Mock inn data
const mockInns = [
  {
    id: 1,
    name: "Seaside Inn & Suites",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    description:
      "Charming beachfront inn with cozy rooms and personalized service",
    location: "Panglao Island, Bohol",
    rating: 4.6,
    reviewCount: 842,
    priceRange: "₱3,500 - ₱6,500",
    category: "Beachfront",
    amenities: ["Wifi", "Restaurant", "Beach Access", "Air Conditioning"],
    features: ["Free Breakfast", "Family Friendly", "Pet Friendly"],
    roomTypes: ["Standard Room", "Family Suite", "Ocean View Room"],
    isPopular: true,
    availability: "Available",
    distance: "2.5 km from city center",
  },
  {
    id: 2,
    name: "Tubigon Heritage Inn",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    ],
    description:
      "Historic inn with traditional architecture and modern comforts",
    location: "Tubigon Town Center, Bohol",
    rating: 4.4,
    reviewCount: 523,
    priceRange: "₱2,500 - ₱4,500",
    category: "Heritage",
    amenities: ["Wifi", "Restaurant", "Garden", "Air Conditioning"],
    features: ["Cultural Experience", "Central Location", "Breakfast Included"],
    roomTypes: ["Standard Room", "Deluxe Room", "Family Room"],
    isPopular: false,
    availability: "Available",
    distance: "0.3 km from city center",
  },
  {
    id: 3,
    name: "Mountain View Inn",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    ],
    description: "Peaceful retreat with stunning mountain views and fresh air",
    location: "Carmen, Bohol",
    rating: 4.5,
    reviewCount: 387,
    priceRange: "₱2,000 - ₱3,800",
    category: "Mountain",
    amenities: ["Wifi", "Restaurant", "Garden", "Parking"],
    features: ["Scenic Views", "Nature Trails", "Quiet Location"],
    roomTypes: ["Standard Room", "Family Room", "Mountain View Room"],
    isPopular: true,
    availability: "Limited",
    distance: "25 km from city center",
  },
  {
    id: 4,
    name: "Budget Inn Tubigon",
    imageUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    ],
    description: "Affordable and clean accommodation in central Tubigon",
    location: "Tubigon Port Area, Bohol",
    rating: 4.0,
    reviewCount: 215,
    priceRange: "₱1,200 - ₱2,500",
    category: "Budget",
    amenities: ["Wifi", "Air Conditioning", "24/7 Front Desk"],
    features: ["Near Port", "Budget Friendly", "Clean Rooms"],
    roomTypes: ["Standard Room", "Family Room"],
    isPopular: false,
    availability: "Available",
    distance: "0.8 km from city center",
  },
  {
    id: 5,
    name: "Riverside Country Inn",
    imageUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    description: "Rustic inn with beautiful river views and home-cooked meals",
    location: "Loboc, Bohol",
    rating: 4.7,
    reviewCount: 298,
    priceRange: "₱3,000 - ₱5,500",
    category: "Countryside",
    amenities: ["Wifi", "Restaurant", "Garden", "Parking", "River Access"],
    features: ["Riverside", "Local Cuisine", "Peaceful Atmosphere"],
    roomTypes: ["Standard Room", "Family Room", "Riverside Cottage"],
    isPopular: true,
    availability: "Available",
    distance: "12 km from city center",
  },
];

const GuestInnPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Beachfront",
    "Heritage",
    "Mountain",
    "Budget",
    "Countryside",
  ];
  const priceRanges = [
    "All",
    "Under ₱2,000",
    "₱2,000 - ₱4,000",
    "₱4,000 - ₱6,000",
    "Above ₱6,000",
  ];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const amenityIcons = {
    Wifi: Wifi,
    Restaurant: Utensils,
    "Beach Access": Waves,
    "Air Conditioning": Wind,
    Garden: Home,
    Parking: Car,
    "24/7 Front Desk": Clock,
    "River Access": Waves,
  };

  const filteredInns = mockInns.filter((inn) => {
    const matchesCategory =
      selectedCategory === "All" || inn.category === selectedCategory;
    const matchesSearch =
      inn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inn.location.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceRange !== "All") {
      const price = parseInt(
        inn.priceRange.split(" - ")[0].replace("₱", "").replace(",", "")
      );
      switch (priceRange) {
        case "Under ₱2,000":
          matchesPrice = price < 2000;
          break;
        case "₱2,000 - ₱4,000":
          matchesPrice = price >= 2000 && price <= 4000;
          break;
        case "₱4,000 - ₱6,000":
          matchesPrice = price >= 4000 && price <= 6000;
          break;
        case "Above ₱6,000":
          matchesPrice = price > 6000;
          break;
      }
    }

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedInns = [...filteredInns].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return (
          parseInt(
            a.priceRange.split(" - ")[0].replace("₱", "").replace(",", "")
          ) -
          parseInt(
            b.priceRange.split(" - ")[0].replace("₱", "").replace(",", "")
          )
        );
      case "price-high":
        return (
          parseInt(
            b.priceRange.split(" - ")[0].replace("₱", "").replace(",", "")
          ) -
          parseInt(
            a.priceRange.split(" - ")[0].replace("₱", "").replace(",", "")
          )
        );
      default:
        return b.isPopular - a.isPopular || b.rating - a.rating;
    }
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Home className="w-12 h-12 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Inns in <span className="text-yellow-300">Bohol</span>
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover charming inns and guesthouses for a cozy stay in
              beautiful Bohol. Experience local hospitality at its finest.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col space-y-4">
            {/* Top Row - Search and Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all"
                />
              </div>

              {/* View Toggle & Filter Toggle */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-all hover:bg-blue-600"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

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

            {/* Filters Row */}
            <div
              className={`${
                showFilters ? "flex" : "hidden lg:flex"
              } flex-col lg:flex-row gap-4 items-center`}
            >
              {/* Category Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                        : "bg-white/50 text-gray-600 hover:bg-white/70"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="font-medium">{category}</span>
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white/50 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/50 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {sortedInns.length}
            </span>{" "}
            inns
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-teal-600">
                  {selectedCategory}
                </span>{" "}
                category
              </span>
            )}
          </p>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>Local Charm</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure Booking</span>
            </div>
          </div>
        </div>

        {/* Inns Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedInns.map((inn) => (
              <div
                key={inn.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                {/* Image Gallery */}
                <div className="relative h-56 overflow-hidden">
                  {inn.imageUrl ? (
                    <img
                      src={inn.imageUrl}
                      alt={inn.name}
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

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {inn.isPopular && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Popular
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        inn.availability === "Available"
                          ? "bg-green-500 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {inn.availability}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(inn.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
                        favorites.has(inn.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(inn.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Count */}
                  {inn.images && inn.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                      <Camera className="w-3 h-3" />
                      <span>{inn.images.length} photos</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                        {inn.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{inn.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-800">
                          {inn.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({inn.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {inn.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-500">
                        Price per night
                      </span>
                      <div className="text-lg font-bold text-blue-600">
                        {inn.priceRange}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inn.category === "Beachfront"
                          ? "bg-blue-100 text-blue-600"
                          : inn.category === "Budget"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {inn.category}
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {inn.amenities?.slice(0, 4).map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity] || Wifi;
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {inn.amenities && inn.amenities.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{inn.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {inn.features?.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg group/btn flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                    <button className="px-4 py-3 bg-white/50 border border-white/30 rounded-xl text-gray-600 hover:bg-white/70 transition-all duration-300 group/view">
                      <Eye className="w-4 h-4 group-hover/view:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {sortedInns.map((inn) => (
              <div
                key={inn.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full lg:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                    {inn.imageUrl ? (
                      <img
                        src={inn.imageUrl}
                        alt={inn.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    {inn.isPopular && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Popular
                        </span>
                      </div>
                    )}
                    {inn.images && inn.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                        <Camera className="w-3 h-3" />
                        <span>{inn.images.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                          {inn.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{inn.location}</span>
                          </div>
                          <span>•</span>
                          <span>{inn.distance}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-lg font-bold text-gray-800">
                            {inn.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({inn.reviewCount} reviews)
                        </span>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">From</span>
                          <div className="text-xl font-bold text-blue-600">
                            {inn.priceRange.split(" - ")[0]}
                          </div>
                          <span className="text-xs text-gray-500">
                            per night
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {inn.description}
                    </p>

                    {/* Amenities Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {inn.amenities?.slice(0, 6).map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || Wifi;
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600"
                          >
                            <IconComponent className="w-4 h-4" />
                            <span className="hidden sm:inline">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Features and Action */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            inn.category === "Beachfront"
                              ? "bg-blue-100 text-blue-600"
                              : inn.category === "Budget"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {inn.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            inn.availability === "Available"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {inn.availability}
                        </span>
                        {inn.features?.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(inn.id);
                          }}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            favorites.has(inn.id)
                              ? "bg-red-100 text-red-500"
                              : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.has(inn.id) ? "fill-current" : ""
                            }`}
                          />
                        </button>

                        <button className="flex items-center space-x-2 bg-white/50 border border-white/30 text-gray-600 px-4 py-2 rounded-lg hover:bg-white/70 transition-all duration-300">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>

                        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group/btn">
                          <Calendar className="w-4 h-4" />
                          <span>Book Now</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedInns.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No inns found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setPriceRange("All");
              }}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Quick Book Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-md border border-white/40 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600">
              Our local experts can help you find the perfect cozy accommodation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-3">
                Speak with our booking specialists
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                +63 38 411 5555
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Group Bookings
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Special rates for groups of 5+
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                Get Quote
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Best Price Guarantee
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                We'll match any lower price
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestInnPage;
