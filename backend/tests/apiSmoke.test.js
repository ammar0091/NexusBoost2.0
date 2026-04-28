const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const ORIGINAL_ENV = {
  DB_DEGRADED_MODE: process.env.DB_DEGRADED_MODE,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};

process.env.DB_DEGRADED_MODE = "true";
process.env.ADMIN_EMAIL = "admin@nexusboost.local";
process.env.ADMIN_PASSWORD = "Admin@12345";
process.env.JWT_SECRET = "test_secret_for_api_smoke";

const app = require("../src/app");

test.after(() => {
  process.env.DB_DEGRADED_MODE = ORIGINAL_ENV.DB_DEGRADED_MODE;
  process.env.ADMIN_EMAIL = ORIGINAL_ENV.ADMIN_EMAIL;
  process.env.ADMIN_PASSWORD = ORIGINAL_ENV.ADMIN_PASSWORD;
  process.env.JWT_SECRET = ORIGINAL_ENV.JWT_SECRET;
});

test("GET /api/health returns healthy payload", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.ok(response.body.requestId);
  assert.equal(typeof response.body.db, "object");
});

test("GET /api/blogs returns degraded collection response without DB", async () => {
  const response = await request(app).get("/api/blogs");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data, []);
  assert.equal(response.body.degraded, true);
});

test("POST /api/auth/login returns admin token in degraded mode", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@nexusboost.local",
      password: "Admin@12345",
    });

  assert.equal(response.status, 200);
  assert.ok(response.body.token);
  assert.equal(response.body.user.role, "admin");
});

test("GET /api/admin/stats works with valid admin token", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@nexusboost.local",
      password: "Admin@12345",
    });

  const token = login.body.token;
  const response = await request(app)
    .get("/api/admin/stats")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.degraded, true);
  assert.equal(typeof response.body.data.contactCount, "number");
});
