import { ExternalLink } from "lucide-react";
import type { InfoPillProps } from "../types";

export const InfoPill: React.FC<InfoPillProps> = ({
  icon: Icon,
  text,
  href,
  variant = "secondary",
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      group flex items-center text-sm font-medium rounded-xl px-4 py-2.5 
      border transition-all duration-300 hover:scale-105 hover:shadow-lg
      animate-in slide-in-from-top-5 
      ${
        variant === "primary"
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 hover:from-sky-600 hover:to-blue-700"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
      }
    `}
  >
    <Icon
      className={`w-4 h-4 mr-2 transition-transform group-hover:scale-110 ${
        variant === "primary" ? "text-sky-100" : "text-sky-600"
      }`}
    />
    <span>{text}</span>
    <ExternalLink
      className={`w-3 h-3 ml-2 opacity-60 ${
        variant === "primary" ? "text-sky-100" : "text-gray-500"
      }`}
    />
  </a>
);
