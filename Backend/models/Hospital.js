import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  contact: String,
  address: String,
  type: {
    type: String,
    enum: ["government", "private", "clinic"],
    default: "government"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Hospital", hospitalSchema);
