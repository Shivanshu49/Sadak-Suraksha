import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { getIncidents, getHospitals } from "../services/api";

// Fix Leaflet default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const incidentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const hospitalIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Auto-fit map bounds to markers
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, { padding: [40, 40], maxZoom: 14 });
    }
  }, [positions, map]);
  return null;
}

const sevColor = {
  High: "text-red-400",
  Medium: "text-yellow-400",
  Low: "text-green-400",
};

export default function MapView() {
  const [incidents, setIncidents] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showHospitals, setShowHospitals] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getIncidents(1), getHospitals()])
      .then(([incRes, hosRes]) => {
        setIncidents(incRes.data.incidents || []);
        setHospitals(hosRes.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Lucknow centre as default
  const defaultCenter = [26.8467, 80.9462];

  const allPositions = [
    ...incidents.map((i) => [i.location.lat, i.location.lng]),
    ...(showHospitals
      ? hospitals.map((h) => [h.location.lat, h.location.lng])
      : []),
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400 text-lg animate-pulse">Loading map…</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={showHospitals}
            onChange={() => setShowHospitals(!showHospitals)}
            className="accent-green-500"
          />
          Show Hospitals
        </label>
        <span className="text-xs text-slate-500">
          🔴 Incidents &nbsp; 🟢 Hospitals
        </span>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg" style={{ height: "70vh" }}>
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />

          {allPositions.length > 0 && <FitBounds positions={allPositions} />}

          {/* Incident markers */}
          {incidents.map((inc) => (
            <Marker
              key={inc._id}
              position={[inc.location.lat, inc.location.lng]}
              icon={incidentIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">
                    Severity:{" "}
                    <span className={sevColor[inc.severity]}>
                      {inc.severity}
                    </span>
                  </p>
                  <p>Status: {inc.status}</p>
                  <p>
                    {new Date(inc.timestamp).toLocaleString()}
                  </p>
                  {inc.nearestHospital && (
                    <p className="mt-1">
                      🏥 {inc.nearestHospital.name} (
                      {inc.nearestHospital.distance_km} km)
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Hospital markers */}
          {showHospitals &&
            hospitals.map((h) => (
              <Marker
                key={h._id}
                position={[h.location.lat, h.location.lng]}
                icon={hospitalIcon}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{h.name}</p>
                    <p>{h.address}</p>
                    <p>📞 {h.contact}</p>
                    <p className="capitalize text-xs text-slate-500">
                      {h.type}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
