const dotenv = require("dotenv");

dotenv.config();

const app = require("../src/app");
const { connectDB } = require("../src/config/db");
const { ensureDefaultAdmin } = require("../src/utils/seedAdmin");

const mongoUri = String(process.env.MONGO_URI || "").trim();
const isProduction = process.env.NODE_ENV === "production";

let initPromise = null;
let missingMongoWarned = false;

async function initServerless() {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    if (!process.env.JWT_SECRET) {
      if (isProduction) {
        throw new Error("JWT_SECRET must be set in production");
      }

      process.env.JWT_SECRET = "dev_only_change_me";
      console.warn("JWT_SECRET not set, using insecure dev fallback");
    }

    if (!mongoUri) {
      if (!missingMongoWarned) {
        console.warn("MONGO_URI not set; starting API in degraded mode without database connection");
        missingMongoWarned = true;
      }
      process.env.DB_DEGRADED_MODE = "true";
      return;
    }

    try {
      await connectDB(mongoUri);
      await ensureDefaultAdmin({ isProduction });
      process.env.DB_DEGRADED_MODE = "false";
    } catch (error) {
      console.error(
        "Mongo initialization failed; continuing in degraded mode:",
        error?.message || error
      );
      process.env.DB_DEGRADED_MODE = "true";
    }
  })().catch((error) => {
    initPromise = null;
    throw error;
  });

  return initPromise;
}

module.exports = async (req, res) => {
  try {
    await initServerless();
    return app(req, res);
  } catch (error) {
    console.error("Serverless init failed:", error);
    return res.status(500).json({
      message: "Server initialization failed",
    });
  }
};
