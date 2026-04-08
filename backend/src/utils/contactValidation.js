const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeContactPayload(payload = {}) {
  const normalizedName = String(payload.name || "").trim();
  const normalizedEmail = String(payload.email || "").trim().toLowerCase();
  const normalizedInterest = String(payload.interest || "").trim();
  const normalizedMessage = String(payload.message || "").trim();

  return {
    name: normalizedName,
    email: normalizedEmail,
    interest: normalizedInterest,
    message: normalizedMessage,
  };
}

function validateContactPayload(payload = {}) {
  const normalized = normalizeContactPayload(payload);

  if (!normalized.name || !normalized.email || !normalized.interest || !normalized.message) {
    return {
      isValid: false,
      message: "All fields are required",
      normalized,
    };
  }

  if (!EMAIL_PATTERN.test(normalized.email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address",
      normalized,
    };
  }

  if (normalized.name.length < 2 || normalized.interest.length < 3 || normalized.message.length < 10) {
    return {
      isValid: false,
      message: "Please provide complete contact details and project information",
      normalized,
    };
  }

  return {
    isValid: true,
    message: "",
    normalized,
  };
}

module.exports = {
  EMAIL_PATTERN,
  normalizeContactPayload,
  validateContactPayload,
};
