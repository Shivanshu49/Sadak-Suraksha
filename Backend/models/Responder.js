import mongoose from "mongoose";

const responderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["police", "ambulance", "fire", "hospital", "admin"],
    default: "ambulance"
  },
  location: {
    lat: Number,
    lng: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Responder", responderSchema);
