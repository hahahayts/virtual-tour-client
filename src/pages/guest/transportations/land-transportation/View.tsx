import { fetchDataById } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Users,
  Ticket,
  CreditCard,
  RefreshCw,
  DollarSign,
  Info,
  Image as ImageIcon,
  Circle,
  AlertCircle,
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
        <Card className="w-full max-w-md text-center">
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
              className="flex items-center gap-2"
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
        <Card className="w-full max-w-md text-center">
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
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-amber-500 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🚗</div>
              <p className="text-xl opacity-80">No images available</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Car size={16} /> Land Transportation
              </Badge>
              {images.length > 1 && (
                <Badge
                  variant="outline"
                  className="bg-black/30 backdrop-blur-sm"
                >
                  <Info size={16} /> {currentImageIndex + 1} / {images.length}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {data.name}
            </h1>
            {data.baseFee && (
              <div className="flex items-center gap-2 text-lg opacity-90 drop-shadow-md">
                <Ticket size={20} />
                <span>From ₱{data.baseFee}</span>
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
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="text-amber-600" size={24} />
                  About This Service
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Image Gallery */}
            {images.length > 1 && (
              <Card className="animate-in fade-in duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="text-amber-600" size={24} />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-amber-500"
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
                          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            <Circle fill="white" size={12} /> Current
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Details */}
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="text-amber-600" size={24} />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.vehicleType && (
                    <div className="flex items-start gap-3">
                      <Car className="text-amber-600 mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 mb-1">Vehicle Type:</p>
                        <p className="font-medium">{data.vehicleType}</p>
                      </div>
                    </div>
                  )}
                  {data.capacity && (
                    <div className="flex items-start gap-3">
                      <Users className="text-amber-600 mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 mb-1">Capacity:</p>
                        <p className="font-medium">
                          {data.capacity} passengers
                        </p>
                      </div>
                    </div>
                  )}
                  {data.operator && (
                    <div className="flex items-start gap-3">
                      <Info className="text-amber-600 mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 mb-1">Operator:</p>
                        <p className="font-medium">{data.operator}</p>
                      </div>
                    </div>
                  )}
                  {data.contactNumber && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="text-amber-600 mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 mb-1">Contact Number:</p>
                        <p className="font-medium">{data.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Details */}
            {data.feeDescription && (
              <Card className="animate-in fade-in duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-amber-600 text-lg">₱</span>
                    Pricing Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600">
                    <MDEditor.Markdown
                      source={data.feeDescription}
                      style={{ background: "transparent", color: "inherit" }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-amber-600 text-lg">₱</span>
                  Pricing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.baseFee && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Ticket className="text-amber-600" size={18} />
                      <span className="text-gray-700">Base Fee:</span>
                    </div>
                    <span className="font-medium flex items-center gap-1">
                      ₱{data.baseFee}
                    </span>
                  </div>
                )}
                {data.feeDescription && (
                  <div className="text-sm text-gray-500 mt-2">
                    <p>{data.feeDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="animate-in fade-in duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="text-amber-600" size={24} />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandTransportationView;
