const dns = require("node:dns");
const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

let connectionPromise = null;
let dnsConfigured = false;

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

function configureMongoDnsServers() {
  if (dnsConfigured) {
    return;
  }

  const dnsServers = String(process.env.MONGO_DNS_SERVERS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!dnsServers.length) {
    dnsConfigured = true;
    return;
  }

  dns.setServers(dnsServers);
  dnsConfigured = true;
}

async function connectDB(mongoUri) {
  configureMongoDnsServers();

  if (mongoose.connection.readyState === 1) {
    refreshDbHealth();
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  dbHealth.status = "connecting";
  dbHealth.lastError = null;
  refreshDbHealth();

  connectionPromise = mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 10),
    })
    .then((connection) => {
      refreshDbHealth();
      console.log("MongoDB connected");
      return connection;
    })
    .catch((error) => {
      dbHealth.status = "error";
      dbHealth.lastError = error?.message || "MongoDB connection failed";
      refreshDbHealth();
      console.error("MongoDB connection failed:", dbHealth.lastError);
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}

module.exports = { connectDB, getDbHealth, isDbReady };
