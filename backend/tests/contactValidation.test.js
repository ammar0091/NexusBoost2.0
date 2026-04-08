const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeContactPayload,
  validateContactPayload,
} = require("../src/utils/contactValidation");

test("normalizeContactPayload trims and normalizes values", () => {
  const normalized = normalizeContactPayload({
    name: "  Jane Doe  ",
    email: "  Jane@Example.com  ",
    interest: "  SEO  ",
    message: "  Need help with website visibility.  ",
  });

  assert.equal(normalized.name, "Jane Doe");
  assert.equal(normalized.email, "jane@example.com");
  assert.equal(normalized.interest, "SEO");
  assert.equal(normalized.message, "Need help with website visibility.");
});

test("validateContactPayload rejects invalid email", () => {
  const result = validateContactPayload({
    name: "John",
    email: "invalid-email",
    interest: "SEO",
    message: "Need help with our organic performance.",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.message, "Please enter a valid email address");
});

test("validateContactPayload rejects too-short message", () => {
  const result = validateContactPayload({
    name: "John",
    email: "john@example.com",
    interest: "SEO",
    message: "Too short",
  });

  assert.equal(result.isValid, false);
  assert.equal(result.message, "Please provide complete contact details and project information");
});

test("validateContactPayload accepts valid payload", () => {
  const result = validateContactPayload({
    name: "John Smith",
    email: "john@example.com",
    interest: "Performance Marketing",
    message: "We need help improving paid campaign efficiency and landing page conversion.",
  });

  assert.equal(result.isValid, true);
  assert.equal(result.message, "");
  assert.equal(result.normalized.email, "john@example.com");
});
