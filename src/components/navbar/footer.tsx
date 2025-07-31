import { Globe, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="p-6 border-t border-white/20 space-y-4">
      <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500/30 to-teal-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 text-white hover:from-blue-500/40 hover:to-teal-500/40 transition-all duration-300">
        <Globe className="w-5 h-5" />
        <span className="font-medium">Language & Settings</span>
      </button>

      <div className="flex items-center justify-center space-x-6 text-white/60">
        <button className="flex items-center space-x-2 hover:text-white transition-colors">
          <Phone className="w-4 h-4" />
          <span className="text-sm">Contact</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-colors">
          <Mail className="w-4 h-4" />
          <span className="text-sm">Support</span>
        </button>
      </div>
    </div>
  );
};
