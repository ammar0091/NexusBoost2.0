const express = require("express");
const ContactLead = require("../models/ContactLead");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAdminAuth);

router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [contactCount, newsletterCount, unresolvedCount] = await Promise.all([
      ContactLead.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      ContactLead.countDocuments({ status: "new" }),
    ]);

    res.json({
      data: {
        contactCount,
        unresolvedCount,
        newsletterCount,
      },
    });
  })
);

router.get(
  "/contacts",
  asyncHandler(async (req, res) => {
    const contacts = await ContactLead.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: contacts.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        interest: item.interest,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt,
      })),
      meta: { total: contacts.length },
    });
  })
);

router.patch(
  "/contacts/:id/status",
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!["new", "resolved"].includes(status)) {
      return res.status(400).json({ message: "status must be new or resolved" });
    }

    const contact = await ContactLead.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.status = status;
    await contact.save();
    res.json({ message: "Status updated" });
  })
);

router.delete(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const deleted = await ContactLead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  })
);

router.get(
  "/newsletters",
  asyncHandler(async (req, res) => {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: subscribers.map((item) => ({
        id: item._id,
        email: item.email,
        createdAt: item.createdAt,
      })),
      meta: { total: subscribers.length },
    });
  })
);

router.delete(
  "/newsletters/:id",
  asyncHandler(async (req, res) => {
    const deleted = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json({ message: "Subscriber deleted" });
  })
);

module.exports = router;
