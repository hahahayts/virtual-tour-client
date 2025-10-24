import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RatingFormProps {
  destinationId: string;
}

export const RatingForm: React.FC<RatingFormProps> = ({ destinationId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      // Replace with your POST API endpoint
      const res = await fetch(`/api/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationId, rating, comment }),
      });
      if (!res.ok) throw new Error("Failed to submit rating");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      setRating(0);
      setComment("");
    },
    onError: () => toast.error("Something went wrong, please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a star rating!");
      return;
    }
    mutation.mutate();
  };

  return (
    <section
      className="mt-12 sm:mt-16 animate-in slide-in-from-top-5 duration-300"
      style={{ animationDelay: "800ms" }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200/50">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Help other travelers by sharing your rating and comments about this
            destination
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Star Rating Section */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How would you rate this destination?
            </label>
            <div className="flex justify-center gap-1 sm:gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 sm:p-2 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-500 fill-yellow-500 drop-shadow-sm"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              {rating
                ? `${rating} star${rating > 1 ? "s" : ""} selected`
                : "Click to rate"}
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Share your experience (optional)
            </label>
            <textarea
              id="comment"
              placeholder="What did you like about this place? Any tips for other visitors?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[120px] px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none transition-all duration-200 placeholder:text-gray-400 text-gray-700 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={mutation.isPending || !rating}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Review
                </div>
              )}
            </Button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center">
            Your feedback helps improve the experience for everyone
          </p>
        </form>
      </div>
    </section>
  );
};
