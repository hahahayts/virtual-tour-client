import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  Mail,
  Phone,
  Globe,
  Facebook,
  MapPin,
  Calendar,
  Navigation,
} from "lucide-react";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { formatDate } from "@/lib/date-formatter";
import { fetchDataById } from "@/db";
import { ViewPageHeader } from "@/components/view-page-header";
import { useEffect, useState } from "react";
import { GalleryImages } from "@/components/gallery-images";
import ThreeSixtyViewer from "@/components/three-sixty-image";
import { MapNavigation } from "@/components/map-navigation";
import ReactMarkdown from "react-markdown";

const View = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => fetchDataById(id, "destinations"),
    enabled: !!id,
  });
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const firstImage =
        data.imageUrl_1 ||
        data.imageUrl_2 ||
        data.imageUrl_3 ||
        data.imageUrl_4 ||
        data.imageUrl_5 ||
        null;
      setCurrentImage(firstImage);
    }
  }, [data]);

  if (isFetching) {
    return <ViewDestinationSkeleton />;
  }

  if (error) {
    return <ErrorView name="Destination" url="destinations" />;
  }

  if (!data) {
    return <NotFoundView name="Destination" url="destinations" />;
  }

  const availableImages = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
    data.imageUrl_4,
    data.imageUrl_5,
  ].filter(Boolean) as string[];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <ViewPageHeader
        name={data.name}
        itemName="Destination"
        id={data.id}
        url="destinations"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          <GalleryImages
            availableImages={availableImages}
            currentImage={currentImage}
            name={data.name}
            setCurrentImage={setCurrentImage}
          />

          {/* 360° Image */}
          {data.three_sixty_imageUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">360° View</h3>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow">
                <ThreeSixtyViewer
                  imageUrl={data.three_sixty_imageUrl}
                  hotspotConfig={[
                    {
                      pitch: -10,
                      yaw: 45,
                      text: "Point of interest",
                      color: "#3b82f6",
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Map Integration */}
          {data.latitude && data.longitude && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Map View</h3>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow">
                <MapNavigation
                  destination={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                    name: data.name,
                  }}
                />
              </div>
            </div>
          )}

          {/* Video */}
          {data.videoUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Video</h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <video src={data.videoUrl} controls className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <ReactMarkdown>{data.description}</ReactMarkdown>
            </div>
          </div>

          {/* Transportation Information */}
          {data.transpo_info && (
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Getting There
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground bg-muted/30 rounded-lg p-4">
                <ReactMarkdown>{data.transpo_info}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {(data.email || data.phone || data.website || data.facebook) && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Contact Information
              </h2>
              <div className="space-y-3">
                {data.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-primary hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                )}

                {data.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${data.phone}`}
                      className="text-primary hover:underline"
                    >
                      {data.phone}
                    </a>
                  </div>
                )}

                {data.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {data.website}
                    </a>
                  </div>
                )}

                {data.facebook && (
                  <div className="flex items-center gap-3">
                    <Facebook className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={data.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Facebook Page
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {(data.address || (data.latitude && data.longitude)) && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    {data.address && <p className="text-sm">{data.address}</p>}
                    {data.latitude && data.longitude && (
                      <p className="text-xs text-muted-foreground">
                        {data.latitude}, {data.longitude}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          {data.count !== undefined && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Statistics</h2>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">View Count</p>
                <p className="text-2xl font-bold">{data.count}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p>{formatDate(data.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p>{formatDate(data.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
