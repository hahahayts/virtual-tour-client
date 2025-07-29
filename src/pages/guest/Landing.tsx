import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Globe,
  MapPin,
  Camera,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { VideoBackground } from "@/components/video-bg";

// Video Background component

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const heroTexts = [
    "Discover Paradise in Bohol",
    "Experience Natural Wonders",
    "Create Unforgettable Memories",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "50+", label: "Destinations" },
    { number: "200+", label: "Accommodations" },
    { number: "10K+", label: "Happy Visitors" },
    { number: "4.8", label: "Average Rating" },
  ];

  const quickActions = [
    { icon: MapPin, title: "Explore Places", desc: "Discover hidden gems" },
    { icon: Calendar, title: "Plan Your Trip", desc: "Book accommodations" },
    { icon: Camera, title: "Virtual Tours", desc: "360° experiences" },
    { icon: Users, title: "Local Guides", desc: "Expert recommendations" },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      <VideoBackground />

      {/* Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between p-4 md:p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500/20 backdrop-blur-md border border-white/20 rounded-full p-2">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-2xl font-bold text-white">
            Tara na sa <span className="text-blue-300">TUBIGON</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#destinations"
            className="text-white/90 hover:text-white transition-colors"
          >
            Destinations
          </a>
          <a
            href="#accommodations"
            className="text-white/90 hover:text-white transition-colors"
          >
            Stay
          </a>
          <a
            href="#restaurants"
            className="text-white/90 hover:text-white transition-colors"
          >
            Dine
          </a>
          <a
            href="#transport"
            className="text-white/90 hover:text-white transition-colors"
          >
            Transport
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center space-x-2 bg-blue-500/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white hover:bg-blue-500/30 transition-colors">
            <Globe className="w-4 h-4" />
            <span>EN</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            className="md:hidden bg-blue-500/20 backdrop-blur-md border border-white/20 rounded-full p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 backdrop-blur-sm z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-white">
            <a
              href="#destinations"
              className="text-xl md:text-2xl hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </a>
            <a
              href="#accommodations"
              className="text-xl md:text-2xl hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stay
            </a>
            <a
              href="#restaurants"
              className="text-xl md:text-2xl hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dine
            </a>
            <a
              href="#transport"
              className="text-xl md:text-2xl hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Transport
            </a>
            <button className="flex items-center space-x-2 bg-blue-500/25 backdrop-blur-md border border-white/30 rounded-full px-6 py-3">
              <Globe className="w-5 h-5" />
              <span>Language</span>
            </button>
          </div>
        </div>
      )}

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
            <button className="w-full sm:w-auto group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2">
              <span>Explore Now</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="w-full sm:w-auto group bg-blue-500/15 backdrop-blur-md border border-white/30 hover:bg-blue-500/25 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2">
              <Camera className="w-4 h-4 md:w-5 md:h-5" />
              <span>Virtual Tour</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto opacity-80 px-4"
            style={{
              animation: `fadeInUp 1s ease-out forwards`,
              animationDelay: "1.4s",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-blue-500/15 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4 hover:bg-blue-500/25 transition-colors"
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-300">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Hidden on small mobile, shown on larger screens */}
        <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 md:px-6">
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
                className="group bg-blue-500/10 backdrop-blur-md border border-white/20 hover:bg-blue-500/20 rounded-xl p-3 md:p-4 text-center transition-all duration-300 hover:scale-105"
              >
                <action.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-blue-300 group-hover:scale-110 transition-transform" />
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
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
