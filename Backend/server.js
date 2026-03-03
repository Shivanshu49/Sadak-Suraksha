import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";
import incidentRoutes from "./routes/incidentRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import responderRoutes from "./routes/responderRoutes.js";

dotenv.config();

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/incidents", incidentRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/responders", responderRoutes);

// Webhook Routes
app.use("/webhook/whatsapp", whatsappRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", timestamp: new Date() }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
