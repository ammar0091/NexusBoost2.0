const bcrypt = require("bcryptjs");
const AdminUser = require("../models/AdminUser");

async function ensureDefaultAdmin() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@nexusboost.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

  const existingAdmin = await AdminUser.findOne({ email: adminEmail });
  if (existingAdmin) {
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
