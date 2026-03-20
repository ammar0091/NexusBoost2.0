const express = require("express");
const Blog = require("../models/Blog");
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

function serializeBlog(blog) {
  return {
    id: blog._id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    category: { id: slugify(blog.category), name: blog.category },
    coverImage: blog.coverImage,
    readTime: blog.readTime,
    seoTitle: blog.seoTitle,
    seoDescription: blog.seoDescription,
    publishedAt: blog.publishedAt,
    featured: blog.featured,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
}

function validateBlogBody(body) {
  const required = ["title", "excerpt", "category", "coverImage", "readTime"];
  for (const field of required) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  if (Number(body.readTime) < 1) {
    return "readTime must be at least 1";
  }
  return null;
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .lean();
    res.json({
      data: blogs.map(serializeBlog),
      meta: { total: blogs.length },
    });
  })
);

router.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug }).lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ data: serializeBlog(blog) });
  })
);

router.post(
  "/",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateBlogBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const computedSlug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
    const existingSlug = await Blog.findOne({ slug: computedSlug });
    if (existingSlug) {
      return res.status(409).json({ message: "Blog slug already exists" });
    }

    const blog = await Blog.create({
      slug: computedSlug,
      title: String(req.body.title).trim(),
      excerpt: String(req.body.excerpt).trim(),
      content: String(req.body.content || "").trim(),
      category: String(req.body.category).trim(),
      coverImage: String(req.body.coverImage).trim(),
      readTime: Number(req.body.readTime),
      seoTitle: String(req.body.seoTitle || "").trim(),
      seoDescription: String(req.body.seoDescription || "").trim(),
      publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date(),
      featured: Boolean(req.body.featured),
    });

    res.status(201).json({ data: serializeBlog(blog) });
  })
);

router.put(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const error = validateBlogBody(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const computedSlug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
    if (computedSlug !== blog.slug) {
      const existingSlug = await Blog.findOne({ slug: computedSlug });
      if (existingSlug) {
        return res.status(409).json({ message: "Blog slug already exists" });
      }
    }

    blog.slug = computedSlug;
    blog.title = String(req.body.title).trim();
    blog.excerpt = String(req.body.excerpt).trim();
    blog.content = String(req.body.content || "").trim();
    blog.category = String(req.body.category).trim();
    blog.coverImage = String(req.body.coverImage).trim();
    blog.readTime = Number(req.body.readTime);
    blog.seoTitle = String(req.body.seoTitle || "").trim();
    blog.seoDescription = String(req.body.seoDescription || "").trim();
    blog.publishedAt = req.body.publishedAt ? new Date(req.body.publishedAt) : blog.publishedAt;
    blog.featured = Boolean(req.body.featured);

    await blog.save();
    res.json({ data: serializeBlog(blog) });
  })
);

router.delete(
  "/:id",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  })
);

module.exports = router;
