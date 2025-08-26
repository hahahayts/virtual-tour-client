import { Eye } from "lucide-react";
import type { ImageGalleryItemProps } from "../types";

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  image,
  index,
  destinationName,
  isActive,
  onClick,
  priority = false,
}) => (
  <div
    className={`
      relative group cursor-pointer overflow-hidden rounded-xl shadow-md 
      transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
      animate-in slide-in-from-top-5 
      ${priority ? "col-span-2 row-span-2" : ""}
      ${isActive ? "ring-4 ring-offset-2 ring-sky-500 shadow-2xl" : ""}
    `}
    onClick={onClick}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <img
      src={image}
      alt={`${destinationName} view ${index + 1}`}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading={priority ? "eager" : "lazy"}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
        <Eye className="w-6 h-6 text-white" />
      </div>
    </div>
    {priority && (
      <div className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        Featured
      </div>
    )}
  </div>
);
