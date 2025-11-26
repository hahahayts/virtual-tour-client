import { useState, useMemo } from "react";
import { MapPin, Car } from "lucide-react";
import { Header } from "@/components/guest/header";
import { SearchAndFilterBar } from "@/components/guest/search-filter";
import { LandTransportCard } from "@/components/guest/card/land-transpo";
import { fetchData } from "@/db";
import type { LandTranspoType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Error } from "@/components/guest/error";
import { Pending } from "@/components/guest/pending";

const cleanSearchTerm = (term: string) =>
  term.replace(/[^a-zA-Z0-9\s\-.,]/g, "");

const GuestLandTransportations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");
  const [viewMode, setViewMode] = useState<string>("grid");

  const { data, isPending, isError } = useQuery({
    queryKey: ["land-transportations"],
    queryFn: () => fetchData("land-transportations"),
  });

  const handleSearch = (term: string) => {
    setSearchTerm(cleanSearchTerm(term));
  };

  const filteredTransports = useMemo(() => {
    if (!data?.landTransportations) return [];

    return data.landTransportations.filter((transport: LandTranspoType) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        transport.name?.toLowerCase().includes(searchLower) ||
        transport.description?.toLowerCase().includes(searchLower) ||
        transport.operator?.toLowerCase().includes(searchLower) ||
        transport.vehicleType?.toLowerCase().includes(searchLower);

      const matchesType =
        selectedVehicleType === "All" ||
        transport.vehicleType === selectedVehicleType;

      return matchesSearch && matchesType && !transport.deletedAt;
    });
  }, [searchTerm, selectedVehicleType, data]);

  if (isPending) {
    return <Pending />;
  }

  if (isError) {
    return <Error name="Land Transportations in" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Land Transportations in"
        description="Convenient and reliable ground transportation options in Tubigon -
            from jeepneys to luxury vehicles"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilterBar
          name="land transportations"
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        {(searchTerm || selectedVehicleType !== "All") && (
          <div className="text-center">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedVehicleType("All");
              }}
              className="text-orange-600 hover:text-orange-800 underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="px-4 mb-6">
        <p className="text-center text-gray-600">
          {isPending
            ? "Loading..."
            : `${filteredTransports.length} land transport${
                filteredTransports.length !== 1 ? "s" : ""
              } available`}
        </p>
      </div>

      <div className="px-4 pb-12">
        {filteredTransports.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 max-w-md mx-auto">
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No land transportation found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all available
                options.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedVehicleType("All");
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                View All Options
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`max-w-6xl mx-auto ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {filteredTransports.map((transport: LandTranspoType) => (
              <LandTransportCard
                key={transport.id}
                transport={transport}
                isListView={viewMode === "list"}
              />
            ))}
          </div>
        )}
      </div>

      {/* <div className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Tubigon Transportation Hub
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="mb-2">
                    <strong>Main Terminal:</strong> Tubigon Public Market Area
                  </p>
                  <p className="mb-2">
                    <strong>Operating Hours:</strong> 5:00 AM - 10:00 PM
                  </p>
                  <p className="mb-2">
                    <strong>Information:</strong> +63 38 515 0000
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Services:</strong> Local & Inter-city routes
                  </p>
                  <p className="mb-2">
                    <strong>Payment:</strong> Cash, some accept digital
                  </p>
                  <p className="mb-2">
                    <strong>Tips:</strong> Negotiate fares for special trips
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {/* <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-110 flex items-center justify-center">
        <Car className="w-6 h-6" />
      </button> */}
    </div>
  );
};

export default GuestLandTransportations;
