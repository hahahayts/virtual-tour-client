import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  Clock,
  Phone,
  Heart,
  ChefHat,
  Utensils,
  Coffee,
} from "lucide-react";

// Types
type Restaurant = {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  address: string;
  phone: string;
  hours: string;
  priceRange: string;
  popular: boolean;
  specialties: string[];
};

const GuestRestaurantPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading] = useState(false);

  // Sample restaurant data for Tubigon
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Seaside Grill & Bar",
      category: "Seafood",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      description:
        "Fresh seafood with stunning ocean views. Specializing in local catch and traditional Filipino dishes.",
      address: "Barangay Poblacion, Tubigon",
      phone: "+63 38 515 1234",
      hours: "10:00 AM - 10:00 PM",
      priceRange: "₱₱₱",
      popular: true,
      specialties: ["Grilled Fish", "Seafood Platter", "Bohol Specialty"],
    },
    {
      id: 2,
      name: "Tubigon Heritage Café",
      category: "Cafe",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      description:
        "Cozy café serving local coffee and traditional pastries in a heritage building.",
      address: "Town Center, Tubigon",
      phone: "+63 38 515 5678",
      hours: "6:00 AM - 9:00 PM",
      priceRange: "₱₱",
      popular: false,
      specialties: ["Bohol Coffee", "Kakanin", "Local Pastries"],
    },
    {
      id: 3,
      name: "Mangrove View Restaurant",
      category: "Filipino",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      description:
        "Authentic Filipino cuisine with panoramic mangrove views. Family-owned since 1985.",
      address: "Mangrove Area, Tubigon",
      phone: "+63 38 515 9012",
      hours: "11:00 AM - 9:00 PM",
      priceRange: "₱₱",
      popular: true,
      specialties: ["Lechon", "Adobo", "Fresh Vegetables"],
    },
    {
      id: 4,
      name: "Island Breeze Bistro",
      category: "International",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      rating: 4.5,
      reviews: 67,
      description:
        "Modern bistro offering international cuisine with local ingredients and creative presentations.",
      address: "Marina District, Tubigon",
      phone: "+63 38 515 3456",
      hours: "5:00 PM - 11:00 PM",
      priceRange: "₱₱₱₱",
      popular: false,
      specialties: ["Fusion Dishes", "Craft Cocktails", "Desserts"],
    },
    {
      id: 5,
      name: "Lola's Kitchen",
      category: "Filipino",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 203,
      description:
        "Home-style Filipino cooking passed down through generations. Known for authentic flavors.",
      address: "Barangay San Vicente, Tubigon",
      phone: "+63 38 515 7890",
      hours: "7:00 AM - 8:00 PM",
      priceRange: "₱",
      popular: true,
      specialties: ["Sinigang", "Kare-kare", "Pinakbet"],
    },
    {
      id: 6,
      name: "Coconut Grove Resto",
      category: "Seafood",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      rating: 4.4,
      reviews: 91,
      description:
        "Tropical dining experience surrounded by coconut palms. Fresh seafood and tropical drinks.",
      address: "Coastal Road, Tubigon",
      phone: "+63 38 515 2468",
      hours: "9:00 AM - 10:00 PM",
      priceRange: "₱₱₱",
      popular: false,
      specialties: ["Coconut Crab", "Tropical Drinks", "Beach BBQ"],
    },
  ];

  const categories = ["All", "Seafood", "Filipino", "Cafe", "International"];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || restaurant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const RestaurantCard = ({
    restaurant,
    isListView = false,
  }: {
    restaurant: Restaurant;
    isListView?: boolean;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
        isListView ? "flex" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative ${isListView ? "w-1/3 h-48" : "w-full h-48"}`}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.popular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Popular
          </div>
        )}
        <button
          onClick={() => toggleFavorite(restaurant.id)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            favorites.has(restaurant.id)
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-700"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              favorites.has(restaurant.id) ? "fill-current" : ""
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className={`p-4 ${isListView ? "w-2/3" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{restaurant.name}</h3>
          <span className="text-sm font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({restaurant.reviews} reviews)
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {restaurant.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {restaurant.description}
        </p>

        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.hours}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{restaurant.phone}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {restaurant.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Restaurants in Tubigon</h1>
          <p className="text-xl opacity-90">
            Discover the best dining experiences in Bohol
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="border rounded-lg px-4 py-2 w-full md:w-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-gray-500"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "text-gray-500"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
            found
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </h2>
        </div>

        {/* Restaurants Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isListView
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search filters
            </p>
            <button
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GuestRestaurantPage;
