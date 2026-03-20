const express = require("express");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });
    if (existing) {
      return res.json({ message: "Already subscribed", data: { id: existing._id } });
    }

    const subscriber = await NewsletterSubscriber.create({ email: normalizedEmail });
    res.status(201).json({
      message: "Subscribed successfully",
      data: { id: subscriber._id },
    });
  })
);

module.exports = router;
