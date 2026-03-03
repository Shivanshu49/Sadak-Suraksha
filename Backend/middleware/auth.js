/**
 * Simple admin auth middleware using API key
 * Add ADMIN_API_KEY to your .env file
 * Pass it as x-api-key header in requests
 */
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!process.env.ADMIN_API_KEY) {
    // If no key configured, allow all (dev mode)
    return next();
  }

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }

  next();
};

export default authMiddleware;
