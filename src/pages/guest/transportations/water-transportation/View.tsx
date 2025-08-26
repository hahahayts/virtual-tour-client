import { fetchDataById } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  Clock,
  Calendar,
  Star,
  Ship,
  Waves,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Users,
  Ticket,
  CreditCard,
  Shield,
  RefreshCw,
  DollarSign,
  Info,
  Image as ImageIcon,
  Circle,
  AlertCircle,
} from "lucide-react";
import { formatDuration } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";

const WaterTransportationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["water-transportation", id],
    queryFn: () => fetchDataById(id, "water-transportations"),
    enabled: !!id,
  });

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
          <div className="text-6xl mb-4">🌊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the water transportation details.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🚢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Water Transportation Not Found
          </h2>
          <p className="text-gray-600">
            The water transportation service you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const images = [data.imageUrl_1, data.imageUrl_2, data.imageUrl_3].filter(
    Boolean
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatDays = (days: string[]) => {
    if (!days || days.length === 0) return "Daily";
    return days.join(", ");
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
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-teal-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🚢</div>
              <p className="text-xl opacity-80">No images available</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800  backdrop-blur-sm flex items-center gap-1">
                <Ship size={16} /> Water Transportation
              </span>
              {images.length > 1 && (
                <span className="px-3 py-1 rounded-full text-sm bg-black/30 backdrop-blur-sm flex items-center gap-1">
                  <Info size={16} /> {currentImageIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {data.name}
            </h1>
            {data.expected_fee && (
              <div className="flex items-center gap-2 text-lg opacity-90 drop-shadow-md">
                <Ticket size={20} />
                <span>From ${data.expected_fee}</span>
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
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  About This Service
                </h2>
              </div>
              <div className="text-gray-600 leading-relaxed text-lg">
                {data.description ? (
                  <MDEditor.Markdown
                    source={data.description}
                    style={{ background: "transparent", color: "inherit" }}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <AlertCircle size={18} />
                    <p>No description available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            {images.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="text-blue-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Photo Gallery
                  </h2>
                </div>
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
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          <Circle fill="white" size={12} /> Current
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Schedule Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="text-gray-600 mb-1">Departure Days:</p>
                      <p className="font-medium">
                        {formatDays(data.departure_days)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="text-gray-600 mb-1">Departure Time:</p>
                      <p className="font-medium">
                        {data.departure_time || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
                {data.duration && (
                  <div className="flex items-start gap-3">
                    <Waves className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="text-gray-600 mb-1">Duration:</p>
                      <p className="font-medium">
                        {formatDuration(data.duration)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Policies</h2>
              </div>
              <div className="space-y-6">
                {data.guidelines_and_policies && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="text-blue-600" size={20} />
                      <h3 className="font-medium text-lg">
                        Guidelines & Policies
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {data.guidelines_and_policies}
                    </p>
                  </div>
                )}
                {data.rebooking_supercharges && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="text-blue-600" size={20} />
                      <h3 className="font-medium text-lg">Rebooking Policy</h3>
                    </div>
                    <p className="text-gray-600">
                      {data.rebooking_supercharges}
                    </p>
                  </div>
                )}
                {data.refund_policy && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="text-blue-600" size={20} />
                      <h3 className="font-medium text-lg">Refund Policy</h3>
                    </div>
                    <p className="text-gray-600">{data.refund_policy}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">
                  Pricing Information
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-600" size={18} />
                    <span className="text-gray-700">Expected Fee:</span>
                  </div>
                  <span className="font-medium flex items-center gap-1">
                    <DollarSign size={16} />
                    {data.expected_fee || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking CTA */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-teal-700 rounded-xl shadow-sm p-6 text-white animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="text-yellow-300" size={20} />
                ))}
                <Star className="text-yellow-300/50" size={20} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="text-white" size={24} />
                <h3 className="text-xl font-bold">Ready to Book?</h3>
              </div>
              <p className="mb-4 opacity-90 flex items-center gap-2">
                <Ship size={18} /> Reserve your water transportation today
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <CreditCard size={18} /> Book Now
              </button>
            </div> */}

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">
                  Additional Information
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                {data.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      Listed: {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {data.updatedAt && (
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} />
                    <span>
                      Updated: {new Date(data.updatedAt).toLocaleDateString()}
                    </span>
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

export default WaterTransportationView;
