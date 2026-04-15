function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || req.connection?.remoteAddress || "unknown";
}

function createRateLimiter({ windowMs, maxRequests, message }) {
  const store = new Map();
  const cleanupIntervalMs = Math.max(windowMs, 60 * 1000);
  let nextCleanupAt = Date.now() + cleanupIntervalMs;

  return function rateLimiter(req, res, next) {
    const now = Date.now();

    if (now >= nextCleanupAt && store.size) {
      for (const [key, value] of store.entries()) {
        if (!value || value.expiresAt <= now) {
          store.delete(key);
        }
      }
      nextCleanupAt = now + cleanupIntervalMs;
    }

    const key = `${getClientIp(req)}:${req.path}`;
    const currentEntry = store.get(key);

    if (!currentEntry || currentEntry.expiresAt <= now) {
      const nextEntry = { count: 1, expiresAt: now + windowMs };
      store.set(key, nextEntry);
      res.setHeader("X-RateLimit-Limit", String(maxRequests));
      res.setHeader("X-RateLimit-Remaining", String(Math.max(maxRequests - nextEntry.count, 0)));
      res.setHeader("X-RateLimit-Reset", String(Math.ceil(nextEntry.expiresAt / 1000)));
      return next();
    }

    if (currentEntry.count >= maxRequests) {
      const retryAfter = Math.ceil((currentEntry.expiresAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      res.setHeader("X-RateLimit-Limit", String(maxRequests));
      res.setHeader("X-RateLimit-Remaining", "0");
      res.setHeader("X-RateLimit-Reset", String(Math.ceil(currentEntry.expiresAt / 1000)));
      return res.status(429).json({
        message: message || "Too many requests. Please try again later.",
      });
    }

    currentEntry.count += 1;
    store.set(key, currentEntry);
    res.setHeader("X-RateLimit-Limit", String(maxRequests));
    res.setHeader("X-RateLimit-Remaining", String(Math.max(maxRequests - currentEntry.count, 0)));
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(currentEntry.expiresAt / 1000)));
    return next();
  };
}

module.exports = { createRateLimiter };
