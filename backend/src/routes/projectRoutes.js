const express = require("express");
const Project = require("../models/Project");
const { requireAdminAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    slug: project.slug || slugify(project.title),
    title: project.title,
    category: project.category,
    desc: project.desc,
    content: project.content,
    seoTitle: project.seoTitle,
    seoDescription: project.seoDescription,
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

router.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    let project = await Project.findOne({ slug: req.params.slug }).lean();

    if (!project) {
      const projects = await Project.find().lean();
      project = projects.find((item) => slugify(item.title) === req.params.slug) || null;
    }

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ data: serializeProject(project) });
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

    const computedSlug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
    const existingSlug = await Project.findOne({ slug: computedSlug });
    if (existingSlug) {
      return res.status(409).json({ message: "Project slug already exists" });
    }

    const project = await Project.create({
      slug: computedSlug,
      title: String(req.body.title).trim(),
      category: String(req.body.category).trim(),
      desc: String(req.body.desc).trim(),
      content: String(req.body.content || "").trim(),
      seoTitle: String(req.body.seoTitle || "").trim(),
      seoDescription: String(req.body.seoDescription || "").trim(),
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

    const computedSlug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
    if (computedSlug !== project.slug) {
      const existingSlug = await Project.findOne({ slug: computedSlug });
      if (existingSlug) {
        return res.status(409).json({ message: "Project slug already exists" });
      }
    }

    project.slug = computedSlug;
    project.title = String(req.body.title).trim();
    project.category = String(req.body.category).trim();
    project.desc = String(req.body.desc).trim();
    project.content = String(req.body.content || "").trim();
    project.seoTitle = String(req.body.seoTitle || "").trim();
    project.seoDescription = String(req.body.seoDescription || "").trim();
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
