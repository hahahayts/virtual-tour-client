import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

import { fetchDataById } from "@/db";
import { TableSkeleton } from "@/components/table-skeleton";
import { ErrorPage } from "@/components/error-page";

interface HistoryItem {
  id: string;
  name: string;
  description: string;
  imageUrl_1: string | null;
  imageUrl_2: string | null;
  imageUrl_3: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

const CulturalAndHeritageView = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    queryKey: ["history", id],
    queryFn: () => fetchDataById(id, "history"),
    enabled: !!id,
  });

  if (isFetching) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="history item" />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12 sm:py-16">
              <div className="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-gray-400 mb-4">
                <Calendar className="h-full w-full" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                Heritage Item Not Found
              </h3>
              <p className="text-gray-500 mb-6">
                The cultural heritage item you're looking for doesn't exist or
                has been removed.
              </p>
              <Link to="/cultural-heritage">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Heritage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const heritage: HistoryItem = data;
  const availableImages = [
    heritage.imageUrl_1,
    heritage.imageUrl_2,
    heritage.imageUrl_3,
  ].filter(Boolean);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Mobile-first container with proper padding */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button - Mobile optimized */}
          <div
            className="mb-4 sm:mb-6 animate-in slide-in-from-top-5"
            style={{ animationDelay: "0ms" }}
          >
            <Link to="/cultural-heritage">
              <Button
                variant="link"
                size="sm"
                className="hover:bg-amber-50 hover:border-amber-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to</span> Heritage
              </Button>
            </Link>
          </div>

          {/* Main Content Card */}
          <Card
            className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-top-5"
            style={{ animationDelay: "100ms" }}
          >
            {/* Images Section - Mobile responsive */}
            {availableImages.length > 0 && (
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {/* Main Image - Mobile first sizing */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={availableImages[0]!}
                      alt={heritage.name}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-heritage.jpg";
                      }}
                    />
                  </div>

                  {/* Additional Images - Responsive grid */}
                  {availableImages.length > 1 && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {availableImages.slice(1).map((imageUrl, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden"
                        >
                          <img
                            src={
                              imageUrl ||
                              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F017%2F756%2F694%2Fnon_2x%2Fgallery-icon-simple-design-vector.jpg&f=1&nofb=1&ipt=dcd3bfb84ec0969c1ca05cbd2fddc82a279d6aefc97f31a284cb2f919a22ba5c"
                            }
                            alt={`${heritage.name} - Image ${index + 2}`}
                            className="w-full h-24 sm:h-32 md:h-40 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-heritage.jpg";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Count Badge - Mobile positioned */}
                <div className="flex justify-end mt-3">
                  <Badge variant="secondary" className="text-xs">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    {availableImages.length}{" "}
                    {availableImages.length === 1 ? "Image" : "Images"}
                  </Badge>
                </div>
              </div>
            )}

            {/* Content Section */}
            <CardHeader className="px-4 sm:px-6 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                {/* <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 w-fit">
                  Cultural Heritage
                </Badge> */}

                {/* Date Info - Mobile stacked */}
                {/* {(heritage.createdAt || heritage.updatedAt) && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
                    {heritage.createdAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Created {formatDate(heritage.createdAt)}</span>
                      </div>
                    )}
                    {heritage.updatedAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated {formatDate(heritage.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                )} */}
              </div>

              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {heritage.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              <div className="prose prose-gray max-w-none">
                <MDEditor.Markdown
                  source={heritage.description}
                  style={{
                    backgroundColor: "transparent",
                    color: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Related Section - Mobile friendly */}
          {/* <div
            className="mt-6 sm:mt-8 animate-in slide-in-from-top-5"
            style={{ animationDelay: "200ms" }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl text-gray-900">
                  About This Heritage
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Type:</span>
                    <span className="ml-2 text-gray-600">
                      Cultural Heritage Item
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Location:</span>
                    <span className="ml-2 text-gray-600">Tubigon, Bohol</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Status:</span>
                    <span className="ml-2 text-green-600">Active</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Images:</span>
                    <span className="ml-2 text-gray-600">
                      {availableImages.length} Available
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CulturalAndHeritageView;
