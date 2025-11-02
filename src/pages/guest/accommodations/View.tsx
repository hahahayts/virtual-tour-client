import { fetchDataById } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Fetching } from "./components/view/fetching";
import { ErrorView } from "./components/view/error-view";
import { MapNavigation } from "@/components/map-navigation";
import { getTypeColor, getTypeIcon, type AccommodationData } from "./types";
import { NoData } from "./components/no-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "./components/booking";
import { MetaData } from "./components/meta-data";
import { ContactInfo } from "./components/contact-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AccommodationView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionClamped, setIsDescriptionClamped] = useState(false);

  const { data, isFetching, error } = useQuery<AccommodationData>({
    queryKey: ["accommodation", id],
    queryFn: () => fetchDataById(id, "accommodations"),
    enabled: !!id,
  });

  useEffect(() => {
    if (descriptionRef.current) {
      const isClamped =
        descriptionRef.current.scrollHeight >
        descriptionRef.current.clientHeight;
      setIsDescriptionClamped(isClamped);
    }
  }, [data?.description]);

  if (isFetching) {
    return <Fetching />;
  }

  if (error) {
    return <ErrorView />;
  }

  if (!data) {
    return <NoData />;
  }

  const images = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
    data.imageUrl_4,
    data.imageUrl_5,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] overflow-hidden">
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
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
                    <div class="text-center text-white px-4">
                      <div class="text-4xl sm:text-6xl md:text-8xl mb-2 sm:mb-4">${getTypeIcon(
                        data.type
                      )}</div>
                      <p class="text-sm sm:text-xl opacity-80">Image failed to load</p>
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
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <div className="text-4xl sm:text-6xl md:text-8xl mb-2 sm:mb-4">
                {getTypeIcon(data.type)}
              </div>
              <p className="text-sm sm:text-xl opacity-80">
                No images available
              </p>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getTypeColor(
                  data.type
                )} bg-white/90 backdrop-blur-sm flex items-center gap-1`}
              >
                {getTypeIcon(data.type)}
                <span className="hidden sm:inline">{data.type}</span>
              </span>
              {images.length > 1 && (
                <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-black/30 backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg leading-tight">
              {data.name}
            </h1>
            {data.address && (
              <div className="flex items-start gap-2 text-sm sm:text-base md:text-lg opacity-90 drop-shadow-md">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>{data.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description with read more/less */}
            <Card>
              <CardHeader>
                <CardTitle>About This {data.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  ref={descriptionRef}
                  className={`text-gray-600 leading-relaxed ${
                    !showFullDescription ? "line-clamp-5" : ""
                  }`}
                >
                  {data.description ||
                    "No description available for this accommodation."}
                </div>
                {isDescriptionClamped && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Image Gallery */}
            {images.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            )}

            {/* Video */}
            {data.videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <iframe
                      src={data.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${data.name} Virtual Tour`}
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location - Mobile */}
            {data.latitude && data.longitude && (
              <Card className="lg:hidden">
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 relative">
                    {!isMapLoaded && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <MapNavigation
                      destination={{
                        latitude: data.latitude,
                        longitude: data.longitude,
                        name: data.name,
                      }}
                    />
                    <div className="absolute bottom-4 right-4">
                      <a
                        href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-700" />
                      </a>
                    </div>
                  </div>
                  {data.address && (
                    <p className="text-gray-600 flex items-start gap-2">
                      <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                      <span>{data.address}</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <ContactInfo
              phone={data.phone}
              email={data.email}
              facebook={data.facebook}
              website={data.website}
            />

            {/* Location - Desktop */}
            {data.latitude && data.longitude && (
              <Card className="hidden lg:block">
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 relative">
                    {!isMapLoaded && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <MapNavigation
                      destination={{
                        latitude: data.latitude,
                        longitude: data.longitude,
                        name: data.name,
                      }}
                    />
                    <div className="absolute bottom-4 right-4">
                      <a
                        href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-700" />
                      </a>
                    </div>
                  </div>
                  {data.address && (
                    <p className="text-gray-600 flex items-start gap-2">
                      <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                      <span>{data.address}</span>
                    </p>
                  )}
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Booking CTA */}
            <Booking name={data.name} />

            {/* Metadata */}
            <MetaData createdAt={data.createdAt} updatedAt={data.updatedAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationView;
