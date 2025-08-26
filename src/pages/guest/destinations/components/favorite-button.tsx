import { Heart } from "lucide-react";
import type { FavoriteButtonProps } from "../types";

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={`
      p-3 rounded-full transition-all duration-300 border shadow-sm hover:scale-110
      animate-in slide-in-from-top-5 
      ${
        isFavorite
          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-500 shadow-lg shadow-rose-500/25"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
      }
    `}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    <Heart
      className={`w-5 h-5 transition-transform ${
        isFavorite ? "fill-current scale-110" : ""
      }`}
    />
  </button>
);
