import cache from "../utils/cache.js";

/**
 * Cache middleware for GET requests
 * @param {number} ttl - Time to live in seconds (default: 300)
 * @returns {Function} Express middleware
 */
export const cacheMiddleware = (ttl = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      // Set cache headers
      res.setHeader("X-Cache", "HIT");
      return res.json(cachedResponse);
    }

    // Store original res.json
    const originalJson = res.json.bind(res);

    // Override res.json to cache the response
    res.json = (data) => {
      cache.set(key, data, ttl);
      res.setHeader("X-Cache", "MISS");
      return originalJson(data);
    };

    next();
  };
};

/**
 * Invalidate cache by pattern
 * @param {string} pattern - Pattern to match cache keys
 */
export const invalidateCache = (pattern) => {
  cache.delPattern(`cache:${pattern}`);
};

export default cacheMiddleware;
