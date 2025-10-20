import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

// Connect to MongoDB
connectDB(env.MONGO_URI);

// Start server
app.listen(env.PORT, () => {
  console.log(`[server] API running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
