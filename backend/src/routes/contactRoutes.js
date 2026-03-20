const express = require("express");
const ContactLead = require("../models/ContactLead");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, interest, message } = req.body;
    if (!name || !email || !interest || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const trimmedName = String(name).trim();
    const trimmedInterest = String(interest).trim();
    const trimmedMessage = String(message).trim();

    if (trimmedName.length < 2 || trimmedInterest.length < 3 || trimmedMessage.length < 10) {
      return res.status(400).json({ message: "Please provide complete contact details and project information" });
    }

    const lead = await ContactLead.create({
      name: trimmedName,
      email: normalizedEmail,
      interest: trimmedInterest,
      message: trimmedMessage,
      status: "new",
    });

    res.status(201).json({
      message: "Contact form submitted",
      data: {
        id: lead._id,
      },
    });
  })
);

module.exports = router;
