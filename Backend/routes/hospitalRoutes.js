import express from "express";
import { getNearbyHospitals, getAllHospitals, addHospital, deleteHospital } from "../controllers/hospitalController.js";

const router = express.Router();

// GET /api/hospitals — List all
router.get("/", getAllHospitals);

// GET /api/hospitals/nearby?lat=26.8&lng=80.9&radius=10000
router.get("/nearby", getNearbyHospitals);

// POST /api/hospitals — Add new
router.post("/", addHospital);

// DELETE /api/hospitals/:id — Remove
router.delete("/:id", deleteHospital);

export default router;
