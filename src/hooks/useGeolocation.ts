import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => setPosition(pos),
      (err) => setError(err.message)
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error };
};
