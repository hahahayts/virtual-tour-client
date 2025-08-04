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
  Calendar,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Fetching } from "./components/view/fetching";
import { ErrorView } from "./components/view/error-view";

const AccommodationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => fetchDataById(id, "accommodations"),
    enabled: !!id,
  });

  const getTypeColor = (type) => {
    const colors = {
      HOTEL: "bg-blue-100 text-blue-800",
      INN: "bg-green-100 text-green-800",
      RESORT: "bg-purple-100 text-purple-800",
      APARTMENT: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getTypeIcon = (type) => {
    const icons = {
      HOTEL: "🏨",
      INN: "🏠",
      RESORT: "🌴",
      APARTMENT: "🏢",
    };
    return icons[type] || "🏨";
  };

  if (isFetching) {
    return <Fetching />;
  }

  if (error) {
    return <ErrorView />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Accommodation Not Found
          </h2>
          <p className="text-gray-600">
            The accommodation you're looking for doesn't exist.
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

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                  <div class="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="text-8xl mb-4">${getTypeIcon(data.type)}</div>
                      <p class="text-xl opacity-80">Image failed to load</p>
                      <p class="text-sm opacity-60 mt-2">URL: ${
                        images[currentImageIndex]
                      }</p>
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
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">{getTypeIcon(data.type)}</div>
              <p className="text-xl opacity-80">No images available</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                  data.type
                )} bg-white/90 backdrop-blur-sm`}
              >
                {getTypeIcon(data.type)} {data.type}
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
                About This {data.type.toLowerCase()}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {data.description ||
                  "No description available for this accommodation."}
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
                          ? "border-blue-500"
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
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Current
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {data.videoUrl && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Virtual Tour
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={data.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={`${data.name} Virtual Tour`}
                  ></iframe>
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Wifi className="text-blue-600" size={20} />
                  <span className="text-gray-700">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="text-blue-600" size={20} />
                  <span className="text-gray-700">Parking</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Coffee className="text-blue-600" size={20} />
                  <span className="text-gray-700">Breakfast</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Utensils className="text-blue-600" size={20} />
                  <span className="text-gray-700">Restaurant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Phone
                      className="text-blue-600 group-hover:text-blue-700"
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
                      className="text-blue-600 group-hover:text-blue-700"
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
                      className="text-blue-600 group-hover:text-blue-700"
                      size={20}
                    />
                    <span className="text-gray-700 group-hover:text-gray-800">
                      Visit Website
                    </span>
                  </a>
                )}
                {data.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Facebook
                      className="text-blue-600 group-hover:text-blue-700"
                      size={20}
                    />
                    <span className="text-gray-700 group-hover:text-gray-800">
                      Facebook Page
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Location */}
            {data.latitude && data.longitude && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Location
                </h3>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2" />
                      <p>Map View</p>
                      <p className="text-sm">
                        {data.latitude}, {data.longitude}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-sm p-6 text-white animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
                <Star className="text-yellow-300" size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
              <p className="mb-4 opacity-90">
                Experience the comfort and hospitality of {data.name}
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Check Availability
              </button>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Details</h3>
              <div className="space-y-3 text-sm text-gray-600">
                {data.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Listed: {formatDate(data.createdAt)}</span>
                  </div>
                )}
                {data.updatedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Updated: {formatDate(data.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationView;
