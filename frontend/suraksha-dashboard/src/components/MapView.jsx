import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fallback to default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

// Custom Icons definitions
const ACCIDENT_RED = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444" stroke="%23991b1b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const HOSPITAL_BLUE = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233b82f6" stroke="%231d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cross"><path d="M12 2v20"/><path d="M2 12h20"/></svg>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function MapFocus({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom() || 11);
  }, [center, map]);
  return null;
}

export default function MapView({ incidents }) {
  const defaultCenter = [28.6139, 77.2090]; // Default Delhi center
  const activeCenter = incidents.length > 0
    ? [incidents[0].location.lat, incidents[0].location.lng]
    : defaultCenter;

  return (
    <MapContainer
      center={activeCenter}
      zoom={11}
      style={{ height: "100%", minHeight: "450px", width: "100%", background: "#020617" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapFocus center={activeCenter} />

      {incidents.map((inc) => {
        const hasHospital = inc.nearestHospital && inc.nearestHospital.location;
        const incPos = [inc.location.lat, inc.location.lng];
        return (
          <React.Fragment key={inc._id}>
            <Marker position={incPos} icon={ACCIDENT_RED}>
              <Popup className="text-slate-900">
                <span className="font-bold text-red-600">Accident</span><br />
                Confidence: {inc.confidence}%
              </Popup>
            </Marker>

            {hasHospital && (
              <>
                <Marker position={[inc.nearestHospital.location.lat, inc.nearestHospital.location.lng]} icon={HOSPITAL_BLUE}>
                  <Popup className="text-slate-900">
                    <span className="font-bold text-blue-600">{inc.nearestHospital.name}</span><br />
                    Distance: {inc.nearestHospital.distance_km}km
                  </Popup>
                </Marker>
                <Polyline
                  positions={[incPos, [inc.nearestHospital.location.lat, inc.nearestHospital.location.lng]]}
                  color="#ef4444"
                  weight={2}
                  dashArray="4 8"
                  opacity={0.6}
                />
              </>
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
