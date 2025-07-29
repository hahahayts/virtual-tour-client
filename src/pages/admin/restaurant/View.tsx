import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Mail, Phone, Globe, Facebook, MapPin, Calendar } from "lucide-react";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { formatDate } from "@/lib/date-formatter";
import { fetchDataById } from "@/db";
import { ViewPageHeader } from "@/components/view-page-header";
import { useEffect, useState } from "react";
import { GalleryImages } from "@/components/gallery-images";
import ThreeSixtyViewer from "@/components/three-sixty-image";

const View = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchDataById(id, "restaurants"),
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
    return <ErrorView name="Restaurant" url="restaurants" />;
  }

  if (!data) {
    return <NotFoundView name="Restaurant" url="restaurants" />;
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
        itemName="Restaurant"
        id={data.id}
        url="restaurants"
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
            <div className="mt-6 ">
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
            <p className="text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
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

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">{data.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.latitude}, {data.longitude}
                  </p>
                </div>
              </div>
            </div>
          </div>

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
