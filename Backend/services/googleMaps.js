import Hospital from "../models/Hospital.js";

/**
 * Haversine formula — distance between two lat/lng points in meters
 */
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // Earth's radius in meters
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // distance in meters
}

/**
 * Find nearby hospitals from MongoDB, sorted by distance (Haversine)
 * No API key needed — 100% free
 * @param {number} lat - Latitude of the incident
 * @param {number} lng - Longitude of the incident
 * @param {number} radiusMeters - Max radius in meters (default 10km)
 * @returns {Array} - Hospitals sorted by distance
 */
export const findNearbyHospitals = async (lat, lng, radiusMeters = 10000) => {
  try {
    const allHospitals = await Hospital.find();

    const hospitals = allHospitals
      .map((h) => {
        const distance_meters = getDistance(lat, lng, h.location.lat, h.location.lng);
        return {
          _id: h._id,
          name: h.name,
          address: h.address || "N/A",
          contact: h.contact || "N/A",
          type: h.type,
          location: h.location,
          distance_meters,
          distance_km: (distance_meters / 1000).toFixed(1),
          maps_link: `https://www.google.com/maps?q=${h.location.lat},${h.location.lng}`
        };
      })
      .filter((h) => h.distance_meters <= radiusMeters)
      .sort((a, b) => a.distance_meters - b.distance_meters);

    return hospitals;
  } catch (error) {
    console.error("Hospital lookup error:", error.message);
    return [];
  }
};

export { getDistance };
export default findNearbyHospitals;
