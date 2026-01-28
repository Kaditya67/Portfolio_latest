import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import api from "./routes/index.js";
import { env } from "./config/env.js";

const app = express();

// CORS
const origins = [...env.FRONTEND_URLS, ...env.ADMIN_URLS];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || origins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    maxAge: 86400, // Cache preflight requests for 24 hours
  })
);

// Security & Middleware
app.use(helmet());
app.use(compression()); // Compress all responses
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Rate limiting - adjusted for better UX
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 second timeout
  res.setTimeout(30000);
  next();
});

// Routes
app.get("/api/v1/health", (_req, res) => res.json({ ok: true, timestamp: Date.now() }));
app.use("/api/v1", api);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("[server] error:", err?.message);
  console.error(err?.stack);
  
  // Don't leak error details in production
  const message = env.NODE_ENV === "production" ? "Server error" : err?.message || "Server error";
  res.status(err.status || 500).json({ error: message });
});

export default app;
