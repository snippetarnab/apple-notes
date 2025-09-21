import rateLimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }
    next();
  } catch (error) {
    console.log("Error in rateLimiter:", error);
    next(error);
  }
};

export default rateLimiter;
