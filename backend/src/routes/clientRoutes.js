const express = require("express");
const Client = require("../models/Client");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

function validateClientBody(body) {
  const required = ["name", "logo"];
  for (const field of required) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

function serializeClient(client) {
  return {
    id: client._id,
    name: client.name,
    logo: client.logo,
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const clients = await Client.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: clients.map(serializeClient),
      meta: { total: clients.length },
    });
  })
);

router.post(
  "/",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateClientBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const client = await Client.create({
      name: String(req.body.name).trim(),
      logo: String(req.body.logo).trim(),
    });

    res.status(201).json({ data: serializeClient(client) });
  })
);

router.put(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateClientBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.name = String(req.body.name).trim();
    client.logo = String(req.body.logo).trim();
    await client.save();

    res.json({ data: serializeClient(client) });
  })
);

router.delete(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted" });
  })
);

module.exports = router;
