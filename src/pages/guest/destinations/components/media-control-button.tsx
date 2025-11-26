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
      flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 
      text-xs sm:text-sm font-semibold rounded-full 
      transition-all border backdrop-blur-sm 
      active:scale-95 sm:hover:scale-105
      min-h-[44px] touch-manipulation
      animate-in slide-in-from-top-5 duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 shadow-lg shadow-sky-500/25"
          : "bg-white/90 text-gray-700 border-gray-300 hover:bg-white hover:shadow-md"
      }
    `}
  >
    <Icon className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
    <span className="whitespace-nowrap">{label}</span>
  </button>
);
