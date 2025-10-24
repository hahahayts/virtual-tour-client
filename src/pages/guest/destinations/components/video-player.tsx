import React from "react";

interface VideoPlayerProps {
  link: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  link,
  className,
}) => {
  if (!link) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-2xl h-[400px]">
        <p className="text-gray-500">No video available</p>
      </div>
    );
  }

  // Check if it's a YouTube URL
  const isYouTube = link.includes("youtube.com") || link.includes("youtu.be");

  // Convert YouTube URL into embeddable format
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const videoSrc = isYouTube ? getYouTubeEmbedUrl(link) : link;

  return (
    <div className={`w-full flex justify-center ${className || ""}`}>
      {isYouTube ? (
        <iframe
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl shadow-md"
          src={videoSrc}
          title="Destination Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          src={videoSrc}
          controls
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover rounded-2xl shadow-md"
        />
      )}
    </div>
  );
};
