const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { createRateLimiter } = require("./middleware/rateLimit");
const { requestContext } = require("./middleware/requestContext");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { getDbHealth, isDbReady } = require("./config/db");

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const configuredOriginsRaw = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "";
const configuredOrigins = configuredOriginsRaw
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins]);
const allowAllOrigins = allowedOrigins.has("*");
const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowAllOrigins || allowedOrigins.has(origin) || localhostPattern.test(origin)) {
      return callback(null, true);
    }

    const corsError = new Error(`CORS blocked for origin: ${origin}`);
    corsError.statusCode = 403;
    return callback(corsError);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-request-id"],
};

const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: "Too many login attempts. Please try again in a few minutes.",
});

const formLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 20,
  message: "Too many submissions. Please wait before trying again.",
});

morgan.token("rid", (req) => req.requestId || "-");

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(requestContext);
app.use(express.json({ limit: "20mb" }));
app.use(morgan(":date[iso] :rid :method :url :status :response-time ms"));
app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "NexusBoost API is running",
    date: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    db: getDbHealth(),
    requestId: req.requestId,
  });
});

app.get("/api/health/live", (req, res) => {
  res.json({
    status: "alive",
    date: new Date().toISOString(),
    requestId: req.requestId,
  });
});

app.get("/api/health/ready", (req, res) => {
  const db = getDbHealth();
  const ready = isDbReady();

  res.status(ready ? 200 : 503).json({
    status: ready ? "ready" : "not_ready",
    date: new Date().toISOString(),
    db,
    requestId: req.requestId,
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/contact", formLimiter, contactRoutes);
app.use("/api/newsletter", formLimiter, newsletterRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
