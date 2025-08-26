import { useCallback, useState } from "react";
import type { ShareButtonProps } from "../types";
import { Check, Share2 } from "lucide-react";

export const ShareButton: React.FC<ShareButtonProps> = ({
  destinationName,
  onShare,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: destinationName,
          text: `Check out this amazing destination: ${destinationName}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      onShare();
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, [destinationName, onShare]);

  return (
    <button
      onClick={handleShare}
      className="p-3 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm hover:scale-110 animate-in slide-in-from-top-5 "
      aria-label="Share destination"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <Share2 className="w-5 h-5" />
      )}
    </button>
  );
};
