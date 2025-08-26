import type { MediaControlButtonProps } from "../types";

export const MediaControlButton: React.FC<MediaControlButtonProps> = ({
  isActive,
  onClick,
  icon: Icon,
  label,
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full 
      transition-all duration-300 border backdrop-blur-sm hover:scale-105
      animate-in slide-in-from-top-5duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 shadow-lg shadow-sky-500/25"
          : "bg-white/90 text-gray-700 border-gray-300 hover:bg-white hover:shadow-md"
      }
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);
