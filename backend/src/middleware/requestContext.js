const crypto = require("crypto");

function createRequestId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return crypto.randomBytes(16).toString("hex");
}

function requestContext(req, res, next) {
  const incomingRequestId = req.headers["x-request-id"];
  req.requestId =
    typeof incomingRequestId === "string" && incomingRequestId.trim()
      ? incomingRequestId.trim()
      : createRequestId();

  res.setHeader("x-request-id", req.requestId);
  next();
}

module.exports = { requestContext };
