import mongoose from "mongoose";

const connectDB = async (mongoUri, retries = 5) => {
  const options = {
    maxPoolSize: 10, // Connection pool size
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
  };

  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUri, options);
      console.log("✅ MongoDB connected successfully");

      // Connection event handlers
      mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB connection error:", err.message);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
      });

      mongoose.connection.on("reconnected", () => {
        console.log("✅ MongoDB reconnected");
      });

      return;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${i + 1}/${retries} failed:`, err.message);
      
      if (i === retries - 1) {
        console.error("❌ All MongoDB connection attempts failed. Exiting...");
        process.exit(1);
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      console.log(`⏳ Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default connectDB;
