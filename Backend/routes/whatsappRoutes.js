import express from "express";
import { handleWhatsApp } from "../controllers/whatsappController.js";

const router = express.Router();

router.post("/", handleWhatsApp);

export default router;
