import Hospital from "../models/Hospital.js";
import findNearbyHospitals from "../services/googleMaps.js";

/**
 * GET /api/hospitals/nearby?lat=XX&lng=XX&radius=10000
 * Find hospitals near a given location (from MongoDB, Haversine)
 */
export const getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "lat and lng query params are required" });
    }

    const hospitals = await findNearbyHospitals(
      parseFloat(lat),
      parseFloat(lng),
      parseInt(radius) || 10000
    );

    res.json({
      count: hospitals.length,
      hospitals
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/hospitals — List all hospitals
 */
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/hospitals — Add a new hospital
 */
export const addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /api/hospitals/:id — Remove a hospital
 */
export const deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ message: "Hospital removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
