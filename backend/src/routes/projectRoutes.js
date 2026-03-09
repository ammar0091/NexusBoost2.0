const express = require("express");
const Project = require("../models/Project");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

function validateProjectBody(body) {
  const required = ["title", "category", "desc", "image"];
  for (const field of required) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

function serializeProject(project) {
  return {
    id: project._id,
    title: project.title,
    category: project.category,
    desc: project.desc,
    image: project.image,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    res.json({
      data: projects.map(serializeProject),
      meta: { total: projects.length },
    });
  })
);

router.post(
  "/",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateProjectBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const project = await Project.create({
      title: String(req.body.title).trim(),
      category: String(req.body.category).trim(),
      desc: String(req.body.desc).trim(),
      image: String(req.body.image).trim(),
    });

    res.status(201).json({ data: serializeProject(project) });
  })
);

router.put(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateProjectBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = String(req.body.title).trim();
    project.category = String(req.body.category).trim();
    project.desc = String(req.body.desc).trim();
    project.image = String(req.body.image).trim();
    await project.save();

    res.json({ data: serializeProject(project) });
  })
);

router.delete(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  })
);

module.exports = router;
