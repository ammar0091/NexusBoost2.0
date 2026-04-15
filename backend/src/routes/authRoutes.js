const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (process.env.DB_DEGRADED_MODE === "true") {
      const configuredEmail = String(process.env.ADMIN_EMAIL || "").toLowerCase().trim();
      const configuredPassword = String(process.env.ADMIN_PASSWORD || "");
      const normalizedEmail = String(email).toLowerCase().trim();

      if (!configuredEmail || !configuredPassword) {
        return res.status(503).json({
          message: "Admin credentials are not configured in environment variables.",
        });
      }

      if (normalizedEmail !== configuredEmail || password !== configuredPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: "env-admin", email: configuredEmail, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        user: {
          id: "env-admin",
          email: configuredEmail,
          role: "admin",
          degraded: true,
        },
      });
    }

    const user = await AdminUser.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  })
);

module.exports = router;
