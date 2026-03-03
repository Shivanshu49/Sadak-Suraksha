import express from "express";
import { addResponder, getResponders, deleteResponder } from "../controllers/responderController.js";

const router = express.Router();

router.post("/", addResponder);
router.get("/", getResponders);
router.delete("/:id", deleteResponder);

export default router;
