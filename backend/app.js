import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import api from "./routes/index.js"; // your routes
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
  })
);

// Security & Middleware
app.use(helmet());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

// Routes
app.get("/api/v1/health", (_req, res) => res.json({ ok: true }));
app.use("/api/v1", api);

// Error handler
app.use((err, _req, res, _next) => {
  console.error("[server] error:", err?.message);
  res.status(500).json({ error: "Server error" });
});

export default app;
