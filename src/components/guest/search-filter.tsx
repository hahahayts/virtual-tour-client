import { Grid3X3, List, Search } from "lucide-react";

interface Props {
  searchTerm: string;
  handleSearch: (e: string) => void;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}

export const SearchAndFilterBar = ({
  searchTerm,
  handleSearch,
  setViewMode,
  viewMode,
}: Props) => {
  return (
    <div
      className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-8 shadow-xl"
      style={{
        animation: "fadeInUp 0.6s ease-out 0.2s both",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="search"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-white/50 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-white/50"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-white/50"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
