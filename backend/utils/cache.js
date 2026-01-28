import NodeCache from "node-cache";

// Create cache instance with default TTL of 5 minutes
const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false, // Don't clone objects for better performance
});

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {any} Cached value or undefined
 */
export const get = (key) => {
  return cache.get(key);
};

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds (optional)
 * @returns {boolean} Success status
 */
export const set = (key, value, ttl) => {
  return cache.set(key, value, ttl);
};

/**
 * Delete value from cache
 * @param {string} key - Cache key
 * @returns {number} Number of deleted entries
 */
export const del = (key) => {
  return cache.del(key);
};

/**
 * Delete multiple values from cache by pattern
 * @param {string} pattern - Pattern to match keys (e.g., "projects:*")
 * @returns {number} Number of deleted entries
 */
export const delPattern = (pattern) => {
  const keys = cache.keys().filter((key) => key.startsWith(pattern.replace("*", "")));
  return cache.del(keys);
};

/**
 * Clear all cache
 */
export const flush = () => {
  cache.flushAll();
};

/**
 * Get cache statistics
 * @returns {object} Cache stats
 */
export const getStats = () => {
  return cache.getStats();
};

export default {
  get,
  set,
  del,
  delPattern,
  flush,
  getStats,
};
