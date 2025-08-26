import { useQuery } from "@tanstack/react-query";
import { ViewDestinationSkeleton } from "@/components/view-skeleton";
import { ErrorView } from "@/components/error-view";
import { NotFoundView } from "@/components/not-found";
import { fetchDataById } from "@/db";
import { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GuestViewAboutProps {
  id?: string;
}

const GuestViewAbout = ({ id = "1" }: GuestViewAboutProps) => {
  const navigate = useNavigate();
  const { data, isFetching, error } = useQuery({
    queryKey: ["about", id],
    queryFn: () => fetchDataById(id, "about"),
    enabled: !!id,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isFetching) {
    return <ViewDestinationSkeleton />;
  }

  if (error) {
    return <ErrorView name="About" url="about" />;
  }

  if (!data) {
    return <NotFoundView name="About" url="about" />;
  }

  const availableImages = [
    data.imageUrl_1,
    data.imageUrl_2,
    data.imageUrl_3,
  ].filter(Boolean) as string[];

  const currentImage = availableImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % availableImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + availableImages.length) % availableImages.length
    );
  };

  return (
    <section className="py-5">
      <div className="max-w-4xl xl:max-w-6xl mx-auto px-4">
        {/* <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 animate-in slide-in-from-top-5 duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button> */}

        <Card
          className="animate-in slide-in-from-top-5 duration-300"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
          </CardHeader>

          {availableImages.length > 0 && (
            <CardContent>
              <div className="relative mb-6">
                <img
                  src={currentImage}
                  alt={`${data.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />

                {availableImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {availableImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          )}

          <CardContent>
            <div className="prose prose-sm max-w-none">
              <MDEditor.Markdown
                source={data.description}
                style={{
                  background: "transparent",
                  color: "inherit",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuestViewAbout;
