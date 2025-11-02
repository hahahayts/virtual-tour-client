import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

// --- Type Imports ---
import { fetchDataById } from "@/db";
import { useMetadata } from "@/hooks/use-metadata";
import { Pending } from "@/components/guest/pending";
import { Error } from "@/components/guest/error";
import ThreeSixtyViewer from "@/components/three-sixty-image";

// --- Icon Imports ---
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  Facebook,
  Image as ImageIcon,
  Rotate3d,
  MapPin,
  Route,
  Video,
} from "lucide-react";
import type { Destination, MediaType } from "./types";
import { ImageGalleryItem } from "./components/image-gallery";
import { InfoPill } from "./components/info-fill";
import { MediaControlButton } from "./components/media-control-button";
import { ViewHeader } from "./components/header";
import { MapNavigation } from "@/components/map-navigation";
import ReactMarkdown from "react-markdown";
import { RatingForm } from "./components/rating-form";
import { RatingsPreview } from "./components/rating-preview";
import { VideoPlayer } from "./components/video-player";

// --- Main Component ---
const DestinationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State with proper typing
  const [activeMediaType, setActiveMediaType] = useState<MediaType>("gallery");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  // Query with proper error handling
  const { data, isFetching, isError } = useQuery({
    queryKey: ["destination", id] as const,
    queryFn: (): Promise<Destination> => fetchDataById(id, "destinations"),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const destination: Destination | undefined = data;

  // Enhanced metadata
  useMetadata({
    title: destination?.name
      ? `${destination.name} | Discover Amazing Destinations`
      : "Discover Your Next Adventure",
    description:
      destination?.description ||
      "Explore breathtaking destinations and plan your next unforgettable journey with detailed information, stunning photos, and 360° views.",
  });

  // Memoized images array with proper filtering
  const images = useMemo((): string[] => {
    if (!destination) return [];
    return [
      destination.imageUrl_1,
      destination.imageUrl_2,
      destination.imageUrl_3,
      destination.imageUrl_4,
      destination.imageUrl_5,
    ].filter((url): url is string => Boolean(url?.trim()));
  }, [destination]);

  // Enhanced media type selection logic
  useEffect(() => {
    if (!isFetching && destination) {
      if (images.length > 0) {
        setActiveMediaType("gallery");
      } else if (destination.three_sixty_imageUrl) {
        setActiveMediaType("360");
      }
    }
  }, [isFetching, images.length, destination]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (activeMediaType === "gallery" && images.length > 1) {
        if (event.key === "ArrowLeft") {
          setActiveImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          );
        } else if (event.key === "ArrowRight") {
          setActiveImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeMediaType, images.length]);

  // Event handlers
  const handleBackClick = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  const handleShare = useCallback((): void => {
    // Analytics or other side effects could go here
    console.log("Destination shared:", destination?.name);
  }, [destination?.name]);

  const handleImageClick = useCallback((index: number): void => {
    setActiveMediaType("gallery");
    setActiveImageIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMediaTypeChange = useCallback((type: MediaType): void => {
    setActiveMediaType(type);
  }, []);

  // Loading state
  if (isFetching) {
    return <Pending />;
  }

  // Error state
  if (isError || !destination) {
    return <Error name="Destination" />;
  }

  const hasContactInfo = Boolean(
    destination.email ||
      destination.phone ||
      destination.website ||
      destination.facebook
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 font-sans">
      {/* Enhanced Header */}
      <ViewHeader
        handleBackClick={handleBackClick}
        handleShare={handleShare}
        name={destination.name}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Media Viewer */}
        <section
          className="relative mb-12 animate-in slide-in-from-top-5 duration-300"
          style={{ animationDelay: "100ms" }}
        >
          <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative">
            {activeMediaType === "gallery" && images.length > 0 && (
              <>
                <img
                  src={images[activeImageIndex]}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  onLoad={() => setIsImageLoading(false)}
                  onLoadStart={() => setIsImageLoading(true)}
                />
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-500">Loading...</div>
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}
              </>
            )}

            {activeMediaType === "360" && destination.three_sixty_imageUrl && (
              <ThreeSixtyViewer imageUrl={destination.three_sixty_imageUrl} />
            )}

            {activeMediaType === "video" && destination.videoUrl && (
              <VideoPlayer link={destination.videoUrl} className="h-full" />
            )}
          </div>

          {/* Enhanced Media Controls */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20">
            {destination.three_sixty_imageUrl && (
              <MediaControlButton
                isActive={activeMediaType === "360"}
                onClick={() => handleMediaTypeChange("360")}
                icon={Rotate3d}
                label="360° View"
              />
            )}
            {images.length > 0 && (
              <MediaControlButton
                isActive={activeMediaType === "gallery"}
                onClick={() => handleMediaTypeChange("gallery")}
                icon={ImageIcon}
                label={`Gallery (${images.length})`}
              />
            )}
            {destination.videoUrl && (
              <MediaControlButton
                isActive={activeMediaType === "video"}
                onClick={() => handleMediaTypeChange("video")}
                icon={Video}
                label="Video"
              />
            )}
          </div>

          {/* Image Counter */}
          {activeMediaType === "gallery" && images.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 bg-black/50 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium animate-in slide-in-from-top-5 duration-300">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}
        </section>

        {/* Enhanced Destination Details */}
        <section
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-200/50 animate-in slide-in-from-top-5 duration-300"
          style={{ animationDelay: "200ms" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Enhanced Left Column */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <div
                className="animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "300ms" }}
              >
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 leading-tight">
                  {destination.name}
                </h1>
              </div>

              <div
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "400ms" }}
              >
                <div className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  <ReactMarkdown>{destination.description}</ReactMarkdown>
                </div>
              </div>

              {/* Transportation Information - Full Width on Mobile */}
              {destination.transpo_info && (
                <div
                  className="lg:hidden bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 sm:p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                  style={{ animationDelay: "450ms" }}
                >
                  <h3 className="font-semibold text-lg sm:text-xl text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Getting There
                  </h3>
                  <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
                    <ReactMarkdown>{destination.transpo_info}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Location Card */}
              <div
                className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200/50 rounded-2xl p-4 sm:p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "500ms" }}
              >
                <h3 className="font-semibold text-lg sm:text-xl text-sky-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h3>
                {destination.address && (
                  <p className="text-gray-700 font-medium mb-4 text-sm sm:text-base leading-relaxed">
                    {destination.address}
                  </p>
                )}

                {/* Map Integration */}
                {destination.latitude && destination.longitude && (
                  <div className="mt-4 sm:mt-6">
                    <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg overflow-hidden shadow">
                      <MapNavigation
                        destination={{
                          latitude: destination.latitude,
                          longitude: destination.longitude,
                          name: destination.name,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Transportation Information - Sidebar on Desktop */}
              {destination.transpo_info && (
                <div
                  className="hidden lg:block bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                  style={{ animationDelay: "550ms" }}
                >
                  <h3 className="font-semibold text-xl text-green-900 mb-4 flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Getting There
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown>{destination.transpo_info}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Contact Card */}
              {hasContactInfo && (
                <div
                  className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                  style={{ animationDelay: "600ms" }}
                >
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-3 sm:mb-4">
                    Contact & Links
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {destination.email && (
                      <InfoPill
                        icon={Mail}
                        text="Email"
                        href={`mailto:${destination.email}`}
                      />
                    )}
                    {destination.phone && (
                      <InfoPill
                        icon={Phone}
                        text="Call"
                        href={`tel:${destination.phone}`}
                      />
                    )}
                    {destination.website && (
                      <InfoPill
                        icon={Globe}
                        text="Website"
                        href={destination.website}
                      />
                    )}
                    {destination.facebook && (
                      <InfoPill
                        icon={Facebook}
                        text="Facebook"
                        href={destination.facebook}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ratings Preview Section */}
        <RatingsPreview destinationId={destination.id} />

        {/* Rating Form Section */}
        <RatingForm destinationId={destination.id} />

        {/* Enhanced Image Gallery */}
        {images.length > 1 && (
          <section
            className="mt-12 sm:mt-16 animate-in slide-in-from-top-5 duration-300"
            style={{ animationDelay: "700ms" }}
          >
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                Explore in Pictures
              </h2>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
                Click any photo to view it in the main viewer above, or use
                arrow keys to navigate through the gallery.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {images.map((image, index) => (
                <ImageGalleryItem
                  key={`${image}-${index}`}
                  image={image}
                  index={index}
                  destinationName={destination.name}
                  isActive={
                    index === activeImageIndex && activeMediaType === "gallery"
                  }
                  onClick={() => handleImageClick(index)}
                  priority={index === 0}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DestinationView;
