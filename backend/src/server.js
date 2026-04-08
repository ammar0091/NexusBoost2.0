const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = require("./app");
const { connectDB } = require("./config/db");
const { ensureDefaultAdmin } = require("./utils/seedAdmin");

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nexusboost";
const isProduction = process.env.NODE_ENV === "production";

let httpServer = null;
let shuttingDown = false;

if (!process.env.JWT_SECRET) {
  if (isProduction) {
    throw new Error("JWT_SECRET must be set in production");
  }

  process.env.JWT_SECRET = "dev_only_change_me";
  console.warn("JWT_SECRET not set, using insecure dev fallback");
}

async function startServer() {
  await connectDB(mongoUri);
  await ensureDefaultAdmin({ isProduction });

  httpServer = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

async function shutdown(signal, exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  try {
    if (httpServer) {
      await new Promise((resolve) => httpServer.close(resolve));
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close(false);
    }

    console.log("Graceful shutdown complete");
    process.exit(exitCode);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  shutdown("unhandledRejection", 1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  shutdown("uncaughtException", 1);
});

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
