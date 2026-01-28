import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

// Connect to MongoDB
connectDB(env.MONGO_URI);

// Start server
const server = app.listen(env.PORT, () => {
  console.log(`[server] API running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  server.close(async () => {
    console.log("HTTP server closed");
    
    try {
      const mongoose = await import("mongoose");
      await mongoose.default.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
