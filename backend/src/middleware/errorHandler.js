function notFoundHandler(req, res) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err?.name === "ValidationError") {
    const firstError = Object.values(err.errors || {})[0];
    return res.status(400).json({ message: firstError?.message || "Validation failed" });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path || "value"}` });
  }

  if (err?.name === "MongoServerError" && err?.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({ message: `${duplicateField} already exists` });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
}

module.exports = { notFoundHandler, errorHandler };
