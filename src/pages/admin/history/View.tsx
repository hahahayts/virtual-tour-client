import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { formatDate } from "@/lib/date-formatter";
import { fetchDataById } from "@/db";
import { ViewPageHeader } from "@/components/view-page-header";
import { useEffect, useState } from "react";
import { GalleryImages } from "@/components/gallery-images";

const ViewHistory = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["history", id],
    queryFn: () => fetchDataById(id, "history"),
    enabled: !!id,
  });

  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const firstImage =
        data.imageUrl_1 || data.imageUrl_2 || data.imageUrl_3 || null;
      setCurrentImage(firstImage);
    }
  }, [data]);

  if (isFetching) {
    return <ViewDestinationSkeleton />;
  }

  if (error) {
    return <ErrorView name="History" url="history" />;
  }

  if (!data) {
    return <NotFoundView name="History" url="history" />;
  }

  const availableImages = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
  ].filter(Boolean) as string[];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      {/* <ViewPageHeader
        name={data.name}
        itemName="History"
        id={data.id}
        url="history"
      /> */}
      <div className="mb-8">
        <Link
          to={`/admin/history`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cultural and Heritage
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="capitalize ext-3xl font-bold mb-2">{data.name}</h1>
            <p className="text-muted-foreground">ID: {data.id}</p>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/admin/history/${data.id}/edit`}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Edit Cultural and Heritage
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          {availableImages.length > 0 ? (
            <GalleryImages
              availableImages={availableImages}
              currentImage={currentImage}
              name={data.name}
              setCurrentImage={setCurrentImage}
            />
          ) : (
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <p className="text-muted-foreground">No images available</p>
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

export default ViewHistory;
