import { Building } from "lucide-react";

export const NoResults = ({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) => (
  <div
    className="text-center py-12 bg-white rounded-lg shadow-md"
    style={{
      animation: "fadeInUp 0.6s ease-out 0.2s both",
    }}
  >
    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      No accommodations found
    </h3>
    <p className="text-gray-600 mb-4">
      Try adjusting your search or filter criteria
    </p>
    <button
      onClick={onClearFilters}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
    >
      Clear All Filters
    </button>
  </div>
);
