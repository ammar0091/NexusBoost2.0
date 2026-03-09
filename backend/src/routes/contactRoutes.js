const express = require("express");
const ContactLead = require("../models/ContactLead");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, interest, message } = req.body;
    if (!name || !email || !interest || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lead = await ContactLead.create({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      interest: String(interest).trim(),
      message: String(message).trim(),
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
