function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || req.connection?.remoteAddress || "unknown";
}

function createRateLimiter({ windowMs, maxRequests, message }) {
  const store = new Map();

  return function rateLimiter(req, res, next) {
    const now = Date.now();
    const key = `${getClientIp(req)}:${req.path}`;
    const currentEntry = store.get(key);

    if (!currentEntry || currentEntry.expiresAt <= now) {
      store.set(key, { count: 1, expiresAt: now + windowMs });
      return next();
    }

    if (currentEntry.count >= maxRequests) {
      const retryAfter = Math.ceil((currentEntry.expiresAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({
        message: message || "Too many requests. Please try again later.",
      });
    }

    currentEntry.count += 1;
    store.set(key, currentEntry);
    return next();
  };
}

module.exports = { createRateLimiter };
