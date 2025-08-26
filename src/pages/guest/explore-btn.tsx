import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";

const ExploreButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Reset loading state after navigation (you might handle this differently)
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Link
      to="/destinations"
      onClick={handleClick}
      className="w-full sm:w-auto group relative overflow-hidden
                 bg-gradient-to-r from-blue-400 via-blue-500 to-teal-500 
                 hover:from-blue-500 hover:via-blue-600 hover:to-teal-600
                 text-white font-semibold 
                 px-6 md:px-8 py-4 md:py-5
                 rounded-full transition-all duration-300 
                 transform hover:scale-105 hover:shadow-2xl
                 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:scale-105
                 active:scale-95
                 flex items-center justify-center space-x-2 
                 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                 min-h-[56px] sm:min-h-[auto] mb-7"
      aria-label="Explore destinations in Tubigon, Bohol"
      role="button"
    >
      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      />

      <span className="relative z-10">
        {isLoading ? "Loading..." : "Explore Now"}
      </span>

      {isLoading ? (
        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin relative z-10" />
      ) : (
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
      )}
    </Link>
  );
};

export default ExploreButton;
