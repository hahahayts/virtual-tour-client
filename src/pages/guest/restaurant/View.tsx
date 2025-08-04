import { fetchDataById } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Clock,
  Star,
  Wifi,
  Utensils,
  Wine,
  Coffee,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const RestaurantView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchDataById(id, "restaurants"),
    enabled: !!id,
  });

  const getCuisineColor = (cuisine) => {
    const colors = {
      ITALIAN: "bg-green-100 text-green-800",
      MEXICAN: "bg-red-100 text-red-800",
      JAPANESE: "bg-blue-100 text-blue-800",
      CHINESE: "bg-yellow-100 text-yellow-800",
      INDIAN: "bg-orange-100 text-orange-800",
      AMERICAN: "bg-purple-100 text-purple-800",
    };
    return colors[cuisine] || "bg-gray-100 text-gray-800";
  };

  const getCuisineIcon = (cuisine) => {
    const icons = {
      ITALIAN: "🍝",
      MEXICAN: "🌮",
      JAPANESE: "🍣",
      CHINESE: "🥡",
      INDIAN: "🍛",
      AMERICAN: "🍔",
    };
    return icons[cuisine] || "🍴";
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 animate-in fade-in duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-40 bg-gray-300 rounded"></div>
              </div>
              <div className="h-40 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the restaurant details.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Restaurant Not Found
          </h2>
          <p className="text-gray-600">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const images = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
    data.imageUrl_4,
    data.imageUrl_5,
  ].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatHours = (hours: number) => {
    if (!hours) return "Hours not specified";
    return hours;
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden animate-in slide-in-from-top-5 duration-300">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors z-20 flex items-center gap-2"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline text-sm font-medium">Back</span>
        </button>

        {images.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={images[currentImageIndex]}
              alt={`${data.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
              onError={(e) => {
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-r from-red-600 to-orange-700 flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="text-8xl mb-4">${getCuisineIcon(
                        data.cuisineType
                      )}</div>
                      <p class="text-xl opacity-80">Image failed to load</p>
                    </div>
                  </div>
                `;
              }}
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-red-600 to-orange-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">
                {getCuisineIcon(data.cuisineType)}
              </div>
              <p className="text-xl opacity-80">No images available</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getCuisineColor(
                  data.cuisineType
                )} bg-white/90 backdrop-blur-sm`}
              >
                {getCuisineIcon(data.cuisineType)} {data.cuisineType}
              </span>
              {images.length > 1 && (
                <span className="px-3 py-1 rounded-full text-sm bg-black/30 backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {data.name}
            </h1>
            {data.address && (
              <div className="flex items-center gap-2 text-lg opacity-90 drop-shadow-md">
                <MapPin size={20} />
                <span>{data.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Restaurant
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {data.description ||
                  "No description available for this restaurant."}
              </p>
            </div>

            {/* Image Gallery */}
            {images.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-red-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => goToImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${data.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Current
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Menu */}
            {data.menuUrl && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <a
                    href={data.menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center p-6"
                  >
                    <Utensils size={48} className="mx-auto mb-4 text-red-500" />
                    <p className="text-lg font-medium">View Full Menu</p>
                    <p className="text-sm text-gray-500 mt-1">(PDF Document)</p>
                  </a>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.hasWifi && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Wifi className="text-red-600" size={20} />
                    <span className="text-gray-700">Free WiFi</span>
                  </div>
                )}
                {data.hasOutdoorSeating && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Utensils className="text-red-600" size={20} />
                    <span className="text-gray-700">Outdoor Seating</span>
                  </div>
                )}
                {data.hasAlcohol && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Wine className="text-red-600" size={20} />
                    <span className="text-gray-700">Alcohol Served</span>
                  </div>
                )}
                {data.hasCoffee && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Coffee className="text-red-600" size={20} />
                    <span className="text-gray-700">Coffee</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Contact & Hours
              </h3>
              <div className="space-y-4">
                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Phone
                      className="text-red-600 group-hover:text-red-700"
                      size={20}
                    />
                    <span className="text-gray-700 group-hover:text-gray-800">
                      {data.phone}
                    </span>
                  </a>
                )}
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Mail
                      className="text-red-600 group-hover:text-red-700"
                      size={20}
                    />
                    <span className="text-gray-700 group-hover:text-gray-800">
                      {data.email}
                    </span>
                  </a>
                )}
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Globe
                      className="text-red-600 group-hover:text-red-700"
                      size={20}
                    />
                    <span className="text-gray-700 group-hover:text-gray-800">
                      Visit Website
                    </span>
                  </a>
                )}
                {data.hours && (
                  <div className="flex items-start gap-3 p-3 rounded-lg">
                    <Clock className="text-red-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">Hours</p>
                      <p className="text-gray-600">{formatHours(data.hours)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {(data.facebook || data.instagram) && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Social Media
                </h3>
                <div className="space-y-3">
                  {data.facebook && (
                    <a
                      href={data.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Facebook
                        className="text-red-600 group-hover:text-red-700"
                        size={20}
                      />
                      <span className="text-gray-700 group-hover:text-gray-800">
                        Facebook
                      </span>
                    </a>
                  )}
                  {data.instagram && (
                    <a
                      href={data.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <Instagram
                        className="text-red-600 group-hover:text-red-700"
                        size={20}
                      />
                      <span className="text-gray-700 group-hover:text-gray-800">
                        Instagram
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Rating CTA */}
            <div className="bg-gradient-to-r from-red-600 to-orange-700 rounded-xl shadow-sm p-6 text-white animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300/50" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Meal!</h3>
              <p className="mb-4 opacity-90">
                Share your experience at {data.name}
              </p>
              <button className="w-full bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Leave a Review
              </button>
            </div>

            {/* Dietary Options */}
            {data.dietaryOptions && data.dietaryOptions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Dietary Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.dietaryOptions.map((option) => (
                    <span
                      key={option}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
