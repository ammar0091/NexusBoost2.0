function notFoundHandler(req, res) {
  res.status(404).json({
    message: "Route not found",
    requestId: req.requestId,
  });
}

function errorHandler(err, req, res, next) {
  const requestId = req.requestId || "unknown";
  console.error(`[${requestId}]`, err);

  if (err?.name === "ValidationError") {
    const firstError = Object.values(err.errors || {})[0];
    return res.status(400).json({
      message: firstError?.message || "Validation failed",
      requestId,
    });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path || "value"}`,
      requestId,
    });
  }

  if (err?.name === "MongoServerError" && err?.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      message: `${duplicateField} already exists`,
      requestId,
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode >= 500
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({ message, requestId });
}

module.exports = { notFoundHandler, errorHandler };
