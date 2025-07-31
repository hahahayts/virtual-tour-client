import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { DollarSign, Users, Truck, Calendar } from "lucide-react";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { formatDate } from "@/lib/date-formatter";
import { fetchDataById } from "@/db";
import { ViewPageHeader } from "@/components/view-page-header";
import { formatCurrency } from "@/lib/currency";
import { useEffect, useState } from "react";
import { GalleryImages } from "@/components/gallery-images";
import MDEditor from "@uiw/react-md-editor";

const View = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["land-transportation", id],
    queryFn: () => fetchDataById(id, "land-transportations"),
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
    return <ErrorView name="Land Transportation" url="land-transportations" />;
  }

  if (!data) {
    return (
      <NotFoundView name="Land Transportation" url="land-transportations" />
    );
  }

  const availableImages = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
  ].filter(Boolean) as string[];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <ViewPageHeader
        name={data.name}
        itemName="Land Transportation"
        id={data.id}
        url="land-transportations"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Images Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <GalleryImages
              availableImages={availableImages}
              currentImage={currentImage}
              name={data.name}
              setCurrentImage={setCurrentImage}
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {data.description ? (
                <MDEditor.Markdown
                  source={data.description}
                  style={{ background: "transparent" }}
                />
              ) : (
                <p className="text-muted-foreground">No description provided</p>
              )}
            </div>
          </div>

          {/* Fee Description */}
          {data.feeDescription && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Fee Details</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <MDEditor.Markdown
                  source={data.feeDescription}
                  style={{ background: "transparent" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Information */}
          {data.baseFee && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Pricing</h2>
              <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Base Fee</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(data.baseFee)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Vehicle Details</h2>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                {(data.vehicleType || data.capacity) && (
                  <>
                    {data.vehicleType && (
                      <div className="flex items-start gap-3 mb-3">
                        <Truck className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Vehicle Type</p>
                          <p className="text-sm text-muted-foreground">
                            {data.vehicleType}
                          </p>
                        </div>
                      </div>
                    )}

                    {data.capacity && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Passenger Capacity</p>
                          <p className="text-sm text-muted-foreground">
                            {data.capacity} persons
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Operator Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Operator Details</h2>
            <div className="space-y-3">
              {data.operator && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Operator</span>
                  <span className="text-sm text-muted-foreground">
                    {data.operator}
                  </span>
                </div>
              )}

              {data.contactNumber && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Contact Number</span>
                  <span className="text-sm text-muted-foreground">
                    {data.contactNumber}
                  </span>
                </div>
              )}
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
