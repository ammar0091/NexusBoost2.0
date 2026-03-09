const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
