import { useState } from "react";
import {
  Building,
  Star,
  MapPin,
  Wifi,
  Utensils,
  Waves,
  Coffee,
  Wind,
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
  Image,
  Eye,
  Camera,
  Clock,
  Shield,
  Award,
  Zap,
  Home,
} from "lucide-react";

// Updated mock hotel data based on the provided schema
const mockHotels = [
  {
    id: "1",
    name: "Bohol Beach Club",
    description:
      "Luxury beachfront resort with world-class amenities and stunning ocean views",
    address: "Panglao Island, Bohol, Philippines",
    type: "HOTEL",
    email: "info@boholbeachclub.com",
    phone: "+63382551234",
    website: "https://www.boholbeachclub.com",
    facebook: "https://facebook.com/boholbeachclub",
    imageUrl_1:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    imageUrl_2:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imageUrl_3:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "2",
    name: "Tubigon Grand Hotel",
    description:
      "Modern business hotel in the heart of Tubigon with excellent facilities",
    address: "Tubigon Town Center, Bohol, Philippines",
    type: "HOTEL",
    email: "reservations@tubigongrand.com",
    phone: "+63382345678",
    website: "https://www.tubigongrand.com",
    facebook: "https://facebook.com/tubigongrand",
    imageUrl_1:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    imageUrl_2:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "3",
    name: "Paradise Bay Resort",
    description:
      "Eco-friendly resort surrounded by lush tropical gardens and pristine beaches",
    address: "Anda, Bohol, Philippines",
    type: "RESORT",
    email: "bookings@paradisebay.com",
    phone: "+63382765432",
    website: "https://www.paradisebaybohol.com",
    facebook: "https://facebook.com/paradisebaybohol",
    imageUrl_1:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    imageUrl_2:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "4",
    name: "Budget Inn Tubigon",
    description:
      "Clean and comfortable budget accommodation perfect for backpackers",
    address: "Tubigon Port Area, Bohol, Philippines",
    type: "HOTEL",
    email: "stay@budgetinntubigon.com",
    phone: "+63382123456",
    website: null,
    facebook: "https://facebook.com/budgetinntubigon",
    imageUrl_1:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "5",
    name: "Seaside Boutique Hotel",
    description:
      "Intimate boutique hotel with personalized service and unique design",
    address: "Panglao Beach, Bohol, Philippines",
    type: "HOTEL",
    email: "hello@seasideboutique.com",
    phone: "+63382987654",
    website: "https://www.seasideboutique.com",
    facebook: "https://facebook.com/seasideboutique",
    imageUrl_1:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    imageUrl_2:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
];

const GuestHotelPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const hotelTypes = ["All", "HOTEL", "RESORT", "GUESTHOUSE"];

  const filteredHotels = mockHotels.filter((hotel) => {
    const matchesType = selectedType === "All" || hotel.type === selectedType;
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hotel.address &&
        hotel.address.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
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

  const getImageCount = (hotel) => {
    let count = 0;
    if (hotel.imageUrl_1) count++;
    if (hotel.imageUrl_2) count++;
    if (hotel.imageUrl_3) count++;
    if (hotel.imageUrl_4) count++;
    if (hotel.imageUrl_5) count++;
    return count;
  };

  const getImageUrls = (hotel) => {
    const urls = [];
    if (hotel.imageUrl_1) urls.push(hotel.imageUrl_1);
    if (hotel.imageUrl_2) urls.push(hotel.imageUrl_2);
    if (hotel.imageUrl_3) urls.push(hotel.imageUrl_3);
    if (hotel.imageUrl_4) urls.push(hotel.imageUrl_4);
    if (hotel.imageUrl_5) urls.push(hotel.imageUrl_5);
    return urls;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header Section */}
      <div
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-16"
        style={{
          animation: "slide-in-from-top-5 0.8s ease-out both",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building className="w-12 h-12 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Hotels in <span className="text-yellow-300">Tubigon</span>
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find the perfect place to stay in beautiful Bohol
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
          <div className="flex flex-col space-y-4">
            {/* Top Row - Search and Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hotels..."
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
              {/* Type Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
                {hotelTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      selectedType === type
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                        : "bg-white/50 text-gray-600 hover:bg-white/70"
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div
          className="mb-6 flex items-center justify-between "
          style={{
            animation: "fade-in 0.5s ease-out 0.4s both",
          }}
        >
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredHotels.length}
            </span>{" "}
            hotels
            {selectedType !== "All" && (
              <span>
                {" "}
                of type{" "}
                <span className="font-semibold text-teal-600">
                  {selectedType}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Hotels Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.5 + index * 0.1
                  }s both`,
                }}
              >
                {/* Image Gallery */}
                <div className="relative h-56 overflow-hidden">
                  {hotel.imageUrl_1 ? (
                    <img
                      src={hotel.imageUrl_1}
                      alt={hotel.name}
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

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(hotel.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 ${
                        favorites.has(hotel.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(hotel.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                      <Share2 className="w-4 h-4" />
                    </button>
                    {getImageCount(hotel) > 1 && (
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Image Count */}
                  {getImageCount(hotel) > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                      <Camera className="w-3 h-3" />
                      <span>{getImageCount(hotel)} photos</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.address}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hotel.type === "RESORT"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {hotel.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.phone && (
                      <a
                        href={`tel:${hotel.phone}`}
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    )}
                    {hotel.email && (
                      <a
                        href={`mailto:${hotel.email}`}
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                      >
                        <span>Email</span>
                      </a>
                    )}
                    {hotel.website && (
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                      >
                        <span>Website</span>
                      </a>
                    )}
                    {hotel.facebook && (
                      <a
                        href={hotel.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                      >
                        <span>Facebook</span>
                      </a>
                    )}
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
            {filteredHotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.5 + index * 0.1
                  }s both`,
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full lg:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                    {hotel.imageUrl_1 ? (
                      <img
                        src={hotel.imageUrl_1}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    {getImageCount(hotel) > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                        <Camera className="w-3 h-3" />
                        <span>{getImageCount(hotel)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{hotel.address}</span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          hotel.type === "RESORT"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {hotel.type}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {hotel.phone && (
                        <a
                          href={`tel:${hotel.phone}`}
                          className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </a>
                      )}
                      {hotel.email && (
                        <a
                          href={`mailto:${hotel.email}`}
                          className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600"
                        >
                          <span>Email</span>
                        </a>
                      )}
                      {hotel.website && (
                        <a
                          href={hotel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600"
                        >
                          <span>Website</span>
                        </a>
                      )}
                      {hotel.facebook && (
                        <a
                          href={hotel.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600"
                        >
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {getImageUrls(hotel).length > 1 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            {getImageUrls(hotel).length} photos available
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(hotel.id);
                          }}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            favorites.has(hotel.id)
                              ? "bg-red-100 text-red-500"
                              : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.has(hotel.id) ? "fill-current" : ""
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
        {filteredHotels.length === 0 && (
          <div
            className="text-center py-12"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No hotels found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("All");
              }}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Quick Contact Section */}
        <div
          className="mt-12 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-md border border-white/40 rounded-2xl p-8"
          style={{
            animation: "fadeInUp 0.6s ease-out both",
          }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Need Help Booking?
            </h2>
            <p className="text-gray-600">
              Contact our local experts for assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Group Inquiries
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Special arrangements for groups
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHotelPage;
