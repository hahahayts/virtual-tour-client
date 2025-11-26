import { useState } from "react";
import { Route, Loader2 } from "lucide-react";

export function GetDirectionsButton({ destination }: any) {
  const [loading, setLoading] = useState(false);

  const handleGetDirections = () => {
    setLoading(true);

    // Try to get the user's current position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const originLat = pos.coords.latitude;
        const originLng = pos.coords.longitude;

        // Use both origin and destination
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destination.latitude},${destination.longitude}`;
        window.open(googleMapsUrl, "_blank");
        setLoading(false);
      },
      (error) => {
        console.error("Location access denied or unavailable:", error);
        // Fallback: open with only destination
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
        window.open(fallbackUrl, "_blank");
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={handleGetDirections}
      disabled={loading}
      className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          Getting your location...
        </>
      ) : (
        <>
          <Route className="h-4 w-4 sm:h-5 sm:w-5" />
          Get Directions
        </>
      )}
    </button>
  );
}
