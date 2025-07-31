import { Search } from "lucide-react";

export const NoResult = ({
  setSearchTerm,
  name,
}: {
  setSearchTerm: (s: string) => void;
  name: string;
}) => {
  return (
    <div
      className="text-center py-12"
      style={{
        animation: "fadeInUp 0.6s ease-out both",
      }}
    >
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No {name} found
      </h3>
      <p className="text-gray-600 mb-4">Try adjusting your search term</p>
      <button
        onClick={() => {
          setSearchTerm("");
        }}
        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
      >
        Clear Search
      </button>
    </div>
  );
};
