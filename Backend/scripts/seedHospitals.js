import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Hospital from "../models/Hospital.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const hospitals = [
  {
    name: "KGMU Emergency Hospital",
    location: { lat: 26.8587, lng: 80.9210 },
    contact: "+915222257450",
    address: "Shah Mina Road, Chowk, Lucknow",
    type: "government"
  },
  {
    name: "Ram Manohar Lohia Hospital",
    location: { lat: 26.8545, lng: 80.9440 },
    contact: "+915222620607",
    address: "Vibhuti Khand, Gomti Nagar, Lucknow",
    type: "government"
  },
  {
    name: "Medanta Hospital Lucknow",
    location: { lat: 26.7952, lng: 80.9462 },
    contact: "+918429021111",
    address: "Shaheed Path, Lucknow",
    type: "private"
  },
  {
    name: "Sahara Hospital",
    location: { lat: 26.8322, lng: 80.9877 },
    contact: "+915224000000",
    address: "Viraj Khand, Gomti Nagar, Lucknow",
    type: "private"
  },
  {
    name: "Civil Hospital Lucknow",
    location: { lat: 26.8430, lng: 80.9350 },
    contact: "+915222620100",
    address: "Nadan Mahal Road, Lucknow",
    type: "government"
  },
  {
    name: "Balrampur Hospital",
    location: { lat: 26.8620, lng: 80.9170 },
    contact: "+915222230222",
    address: "Kaiserbagh, Lucknow",
    type: "government"
  },
  {
    name: "Era Medical College & Hospital",
    location: { lat: 26.9124, lng: 80.9408 },
    contact: "+915224077777",
    address: "Sarfarazganj, Lucknow",
    type: "private"
  },
  {
    name: "Command Hospital Lucknow",
    location: { lat: 26.8480, lng: 80.9140 },
    contact: "+915222482860",
    address: "Cantt Area, Lucknow",
    type: "government"
  },
  {
    name: "Apollo Hospital Lucknow",
    location: { lat: 26.8080, lng: 80.9660 },
    contact: "+918042888800",
    address: "Kanpur Road, Lucknow",
    type: "private"
  },
  {
    name: "CHC Mohanlalganj",
    location: { lat: 26.7490, lng: 80.9820 },
    contact: "+915222731100",
    address: "Mohanlalganj, Lucknow",
    type: "government"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing hospitals
    await Hospital.deleteMany({});
    console.log("Cleared existing hospitals");

    // Insert new hospitals
    const result = await Hospital.insertMany(hospitals);
    console.log(`✅ Seeded ${result.length} hospitals:`);
    result.forEach((h, i) => {
      console.log(`  ${i + 1}. ${h.name} (${h.type}) — ${h.location.lat}, ${h.location.lng}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
