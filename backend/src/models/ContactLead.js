const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    interest: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "resolved"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactLead", contactLeadSchema);
