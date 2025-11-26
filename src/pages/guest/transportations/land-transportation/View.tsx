import { fetchDataById } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Users,
  Phone,
  RefreshCw,
  Info,
  Image as ImageIcon,
  Circle,
  AlertCircle,
  Building2,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DistanceFee } from "./components/distance-fee";

const LandTransportationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["land-transportation", id],
    queryFn: () => fetchDataById(id, "land-transportations"),
    enabled: !!id,
  });

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 animate-in fade-in duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-gray-300 rounded-xl"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-64 bg-gray-300 rounded-xl"></div>
              <div className="h-64 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardContent className="pt-6">
            <div className="text-6xl mb-4">🚗</div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              We couldn't load the land transportation details.
            </CardDescription>
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              <RefreshCw size={18} /> Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardContent className="pt-6">
            <div className="text-6xl mb-4">🚖</div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              Land Transportation Not Found
            </CardTitle>
            <CardDescription>
              The land transportation service you're looking for doesn't exist.
            </CardDescription>
          </CardContent>
        </Card>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative h-[32rem] overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2.5 rounded-full hover:bg-white transition-all z-20 flex items-center gap-2 shadow-lg font-medium"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {images.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={images[currentImageIndex]}
              alt={`${data.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🚗</div>
              <p className="text-xl font-medium opacity-90">
                No images available
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-white/30"
              >
                <Car size={16} /> Land Transportation
              </Badge>
              {images.length > 1 && (
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                >
                  <ImageIcon size={16} className="mr-1" />{" "}
                  {currentImageIndex + 1} / {images.length}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
              {data.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="animate-in fade-in duration-300 shadow-lg border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Info className="text-amber-600" size={24} />
                  About This Service
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-gray-700 leading-relaxed prose prose-amber max-w-none">
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
              </CardContent>
            </Card>

            {/* Image Gallery */}
            {images.length > 1 && (
              <Card className="animate-in fade-in duration-300 shadow-lg border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <ImageIcon className="text-amber-600" size={24} />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${
                          index === currentImageIndex
                            ? "border-amber-500 shadow-lg scale-105"
                            : "border-gray-200 hover:border-amber-300 hover:shadow-md"
                        }`}
                        onClick={() => goToImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${data.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <Circle fill="white" size={10} /> Active
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Details */}
            <Card className="animate-in fade-in duration-300 shadow-lg border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Car className="text-amber-600" size={24} />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.vehicleType && (
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0">
                        <Car className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Vehicle Type
                        </p>
                        <p className="font-semibold text-gray-900">
                          {data.vehicleType}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.capacity && (
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0">
                        <Users className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Capacity</p>
                        <p className="font-semibold text-gray-900">
                          {data.capacity} passengers
                        </p>
                      </div>
                    </div>
                  )}
                  {data.operator && (
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0">
                        <Building2 className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Operator</p>
                        <p className="font-semibold text-gray-900">
                          {data.operator}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.contactNumber && (
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-amber-100 p-2.5 rounded-lg flex-shrink-0">
                        <Phone className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Contact Number
                        </p>
                        <p className="font-semibold text-gray-900">
                          {data.contactNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card className="animate-in fade-in duration-300 shadow-lg border-gray-100 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <span className="text-2xl text-amber-600">₱</span>
                  Pricing Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Rate: ₱{data.baseFee} per kilometer
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Price Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-6">
                  <AlertCircle
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">Price Disclaimer</p>
                    <p>
                      These are estimated prices based on distance. Please
                      confirm the actual fare with the driver before starting
                      your trip.
                    </p>
                  </div>
                </div>

                {/* Distance Fee Component */}
                {data.baseFee && <DistanceFee ratePerKm={data.baseFee} />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandTransportationView;
