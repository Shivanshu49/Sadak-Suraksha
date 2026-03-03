import axios from "axios";
import twilio from "twilio";
import Incident from "../models/Incident.js";
import Responder from "../models/Responder.js";
import findNearbyHospitals from "../services/googleMaps.js";
import { sendWhatsAppAlert } from "../services/alertService.js";

const getClient = () => twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const handleWhatsApp = async (req, res) => {
  try {
    const message = req.body.Body;
    const latitude = req.body.Latitude;
    const longitude = req.body.Longitude;
    const mediaUrl = req.body.MediaUrl0;
    // Fix: URL decoding turns "whatsapp:+91..." into "whatsapp: 91..." — normalize it
    const from = (req.body.From || "").replace("whatsapp: ", "whatsapp:+");

    console.log(`WhatsApp message from ${from}: ${message}`);

    // If image exists, call AI
    let severity = "Unknown";
    let confidence = 0;

    if (mediaUrl) {
      try {
        const aiResponse = await axios.post("http://localhost:8000/analyze", {
          image_url: mediaUrl
        });
        severity = aiResponse.data.severity;
        confidence = aiResponse.data.confidence;
      } catch (aiErr) {
        console.error("AI service unavailable, using defaults:", aiErr.message);
      }
    }

    // Save incident
    let incident = null;
    let nearestHospital = null;

    if (latitude && longitude) {
      incident = await Incident.create({
        location: { lat: latitude, lng: longitude },
        image_url: mediaUrl,
        severity,
        confidence,
        reported_by: from
      });
      console.log(`Incident saved: ${incident._id}`);

      // Find nearest hospitals (free, from MongoDB + Haversine)
      try {
        const hospitals = await findNearbyHospitals(latitude, longitude);
        nearestHospital = hospitals[0] || null;
        if (nearestHospital) {
          console.log(`Nearest hospital: ${nearestHospital.name} (${nearestHospital.distance_meters}m)`);
          // Save in incident
          incident.nearestHospital = {
            name: nearestHospital.name,
            contact: nearestHospital.contact,
            distance_km: nearestHospital.distance_km,
            maps_link: nearestHospital.maps_link
          };
          await incident.save();
        }
      } catch (mapErr) {
        console.error("Hospital lookup failed:", mapErr.message);
      }

      // Alert all active responders
      try {
        const responders = await Responder.find({ active: true });
        if (responders.length > 0) {
          const alertPromises = responders.map((r) =>
            sendWhatsAppAlert(r.phone, incident, nearestHospital)
          );
          await Promise.allSettled(alertPromises);
          console.log(`Alerted ${responders.length} responders`);
        }
      } catch (alertErr) {
        console.error("Responder alert failed:", alertErr.message);
      }
    }

    // Build WhatsApp reply
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    let replyBody;

    if (incident) {
      const lines = [
        `🚨 *Sadak Suraksha Alert*`,
        ``,
        `Incident reported successfully!`,
        `📍 Location: ${mapsLink}`,
        `⚠️ Severity: ${severity}`,
        `📊 Confidence: ${(confidence * 100).toFixed(0)}%`
      ];

      if (nearestHospital) {
        lines.push(``);
        lines.push(`🏥 Nearest Hospital: *${nearestHospital.name}*`);
        lines.push(`📏 Distance: ${(nearestHospital.distance_meters / 1000).toFixed(1)} km`);
        lines.push(`📍 Hospital: ${nearestHospital.maps_link}`);
      }

      lines.push(``);
      lines.push(`Help is on the way 🚑`);
      replyBody = lines.join("\n");
    } else {
      replyBody = `✅ Message received! Please share your *location* and an *image* to report an incident.`;
    }

    await getClient().messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: replyBody
    });

    // Respond with TwiML (Twilio expects a response)
    res.set("Content-Type", "text/xml");
    res.send(`<Response></Response>`);
  } catch (error) {
    console.error("WhatsApp webhook error:", error.message || error);
    if (error.code) console.error("Twilio error code:", error.code, error.moreInfo);
    res.status(500).json({ error: error.message });
  }
};
