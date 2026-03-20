const express = require("express");
const TeamMember = require("../models/TeamMember");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

function normalizeOrder(value) {
  if (value === undefined || value === null || value === "") return 0;
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function validateTeamBody(body) {
  const required = ["name", "role", "image"];
  for (const field of required) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

function serializeTeam(member) {
  return {
    id: member._id,
    name: member.name,
    role: member.role,
    image: member.image,
    order: member.order,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const members = await TeamMember.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json({
      data: members.map(serializeTeam),
      meta: { total: members.length },
    });
  })
);

router.post(
  "/",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateTeamBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const member = await TeamMember.create({
      name: String(req.body.name).trim(),
      role: String(req.body.role).trim(),
      image: String(req.body.image).trim(),
      order: normalizeOrder(req.body.order),
    });

    res.status(201).json({ data: serializeTeam(member) });
  })
);

router.put(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateTeamBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    member.name = String(req.body.name).trim();
    member.role = String(req.body.role).trim();
    member.image = String(req.body.image).trim();
    member.order = normalizeOrder(req.body.order);
    await member.save();

    res.json({ data: serializeTeam(member) });
  })
);

router.delete(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json({ message: "Team member deleted" });
  })
);

module.exports = router;
