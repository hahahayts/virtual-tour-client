import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Compass,
  Bed,
  Camera,
  Car,
  Shield,
  Heart,
  Building,
  Home,
  TreePine,
  Globe,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

export const GuestFooter = () => {
  const destinations = [
    "Chocolate Hills",
    "Tarsier Sanctuary",
    "Baclayon Church",
    "Blood Compact Site",
    "Loboc River",
    "Mag-Aso Falls",
  ];

  const accommodationTypes = [
    { icon: Building, name: "Hotels", count: "25+" },
    { icon: Home, name: "Inns", count: "40+" },
    { icon: TreePine, name: "Resorts", count: "15+" },
    { icon: Bed, name: "Apartments", count: "30+" },
  ];

  const quickLinks = [
    { name: "About Tubigon", href: "#about" },
    { name: "Travel Guide", href: "#guide" },
    { name: "Local Events", href: "#events" },
    { name: "Transportation", href: "#transport" },
    { name: "Emergency Info", href: "#emergency" },
    { name: "Weather Updates", href: "#weather" },
  ];

  return (
    <footer className="relative  bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <g fill="#ffffff" fill-opacity="0.1">
                  <circle cx="30" cy="30" r="2"/>
                  <circle cx="10" cy="10" r="1"/>
                  <circle cx="50" cy="10" r="1"/>
                  <circle cx="10" cy="50" r="1"/>
                  <circle cx="50" cy="50" r="1"/>
                </g>
              </g>
            </svg>
          `)}')`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Tara na sa <span className="text-yellow-300">TUBIGON</span>
                </h3>
                <p className="text-blue-200 text-sm">Your Gateway to Bohol</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover the natural beauty and rich culture of Tubigon, Bohol.
              From pristine beaches to historical landmarks, we're your trusted
              guide to an unforgettable island experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-gray-300">+63 38 411 5555</span>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-teal-500/20 p-2 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-teal-300" />
                </div>
                <span className="text-gray-300">visit@tubigon.gov.ph</span>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Clock className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-gray-300">24/7 Tourism Hotline</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Compass className="w-5 h-5 text-blue-300" />
              <h4 className="text-xl font-semibold">Popular Destinations</h4>
            </div>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <a
                    href={`#${destination.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-yellow-300 transition-colors"></div>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {destination}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#all-destinations"
              className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mt-4 group transition-colors"
            >
              <span>View All Destinations</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Accommodations */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Bed className="w-5 h-5 text-teal-300" />
              <h4 className="text-xl font-semibold">Accommodations</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {accommodationTypes.map((type, index) => (
                <a
                  key={index}
                  href={`#${type.name.toLowerCase()}`}
                  className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-white/10 rounded-lg p-3 hover:from-blue-500/20 hover:to-teal-500/20 transition-all duration-300 hover:scale-105 group"
                >
                  <type.icon className="w-5 h-5 text-blue-300 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-white">
                    {type.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {type.count} options
                  </div>
                </a>
              ))}
            </div>

            <a
              href="#accommodations"
              className="inline-flex items-center space-x-2 text-teal-300 hover:text-teal-200 group transition-colors"
            >
              <span>Browse All Stays</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Quick Links & Services */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="w-5 h-5 text-green-300" />
              <h4 className="text-xl font-semibold">Quick Links</h4>
            </div>

            <ul className="space-y-3 mb-6">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-yellow-300 transition-colors"></div>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Services Icons */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Camera className="w-4 h-4" />
                <span>Virtual Tours</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Car className="w-4 h-4" />
                <span>Transport</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <h5 className="text-lg font-semibold">Follow Our Journey</h5>
              <div className="flex items-center space-x-4">
                {[
                  {
                    icon: Facebook,
                    color: "hover:text-blue-400",
                    bg: "hover:bg-blue-500/20",
                  },
                  {
                    icon: Instagram,
                    color: "hover:text-pink-400",
                    bg: "hover:bg-pink-500/20",
                  },
                  {
                    icon: Twitter,
                    color: "hover:text-sky-400",
                    bg: "hover:bg-sky-500/20",
                  },
                  {
                    icon: Youtube,
                    color: "hover:text-red-400",
                    bg: "hover:bg-red-500/20",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 rounded-full bg-white/10 border border-white/20 text-white ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <span className="text-gray-300 whitespace-nowrap">
                Stay updated:
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-md"
                />
                <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© 2025 Tubigon Tourism Board. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>for Bohol</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure & Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-friendly bottom padding */}
      <div className="h-4 md:h-0"></div>
    </footer>
  );
};
