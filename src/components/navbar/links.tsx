import { Link } from "react-router";
import { type LinkNavigationType } from ".";

interface Props {
  links: LinkNavigationType;
}

export const LinkNavigation = ({ links }: Props) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      <div className="p-2">
        {links.map((type, index) => (
          <Link
            key={index}
            to={`/${type.url.toLowerCase()}`}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-500/10 transition-colors group/item"
          >
            <type.icon className="w-6 h-6 text-blue-600 group-hover/item:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-medium text-gray-800">
                {type.name}
              </div>
              <div className="text-xs text-gray-600">{type.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
