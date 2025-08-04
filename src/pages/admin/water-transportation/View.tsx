import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  Calendar,
  Clock,
  DollarSign,
  Shield,
  RefreshCw,
  Timer,
} from "lucide-react";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { formatDate, formatDepartureDays } from "@/lib/date-formatter";
import { fetchDataById } from "@/db";
import { ViewPageHeader } from "@/components/view-page-header";
import { formatCurrency } from "@/lib/currency";
import { useEffect, useState } from "react";
import { GalleryImages } from "@/components/gallery-images";
import MDEditor from "@uiw/react-md-editor";
import { formatDepartureDaysView, formatDuration } from "@/lib/utils";

const View = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["water-transportation", id],
    queryFn: () => fetchDataById(id, "water-transportations"),
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
    return (
      <ErrorView name="Water Transportation" url="water-transportations" />
    );
  }

  if (!data) {
    return (
      <NotFoundView name="Water Transportation" url="water-transportations" />
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
        itemName="Water Transportation"
        id={data.id}
        url="water-transportations"
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
              <MDEditor.Markdown
                source={data.description}
                style={{ background: "transparent" }}
              />
            </div>
          </div>

          {/* Policies & Guidelines */}
          {(data.guidelines_and_policies ||
            data.rebooking_supercharges ||
            data.refund_policy) && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Policies & Guidelines</h2>

              {data.guidelines_and_policies && (
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold">Guidelines and Policies</h3>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MDEditor.Markdown
                      source={data.guidelines_and_policies}
                      style={{ background: "transparent" }}
                    />
                  </div>
                </div>
              )}

              {data.rebooking_supercharges && (
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold">Rebooking Supercharges</h3>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MDEditor.Markdown
                      source={data.rebooking_supercharges}
                      style={{ background: "transparent" }}
                    />
                  </div>
                </div>
              )}

              {data.refund_policy && (
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold">Refund Policy</h3>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MDEditor.Markdown
                      source={data.refund_policy}
                      style={{ background: "transparent" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Pricing</h2>
            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Expected Fee</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(data.expected_fee)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Schedule</h2>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Departure Days</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDepartureDaysView(data.departure_days)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Departure Time</p>
                    <div className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert">
                      <MDEditor.Markdown
                        source={data.departure_time}
                        style={{ background: "transparent" }}
                      />
                    </div>
                  </div>
                </div>

                {data.duration && (
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium mb-1">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDuration(data.duration)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Weekly Schedule Visual */}
              <div>
                <p className="text-sm font-medium mb-2">Weekly Schedule</p>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => {
                      const fullDayNames = {
                        Mon: "Monday",
                        Tue: "Tuesday",
                        Wed: "Wednesday",
                        Thu: "Thursday",
                        Fri: "Friday",
                        Sat: "Saturday",
                        Sun: "Sunday",
                      };
                      const isActive = data.departure_days?.includes(
                        fullDayNames[day as keyof typeof fullDayNames]
                      );

                      return (
                        <div
                          key={day}
                          className={`p-2 text-center rounded ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Service Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Service Type</span>
                <span className="text-sm text-muted-foreground">
                  Water Transportation
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Expected Fee</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(data.expected_fee)}
                </span>
              </div>

              {data.duration && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Duration</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(data.duration)}
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
