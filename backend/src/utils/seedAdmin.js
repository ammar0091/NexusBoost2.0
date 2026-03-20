const bcrypt = require("bcryptjs");
const AdminUser = require("../models/AdminUser");

async function ensureDefaultAdmin({ isProduction = false } = {}) {
  const configuredEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.toLowerCase() : null;
  const configuredPassword = process.env.ADMIN_PASSWORD || null;

  const adminEmail = configuredEmail || "admin@nexusboost.local";
  const adminPassword = configuredPassword || "Admin@12345";

  const existingAdmin = await AdminUser.findOne({ email: adminEmail });
  if (existingAdmin) {
    return;
  }

  if (isProduction && (!configuredEmail || !configuredPassword)) {
    console.warn("Skipping default admin creation because ADMIN_EMAIL or ADMIN_PASSWORD is missing in production");
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await AdminUser.create({
    email: adminEmail,
    passwordHash,
    role: "admin",
  });

  console.log(`Default admin created: ${adminEmail}`);
}

module.exports = { ensureDefaultAdmin };
