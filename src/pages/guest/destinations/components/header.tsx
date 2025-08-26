import { ArrowLeft } from "lucide-react";
import { ShareButton } from "./share-button";

interface Props {
  handleBackClick: () => void;

  name: string;
  handleShare: () => void;
}

export const ViewHeader = ({
  handleBackClick,

  handleShare,
  name,
}: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm animate-in slide-in-from-top-5 duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Destinations</span>
          </button>

          <div className="flex items-center space-x-3">
            <ShareButton destinationName={name} onShare={handleShare} />
          </div>
        </div>
      </div>
    </header>
  );
};
