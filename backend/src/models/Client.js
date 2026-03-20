const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, trim: true, default: "" },
    industry: { type: String, trim: true, default: "" },
    summary: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
