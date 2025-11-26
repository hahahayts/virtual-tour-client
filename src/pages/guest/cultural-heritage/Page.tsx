import { TableSkeleton } from "@/components/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Image as ImageIcon } from "lucide-react";

import { fetchData } from "@/db";
import { ErrorPage } from "@/components/error-page";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/guest/header";
import { Link } from "react-router";

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

const CulturalAndHeritage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["histories"],
    queryFn: () => fetchData("history"),
  });

  if (isPending) return <TableSkeleton />;
  if (error) return <ErrorPage name="history" />;

  const histories: HistoryItem[] = data?.histories || [];

  if (histories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <Calendar className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Culture, Arts and Heritage Found
            </h3>
            <p className="text-gray-500">
              We're working on adding rich cultural and heritage content to
              explore.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvailableImages = (item: HistoryItem) => {
    return [item.imageUrl_1, item.imageUrl_2, item.imageUrl_3].filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header Section */}
      <Header
        title="Cultural & Heritage in"
        description="Discover the rich history and cultural treasures of Tubigon, Bohol. Explore stories that shaped our community and heritage that defines us."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-amber-600">
              {histories.length}
            </span>{" "}
            culture, arts and heritage{" "}
            {histories.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Heritage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {histories.map((item, index) => {
            const availableImages = getAvailableImages(item);
            const hasImages = availableImages.length > 0;

            return (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white/90 animate-in slide-in-from-top-5 flex flex-col"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Section */}
                {hasImages ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={availableImages[0]!}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-heritage.jpg";
                      }}
                    />
                    {availableImages.length > 1 && (
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 bg-black/60 text-white hover:bg-black/70"
                      >
                        <ImageIcon className="h-3 w-3 mr-1" />+
                        {availableImages.length - 1}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-amber-400" />
                  </div>
                )}

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-amber-700 transition-colors duration-200">
                      {item.name}
                    </CardTitle>

                    {(item.createdAt || item.updatedAt) && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {item.updatedAt ? (
                          <span>Updated {formatDate(item.updatedAt)}</span>
                        ) : (
                          <span>Created {formatDate(item.createdAt)}</span>
                        )}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0 flex flex-col flex-1">
                    <CardDescription className="text-gray-600 line-clamp-3 text-sm leading-relaxed flex-1">
                      {item.description}
                    </CardDescription>

                    <div className="mt-4 flex items-center justify-end">
                      <Link
                        to={`/cultural-heritage/${item.id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-200"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CulturalAndHeritage;
