const express = require("express");
const ContactLead = require("../models/ContactLead");
const asyncHandler = require("../utils/asyncHandler");
const { validateContactPayload } = require("../utils/contactValidation");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const validation = validateContactPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const lead = await ContactLead.create({
      ...validation.normalized,
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
