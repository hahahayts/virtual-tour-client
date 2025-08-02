import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

// --- (Ensure these imports point to your actual project files) ---
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
  Play,
  ExternalLink,
  Eye,
  Calendar,
  Share2,
  Heart,
  Image as ImageIcon,
  Rotate3d,
} from "lucide-react";

// --- Helper component for Icon with Text ---
const InfoPill = ({ icon: Icon, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300 rounded-lg px-3 py-2 border border-gray-200"
  >
    <Icon className="w-4 h-4 mr-2 text-sky-600" />
    <span className="font-medium">{text}</span>
  </a>
);

const DestinationViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeMediaType, setActiveMediaType] = useState<"gallery" | "360">(
    "gallery"
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, isFetching, error } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => fetchDataById(id, "destinations"),
    enabled: !!id,
  });

  const destination: z.infer<typeof DestinationSchema> | undefined = data;

  useMetadata({
    title: destination?.name
      ? `${destination.name} | Your Adventure Awaits`
      : "Discover Your Next Destination",
    description:
      destination?.description ||
      "Explore beautiful destinations and plan your next unforgettable trip.",
  });

  const images = useMemo(() => {
    if (!destination) return [];
    return [
      destination.imageUrl_1,
      destination.imageUrl_2,
      destination.imageUrl_3,
      destination.imageUrl_4,
      destination.imageUrl_5,
    ].filter((url): url is string => !!url);
  }, [destination]);

  // Set initial media type based on available data
  useEffect(() => {
    if (!isFetching) {
      if (images.length > 0) {
        setActiveMediaType("gallery");
      } else if (destination?.three_sixty_imageUrl) {
        setActiveMediaType("360");
      }
    }
  }, [isFetching, images.length, destination]);

  if (isFetching) {
    return <Pending />;
  }

  if (error || !destination) {
    return <Error name="Destination" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* --- Page Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-sky-600 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Destinations</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2.5 rounded-full transition-all duration-300 border ${
                  isFavorite
                    ? "bg-rose-50 text-rose-500 border-rose-200"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                } shadow-sm`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2.5 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-all duration-300 border border-gray-300 shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Media Viewer Section --- */}
        <section className="relative mb-12">
          <div className="w-full h-[65vh] rounded-2xl shadow-xl overflow-hidden bg-gray-200">
            {activeMediaType === "gallery" && images.length > 0 && (
              <img
                src={images[activeImageIndex]}
                alt={destination.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            )}
            {activeMediaType === "360" && destination.three_sixty_imageUrl && (
              <ThreeSixtyViewer imageUrl={destination.three_sixty_imageUrl} />
            )}
          </div>

          {/* Media Controls */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {destination.three_sixty_imageUrl && (
              <button
                onClick={() => setActiveMediaType("360")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${
                  activeMediaType === "360"
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 border-gray-300 hover:bg-white"
                }`}
              >
                <Rotate3d className="w-5 h-5" /> 360° View
              </button>
            )}
            {images.length > 0 && (
              <button
                onClick={() => setActiveMediaType("gallery")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${
                  activeMediaType === "gallery"
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 border-gray-300 hover:bg-white"
                }`}
              >
                <ImageIcon className="w-5 h-5" /> Gallery
              </button>
            )}
          </div>
        </section>

        {/* --- Destination Details Section --- */}
        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Title & Description */}
            <div className="lg:col-span-2">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                {destination.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Right Column: Key Info */}
            <div className="space-y-4">
              <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4">
                <h3 className="font-semibold text-lg text-sky-800 mb-3">
                  Location & Address
                </h3>
                <p className="text-gray-700 font-medium mb-2">
                  {destination.address}
                </p>
                {destination.latitude && destination.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 font-semibold"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                )}
              </div>

              {(destination.email ||
                destination.phone ||
                destination.website ||
                destination.facebook) && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Contact & Links
                  </h3>
                  <div className="flex flex-wrap gap-2">
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

        {/* --- Image Gallery Grid --- */}
        {images.length > 1 && (
          <section className="mt-12">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800">
                Explore in Pictures
              </h2>
              <p className="text-gray-600 mt-2">
                Click a photo to view it in the main viewer above.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  } ${
                    index === activeImageIndex && activeMediaType === "gallery"
                      ? "ring-4 ring-offset-2 ring-sky-500"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveMediaType("gallery");
                    setActiveImageIndex(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={image}
                    alt={`${destination.name} view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DestinationViewPage;
