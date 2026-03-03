import Incident from "../models/Incident.js";
import axios from "axios";
import findNearbyHospitals from "../services/googleMaps.js";
import { sendWhatsAppAlert } from "../services/alertService.js";
import Responder from "../models/Responder.js";

/**
 * POST /api/incidents — Create incident + find hospital + alert responders
 */
export const createIncident = async (req, res) => {
  try {
    const { lat, lng, image_url } = req.body;

    // Call AI service
    const aiResponse = await axios.post("http://localhost:8000/analyze", {
      image_url
    });

    const { severity, confidence } = aiResponse.data;

    const incident = await Incident.create({
      location: { lat, lng },
      image_url,
      severity,
      confidence
    });

    // Find nearest hospitals (free, from MongoDB + Haversine)
    const hospitals = await findNearbyHospitals(lat, lng);
    const nearestHospital = hospitals[0] || null;

    // Save nearest hospital in incident
    if (nearestHospital) {
      incident.nearestHospital = {
        name: nearestHospital.name,
        contact: nearestHospital.contact,
        distance_km: nearestHospital.distance_km,
        maps_link: nearestHospital.maps_link
      };
      await incident.save();
    }

    // Alert all active responders
    const responders = await Responder.find({ active: true });
    const alertPromises = responders.map((r) =>
      sendWhatsAppAlert(r.phone, incident, nearestHospital)
    );
    await Promise.allSettled(alertPromises);

    res.status(201).json({
      incident,
      nearest_hospital: nearestHospital,
      hospitals_found: hospitals.length,
      responders_alerted: responders.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/incidents — List all incidents (newest first)
 */
export const getIncidents = async (req, res) => {
  try {
    const { severity, limit = 50, page = 1 } = req.query;
    const filter = severity ? { severity } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [incidents, total] = await Promise.all([
      Incident.find(filter).sort({ timestamp: -1 }).skip(skip).limit(parseInt(limit)),
      Incident.countDocuments(filter)
    ]);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      incidents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/incidents/stats — Dashboard statistics
 */
export const getIncidentStats = async (req, res) => {
  try {
    const [total, bySeverity, last24h, last7d] = await Promise.all([
      Incident.countDocuments(),
      Incident.aggregate([
        { $group: { _id: "$severity", count: { $sum: 1 } } }
      ]),
      Incident.countDocuments({
        timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
      Incident.countDocuments({
        timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
    ]);

    const recentIncidents = await Incident.find()
      .sort({ timestamp: -1 })
      .limit(5);

    res.json({
      total_incidents: total,
      last_24_hours: last24h,
      last_7_days: last7d,
      by_severity: bySeverity,
      recent: recentIncidents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/incidents/:id — Get single incident
 */
export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
