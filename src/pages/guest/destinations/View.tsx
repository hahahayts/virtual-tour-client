import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

// --- Type Imports ---
import { fetchDataById } from "@/db";
import type { DestinationSchema } from "@/schema/destination";
import { useMetadata } from "@/hooks/use-metadata";
import { Pending } from "@/components/guest/pending";
import { Error } from "@/components/guest/error";
import ThreeSixtyViewer from "@/components/three-sixty-image";

// --- Icon Imports ---
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Facebook,
  MapPin,
  ExternalLink,
  Eye,
  Share2,
  Heart,
  Image as ImageIcon,
  Rotate3d,
  Check,
  Star,
  Clock,
  Navigation,
} from "lucide-react";

// --- Enhanced Type Definitions ---
type MediaType = "gallery" | "360";

type Destination = z.infer<typeof DestinationSchema>;

interface InfoPillProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface MediaControlButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface ImageGalleryItemProps {
  image: string;
  index: number;
  destinationName: string;
  isActive: boolean;
  onClick: () => void;
  priority?: boolean;
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

interface ShareButtonProps {
  destinationName: string;
  onShare: () => void;
}

// --- Enhanced Components ---
const InfoPill: React.FC<InfoPillProps> = ({
  icon: Icon,
  text,
  href,
  variant = "secondary",
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      group flex items-center text-sm font-medium rounded-xl px-4 py-2.5 
      border transition-all duration-300 hover:scale-105 hover:shadow-lg
      animate-in slide-in-from-top-5 duration-300
      ${
        variant === "primary"
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 hover:from-sky-600 hover:to-blue-700"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
      }
    `}
  >
    <Icon
      className={`w-4 h-4 mr-2 transition-transform group-hover:scale-110 ${
        variant === "primary" ? "text-sky-100" : "text-sky-600"
      }`}
    />
    <span>{text}</span>
    <ExternalLink
      className={`w-3 h-3 ml-2 opacity-60 ${
        variant === "primary" ? "text-sky-100" : "text-gray-500"
      }`}
    />
  </a>
);

const MediaControlButton: React.FC<MediaControlButtonProps> = ({
  isActive,
  onClick,
  icon: Icon,
  label,
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full 
      transition-all duration-300 border backdrop-blur-sm hover:scale-105
      animate-in slide-in-from-top-5 duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 shadow-lg shadow-sky-500/25"
          : "bg-white/90 text-gray-700 border-gray-300 hover:bg-white hover:shadow-md"
      }
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={`
      p-3 rounded-full transition-all duration-300 border shadow-sm hover:scale-110
      animate-in slide-in-from-top-5 duration-300
      ${
        isFavorite
          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-500 shadow-lg shadow-rose-500/25"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
      }
    `}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    <Heart
      className={`w-5 h-5 transition-transform ${
        isFavorite ? "fill-current scale-110" : ""
      }`}
    />
  </button>
);

const ShareButton: React.FC<ShareButtonProps> = ({
  destinationName,
  onShare,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: destinationName,
          text: `Check out this amazing destination: ${destinationName}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      onShare();
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, [destinationName, onShare]);

  return (
    <button
      onClick={handleShare}
      className="p-3 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm hover:scale-110 animate-in slide-in-from-top-5 duration-300"
      aria-label="Share destination"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <Share2 className="w-5 h-5" />
      )}
    </button>
  );
};

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  image,
  index,
  destinationName,
  isActive,
  onClick,
  priority = false,
}) => (
  <div
    className={`
      relative group cursor-pointer overflow-hidden rounded-xl shadow-md 
      transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
      animate-in slide-in-from-top-5 duration-300
      ${priority ? "col-span-2 row-span-2" : ""}
      ${isActive ? "ring-4 ring-offset-2 ring-sky-500 shadow-2xl" : ""}
    `}
    onClick={onClick}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <img
      src={image}
      alt={`${destinationName} view ${index + 1}`}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading={priority ? "eager" : "lazy"}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
        <Eye className="w-6 h-6 text-white" />
      </div>
    </div>
    {priority && (
      <div className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        Featured
      </div>
    )}
  </div>
);

// --- Main Component ---
const DestinationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State with proper typing
  const [activeMediaType, setActiveMediaType] = useState<MediaType>("gallery");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  // Query with proper error handling
  const { data, isFetching, error, isError } = useQuery({
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

  const handleFavoriteToggle = useCallback((): void => {
    setIsFavorite((prev) => !prev);
    // Here you could also save to localStorage or make an API call
  }, []);

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

  const hasLocationInfo = Boolean(
    destination.latitude && destination.longitude
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 font-sans">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm animate-in slide-in-from-top-5 duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="group flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-sky-600 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Destinations</span>
            </button>

            <div className="flex items-center space-x-3">
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={handleFavoriteToggle}
              />
              <ShareButton
                destinationName={destination.name}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Media Viewer */}
        <section
          className="relative mb-12 animate-in slide-in-from-top-5 duration-300"
          style={{ animationDelay: "100ms" }}
        >
          <div className="w-full h-[70vh] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}

            {activeMediaType === "360" && destination.three_sixty_imageUrl && (
              <ThreeSixtyViewer imageUrl={destination.three_sixty_imageUrl} />
            )}
          </div>

          {/* Enhanced Media Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
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
          </div>

          {/* Image Counter */}
          {activeMediaType === "gallery" && images.length > 1 && (
            <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium animate-in slide-in-from-top-5 duration-300">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}
        </section>

        {/* Enhanced Destination Details */}
        <section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-gray-200/50 animate-in slide-in-from-top-5 duration-300"
          style={{ animationDelay: "200ms" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Enhanced Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div
                className="animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "300ms" }}
              >
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 leading-tight">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">4.8 (124 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Updated recently</span>
                  </div>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "400ms" }}
              >
                <p className="text-gray-600 text-lg leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>

            {/* Enhanced Right Column */}
            <div className="space-y-6">
              {/* Location Card */}
              <div
                className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200/50 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: "500ms" }}
              >
                <h3 className="font-semibold text-xl text-sky-900 mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Location & Address
                </h3>
                <p className="text-gray-700 font-medium mb-4 leading-relaxed">
                  {destination.address}
                </p>
                {hasLocationInfo && (
                  <InfoPill
                    icon={MapPin}
                    text="View on Google Maps"
                    href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                    variant="primary"
                  />
                )}
              </div>

              {/* Contact Card */}
              {hasContactInfo && (
                <div
                  className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200/50 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-5 duration-300"
                  style={{ animationDelay: "600ms" }}
                >
                  <h3 className="font-semibold text-xl text-gray-800 mb-4">
                    Contact & Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
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

        {/* Enhanced Image Gallery */}
        {images.length > 1 && (
          <section
            className="mt-16 animate-in slide-in-from-top-5 duration-300"
            style={{ animationDelay: "700ms" }}
          >
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Explore in Pictures
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Click any photo to view it in the main viewer above, or use
                arrow keys to navigate through the gallery.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
