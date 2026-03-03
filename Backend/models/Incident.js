import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number
  },
  image_url: String,
  severity: String,
  confidence: Number,
  reported_by: String,
  nearestHospital: {
    name: String,
    contact: String,
    distance_km: String,
    maps_link: String
  },
  status: {
    type: String,
    enum: ["reported", "responding", "resolved"],
    default: "reported"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Incident", incidentSchema);
