const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true, trim: true },
    readTime: { type: Number, required: true, min: 1 },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
