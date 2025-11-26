// components/DistanceFee.tsx
import { fetchData } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface DistanceFeeProps {
  ratePerKm: number; // pass the baseFee here
}

export const DistanceFee: React.FC<DistanceFeeProps> = ({ ratePerKm }) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch all destinations
  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => fetchData("destinations"),
  });

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setError("Unable to retrieve your location.")
    );
  }, []);

  if (isLoading)
    return <p className="text-sm text-gray-600">Loading destinations...</p>;
  if (fetchError)
    return <p className="text-sm text-red-500">Failed to load destinations.</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!data.destinations || data?.destinations.length === 0)
    return <p className="text-sm text-gray-500">No destinations available.</p>;
  if (!userLocation)
    return <p className="text-sm text-gray-600">Retrieving your location...</p>;

  // Use the rate directly as per-km cost
  // Typical rates: Jeepney ₱8-12/km, Tricycle ₱10-15/km, Van ₱15-25/km
  const actualRatePerKm = ratePerKm;

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 mb-2">
        Rate: ₱{actualRatePerKm.toFixed(2)} per kilometer
      </div>
      <div className="space-y-2">
        {data?.destinations.map((dest: any) => {
          const distance = getDistanceFromLatLonInKm(
            userLocation.lat,
            userLocation.lng,
            dest.latitude,
            dest.longitude
          );
          // Simple calculation: Distance × Rate per km
          const fee = distance * actualRatePerKm;

          return (
            <div
              key={dest.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 transition-colors"
            >
              <span className="font-medium text-gray-900">{dest.name}</span>
              <div className="text-right mt-1 sm:mt-0">
                <div className="text-sm text-gray-500">
                  {distance.toFixed(1)} km
                </div>
                <div className="text-lg font-bold text-amber-600">
                  ₱{fee.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Utility functions
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
