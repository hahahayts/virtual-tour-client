import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface RoutingProps {
  destination: {
    latitude: number;
    longitude: number;
  };
}

const Routing = ({ destination }: RoutingProps) => {
  const map = useMap();
  const { position } = useGeolocation();

  useEffect(() => {
    if (!position || !destination) return;

    // Remove any existing routing controls first
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(position.coords.latitude, position.coords.longitude),
        L.latLng(destination.latitude, destination.longitude),
      ],
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      collapsible: false,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: "#FF0000", opacity: 0.8, weight: 5 }], // Explicit red line style
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      },
      plan: L.Routing.plan([], {
        createMarker: () => false,
        draggableWaypoints: false,
      }),
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, position, destination]);

  return null;
};

interface MapNavigationProps {
  destination: {
    latitude: number;
    longitude: number;
    name?: string;
  };
}

export const MapNavigation = ({ destination }: MapNavigationProps) => {
  const { position, error } = useGeolocation();

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );

  if (!position)
    return (
      <div className="p-4 bg-blue-100 text-blue-700 rounded-lg animate-pulse">
        Loading your location...
      </div>
    );

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[position.coords.latitude, position.coords.longitude]}
        markerZoomAnimation={true}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker
          position={[position.coords.latitude, position.coords.longitude]}
          icon={defaultIcon}
        >
          <Popup className="font-sans">Your Current Location</Popup>
        </Marker>
        <Marker
          position={[destination.latitude, destination.longitude]}
          interactive={true}
          icon={defaultIcon}
        >
          <Popup className="font-sans">
            {destination.name || "Destination"}
          </Popup>
        </Marker>
        <Routing destination={destination} />
      </MapContainer>
    </div>
  );
};
