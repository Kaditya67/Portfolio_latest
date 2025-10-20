import "dotenv/config";

const parseList = (str = "") =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const env = {
  PORT: parseInt(process.env.PORT ?? "3000", 10),
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  FRONTEND_URLS: parseList(process.env.FRONTEND_URLS),
  ADMIN_URLS: parseList(process.env.ADMIN_URLS),
  NODE_ENV: process.env.NODE_ENV ?? "development",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN ?? "localhost",
  ADMIN_SETUP_TOKEN: process.env.ADMIN_SETUP_TOKEN ?? "",
  PASSWORD_MIN_LENGTH: parseInt(process.env.PASSWORD_MIN_LENGTH ?? "8", 10),
  RESET_TOKEN_EXPIRES_MIN: parseInt(process.env.RESET_TOKEN_EXPIRES_MIN ?? "15", 10),
};

// 🔍 Validate required envs
const missing = [];
if (!env.MONGO_URI) missing.push("MONGO_URI");
if (!env.JWT_SECRET) missing.push("JWT_SECRET");

if (missing.length > 0) {
  console.error(`[server] ❌ Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1); // fail fast instead of silently running
}

console.log(`[server] ✅ Environment loaded (${env.NODE_ENV})`);
