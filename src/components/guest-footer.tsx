import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Shield,
} from "lucide-react";

export const GuestFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Brand Section */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
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

            <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">
              Discover the natural beauty and rich culture of Tubigon, Bohol.
              From pristine beaches to historical landmarks, we're your trusted
              guide to an unforgettable island experience.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <div className="flex items-center justify-center space-x-3 group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-gray-300">+63 38 411 5555</span>
              </div>

              <div className="flex items-center justify-center space-x-3 group">
                <div className="bg-teal-500/20 p-2 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-teal-300" />
                </div>
                <span className="text-gray-300">visit@tubigon.gov.ph</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-4">Follow Our Journey</h5>
            <div className="flex items-center justify-center space-x-4">
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
    </footer>
  );
};
