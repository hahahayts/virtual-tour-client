import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MessageSquare, Star } from "lucide-react";
import { fetchData } from "@/db";

interface Review {
  id: string;
  comment: string;
  score: number;
  createdAt: string;
  is_display: boolean;
}

interface RatingsPreviewProps {
  destinationId: string;
}

export const RatingsPreview: React.FC<RatingsPreviewProps> = ({
  destinationId,
}) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["public-comments", destinationId],
    queryFn: () => fetchData(`ratings/destination/${destinationId}`),
  });

  const [showAll, setShowAll] = useState(false);

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

  if (isPending) {
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

  // 🚫 Error or no data
  if (isError || !data || !data.ratings || data.ratings.length === 0) {
    return (
      <section className="mt-12 sm:mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">
            No comments or ratings yet.
          </p>
          <p className="text-gray-500 text-sm">
            Be the first to share your experience!
          </p>
        </div>
      </section>
    );
  }

  // ✅ Filter only approved ratings
  const visibleReviews = data.ratings?.filter(
    (r: Review) => r.is_display === true
  );

  // ✅ Determine which reviews to show (first 10 or all)
  const displayedReviews = showAll
    ? visibleReviews
    : visibleReviews?.slice(0, 10);

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
          {visibleReviews && visibleReviews.length > 0 ? (
            <>
              {displayedReviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 sm:p-6 border border-gray-200/50"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800">
                          Anonymous
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.score
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {review.comment}
                  </p>
                </div>
              ))}

              {/* 👇 Show More Button */}
              {visibleReviews.length > 10 && !showAll && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-5 py-2 text-sm font-medium text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-full transition-colors"
                  >
                    Show More Comments
                  </button>
                </div>
              )}
            </>
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
      </div>
    </section>
  );
};
