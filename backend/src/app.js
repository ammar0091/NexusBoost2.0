const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

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
const allowVercelPreviewOrigins = process.env.ALLOW_VERCEL_PREVIEW_ORIGINS === "true";
const vercelPreviewPattern = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;
const jsonBodyLimit = process.env.JSON_BODY_LIMIT || "2mb";

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowAllOrigins ||
      allowedOrigins.has(origin) ||
      localhostPattern.test(origin) ||
      (allowVercelPreviewOrigins && vercelPreviewPattern.test(origin))
    ) {
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

const publicReadCache = (req, res, next) => {
  if (req.method === "GET") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=300");
  }
  next();
};

const noStore = (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
};

morgan.token("rid", (req) => req.requestId || "-");

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(requestContext);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(compression({ threshold: 1024 }));
app.use(express.json({ limit: jsonBodyLimit }));
app.use(express.urlencoded({ extended: true, limit: jsonBodyLimit }));
app.use(morgan(":date[iso] :rid :method :url :status :response-time ms"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"), {
    maxAge: "365d",
    immutable: true,
    setHeaders(res) {
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

app.get("/api/health", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
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
  res.setHeader("Cache-Control", "no-store");
  res.json({
    status: "alive",
    date: new Date().toISOString(),
    requestId: req.requestId,
  });
});

app.get("/api/health/ready", (req, res) => {
  const db = getDbHealth();
  const ready = isDbReady();

  res.setHeader("Cache-Control", "no-store");
  res.status(ready ? 200 : 503).json({
    status: ready ? "ready" : "not_ready",
    date: new Date().toISOString(),
    db,
    requestId: req.requestId,
  });
});

app.use("/api", (req, res, next) => {
  const degradedMode = process.env.DB_DEGRADED_MODE === "true";
  if (!degradedMode || req.method === "OPTIONS") {
    return next();
  }

  if (req.path === "/health" || req.path === "/health/live" || req.path === "/health/ready") {
    return next();
  }

  if (req.path === "/auth/login" || req.path.startsWith("/admin")) {
    return next();
  }

  const listRoutes = new Set(["/blogs", "/projects", "/clients", "/teams"]);
  if (req.method === "GET" && listRoutes.has(req.path)) {
    return res.json({
      data: [],
      meta: { total: 0 },
      degraded: true,
      message: "Database is not configured yet. Set MONGO_URI in Vercel environment.",
    });
  }

  const slugRoutePatterns = [
    /^\/blogs\/slug\/[^/]+$/i,
    /^\/projects\/slug\/[^/]+$/i,
  ];
  if (req.method === "GET" && slugRoutePatterns.some((pattern) => pattern.test(req.path))) {
    return res.status(404).json({
      message: "Not found",
      degraded: true,
    });
  }

  return res.status(503).json({
    message: "Database is not configured yet. Set MONGO_URI in Vercel environment.",
    degraded: true,
  });
});

app.use("/api/auth", noStore, authLimiter, authRoutes);
app.use("/api/blogs", publicReadCache, blogRoutes);
app.use("/api/projects", publicReadCache, projectRoutes);
app.use("/api/clients", publicReadCache, clientRoutes);
app.use("/api/teams", publicReadCache, teamRoutes);
app.use("/api/contact", noStore, formLimiter, contactRoutes);
app.use("/api/newsletter", noStore, formLimiter, newsletterRoutes);
app.use("/api/admin", noStore, adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
