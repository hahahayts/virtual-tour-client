import { useQuery } from "@tanstack/react-query";
import { Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  comment: string;
  createdAt: string;
}

interface RatingsPreviewProps {
  destinationId: string;
}

interface ReviewResponse {
  reviews: Review[];
}

// Mock API-like function
const fetchReviews = async (destinationId: string): Promise<ReviewResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const reviews: Review[] = [
    {
      id: "1",
      comment:
        "Absolutely stunning place! I loved the view and the food nearby.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: "2",
      comment: "Great experience overall. Would love to come back again soon!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
    {
      id: "3",
      comment: "The place was okay, but it was quite crowded when we visited.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
  ];

  return { reviews };
};

export const RatingsPreview: React.FC<RatingsPreviewProps> = ({
  destinationId,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", destinationId],
    queryFn: () => fetchReviews(destinationId),
    enabled: !!destinationId,
  });

  const scrollToRatingForm = () => {
    document
      .getElementById("rating-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (isLoading) {
    return (
      <section className="mt-12 sm:mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
            <span className="ml-2 text-gray-600">Loading comments...</span>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="mt-12 sm:mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
          <div className="text-center py-8">
            <p className="text-gray-600">Failed to load comments</p>
          </div>
        </div>
      </section>
    );
  }

  const { reviews } = data;

  return (
    <section
      className="mt-12 sm:mt-16 animate-in slide-in-from-top-5 duration-300"
      style={{ animationDelay: "650ms" }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Traveler Comments
          </h2>
        </div>

        {/* Comments List */}
        <div className="grid gap-4 sm:gap-6">
          {reviews.length > 0 ? (
            reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 sm:p-6 border border-gray-200/50"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Anonymous</h4>
                    <span className="text-xs text-gray-500 ml-1">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No comments yet</p>
              <p className="text-gray-500 text-sm">
                Be the first to share your experience!
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <Button
            onClick={scrollToRatingForm}
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300"
          >
            Add Your Comment
          </Button>
        </div>
      </div>
    </section>
  );
};
