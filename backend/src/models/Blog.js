const mongoose = require("mongoose");

const blogSourceSchema = new mongoose.Schema(
  {
    fileName: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    mimeType: { type: String, trim: true, default: "" },
    size: { type: Number, default: 0 },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, trim: true, default: "" },
    category: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true, trim: true },
    readTime: { type: Number, required: true, min: 1 },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    sourceFile: { type: blogSourceSchema, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
