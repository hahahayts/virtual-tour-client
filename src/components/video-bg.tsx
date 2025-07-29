import { useRef, useEffect, useState } from "react";

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Autoplay prevented, falling back to muted autoplay");
        video.muted = true;
        await video.play();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handlePlay();
      }
    };

    handlePlay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={() => setIsLoaded(true)}
        poster="/videos/background-poster.jpg"
      >
        <source src="/videos/background.webm" type="video/webm" />
        <source src="/videos/background-compressed.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};
