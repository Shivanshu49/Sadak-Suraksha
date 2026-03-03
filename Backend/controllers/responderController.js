import Responder from "../models/Responder.js";

/**
 * POST /api/responders — Add a new responder
 */
export const addResponder = async (req, res) => {
  try {
    const responder = await Responder.create(req.body);
    res.status(201).json(responder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/responders — List all active responders
 */
export const getResponders = async (req, res) => {
  try {
    const responders = await Responder.find({ active: true });
    res.json(responders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /api/responders/:id — Remove a responder
 */
export const deleteResponder = async (req, res) => {
  try {
    await Responder.findByIdAndDelete(req.params.id);
    res.json({ message: "Responder removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
