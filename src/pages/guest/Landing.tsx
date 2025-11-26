import { useState, useEffect } from "react";
import { VideoBackground } from "@/components/video-bg";
import { heroTexts } from "@/components/navbar";
import { useMetadata } from "@/hooks/use-metadata";
import ExploreButton from "./explore-btn";
import axios from "axios";
import { API_BASE } from "@/constant";

const LandingPage = () => {
  const [currentText, setCurrentText] = useState(0);

  useMetadata({
    title: "Tara na sa Tubigon",
    description: "The beauty of Tubigon, Bohol",
    canonicalUrl: "http://localhost:5173/",
  });

  useEffect(() => {
    const sendMacAddress = async () => {
      try {
        await axios.get(`${API_BASE}/get-mac-address`);
      } catch (error) {
        console.error("Failed to fetch MAC address:", error);
      }
    };
    sendMacAddress();

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoBackground />

      {/* Centered Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
        {/* Animated Hero Text */}
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight opacity-0"
          style={{
            animation: `fadeInUp 1s ease-out forwards`,
            animationDelay: "0.2s",
          }}
        >
          {heroTexts[currentText]}
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-white/90 max-w-2xl mx-auto opacity-0"
          style={{
            animation: `fadeInUp 1s ease-out forwards`,
            animationDelay: "0.6s",
          }}
        >
          Immerse yourself in the breathtaking beauty of Tubigon, Bohol. From
          pristine beaches to cultural treasures, your perfect island adventure
          awaits.
        </p>

        {/* CTA Button */}
        <div
          className="opacity-0"
          style={{
            animation: `fadeInUp 1s ease-out forwards`,
            animationDelay: "1s",
          }}
        >
          <ExploreButton />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
