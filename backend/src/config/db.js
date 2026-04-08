const mongoose = require("mongoose");

const dbHealth = {
  status: "disconnected",
  readyState: mongoose.connection.readyState,
  lastConnectedAt: null,
  lastError: null,
};

function refreshDbHealth() {
  dbHealth.readyState = mongoose.connection.readyState;

  if (mongoose.connection.readyState === 1) {
    dbHealth.status = "connected";
  } else if (mongoose.connection.readyState === 2) {
    dbHealth.status = "connecting";
  } else {
    dbHealth.status = "disconnected";
  }
}

mongoose.connection.on("connected", () => {
  refreshDbHealth();
  dbHealth.lastConnectedAt = new Date().toISOString();
  dbHealth.lastError = null;
});

mongoose.connection.on("disconnected", () => {
  refreshDbHealth();
});

mongoose.connection.on("error", (error) => {
  refreshDbHealth();
  dbHealth.lastError = error?.message || "Unknown database error";
});

function getDbHealth() {
  refreshDbHealth();
  return {
    ...dbHealth,
    dbName: mongoose.connection?.name || null,
  };
}

function isDbReady() {
  refreshDbHealth();
  return dbHealth.readyState === 1;
}

async function connectDB(mongoUri) {
  dbHealth.status = "connecting";
  dbHealth.lastError = null;
  refreshDbHealth();

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    refreshDbHealth();
    console.log("MongoDB connected");
  } catch (error) {
    dbHealth.status = "error";
    dbHealth.lastError = error?.message || "MongoDB connection failed";
    refreshDbHealth();
    console.error("MongoDB connection failed:", dbHealth.lastError);
    throw error;
  }
}

module.exports = { connectDB, getDbHealth, isDbReady };
