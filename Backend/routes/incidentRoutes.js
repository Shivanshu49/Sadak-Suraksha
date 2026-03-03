import express from "express";
import { createIncident, getIncidents, getIncidentStats, getIncidentById } from "../controllers/incidentController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", createIncident);
router.get("/", getIncidents);
router.get("/stats", authMiddleware, getIncidentStats);
router.get("/:id", getIncidentById);

export default router;
