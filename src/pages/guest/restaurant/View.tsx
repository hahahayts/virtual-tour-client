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
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { MapNavigation } from "@/components/map-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RestaurantType } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { GetDirectionsButton } from "../destinations/components/get-direction";

const RestaurantView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isFetching, error } = useQuery<RestaurantType>({
    queryKey: ["restaurant", id],
    queryFn: () => fetchDataById(id, "restaurants"),
    enabled: !!id,
  });

  const images = [
    data?.imageUrl_1,
    data?.imageUrl_2,
    data?.imageUrl_3,
    data?.imageUrl_4,
    data?.imageUrl_5,
  ].filter((url): url is string => !!url);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
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
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-gray-600">
              The restaurant you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                const target = e.target as HTMLImageElement;
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-r from-red-600 to-orange-700 flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="text-8xl mb-4">🍽️</div>
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
              <div className="text-8xl mb-4">🍽️</div>
              <p className="text-xl opacity-80">No images available</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
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
            {/* Description Card */}
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">
                  About This Restaurant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-600">
                  <ReactMarkdown>{data.description}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery Card */}
            {images.length > 1 && (
              <Card className="animate-in fade-in duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 text-gray-700 text-sm sm:text-base">
                  {data.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-600" />
                      <span>{data.email}</span>
                    </div>
                  )}

                  {data.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-600" />
                      <span>{data.phone}</span>
                    </div>
                  )}

                  {data.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-600" />
                      <span>{data.website}</span>
                    </div>
                  )}

                  {data.facebook && (
                    <div className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-sky-600" />
                      <span>{data.facebook}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            {data.latitude && data.longitude && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 relative">
                      <MapNavigation
                        destination={{
                          latitude: data.latitude,
                          longitude: data.longitude,
                          name: data.name,
                        }}
                      />
                    </div>
                    {/* <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                    >
                      <Route className="h-4 w-4 sm:h-5 sm:w-5" />
                      Get Directions
                    </a> */}
                    <GetDirectionsButton destination={data} />
                    {data.address && (
                      <p className="text-gray-600 flex items-start gap-2 text-sm">
                        <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                        <span>{data.address}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media Card */}
            {data.facebook && (
              <Card className="animate-in fade-in duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
