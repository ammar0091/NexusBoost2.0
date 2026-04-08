const test = require("node:test");
const assert = require("node:assert/strict");

const { createRateLimiter } = require("../src/middleware/rateLimit");

test("rate limiter blocks requests after maxRequests", () => {
  const limiter = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 2,
    message: "Too many requests",
  });

  const req = {
    headers: {},
    ip: "127.0.0.1",
    path: "/api/contact",
    connection: { remoteAddress: "127.0.0.1" },
  };

  const res = {
    statusCode: 200,
    headers: {},
    payload: null,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
  };

  let nextCalls = 0;
  const next = () => {
    nextCalls += 1;
  };

  limiter(req, res, next);
  limiter(req, res, next);
  limiter(req, res, next);

  assert.equal(nextCalls, 2);
  assert.equal(res.statusCode, 429);
  assert.equal(res.payload.message, "Too many requests");
  assert.ok(res.headers["Retry-After"]);
});
