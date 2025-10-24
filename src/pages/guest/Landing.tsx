import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { VideoBackground } from "@/components/video-bg";
import { heroTexts, quickActions } from "@/components/navbar";
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
    axios.get(`${API_BASE}/get-mac-address`);

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <VideoBackground />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Hero Text */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span
              className="block opacity-0 animate-fade-in"
              style={{
                animation: `fadeInUp 1s ease-out forwards`,
                animationDelay: "0.2s",
              }}
            >
              {heroTexts[currentText]}
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 max-w-2xl mx-auto opacity-0 px-4"
            style={{
              animation: `fadeInUp 1s ease-out forwards`,
              animationDelay: "0.6s",
            }}
          >
            Immerse yourself in the breathtaking beauty of Tubigon, Bohol. From
            pristine beaches to cultural treasures, your perfect island
            adventure awaits.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 md:mb-12 opacity-0 px-4"
            style={{
              animation: `fadeInUp 1s ease-out forwards`,
              animationDelay: "1s",
            }}
          >
            <ExploreButton />
          </div>
        </div>

        {/* Quick Actions - Enhanced for mobile */}
        <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 md:px-6 ">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 opacity-0"
            style={{
              animation: `fadeInUp 1s ease-out forwards`,
              animationDelay: "1.8s",
            }}
          >
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="group bg-gradient-to-br from-blue-500/10 to-teal-500/10 backdrop-blur-md border border-white/20 hover:from-blue-500/20 hover:to-teal-500/20 rounded-xl p-3 md:p-4 text-center transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <action.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-yellow-300 group-hover:scale-110 transition-transform drop-shadow-sm" />
                <div className="text-xs md:text-sm font-semibold text-white mb-1">
                  {action.title}
                </div>
                <div className="text-xs text-white/70 hidden sm:block">
                  {action.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2">
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
