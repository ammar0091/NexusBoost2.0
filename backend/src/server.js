const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const { ensureDefaultAdmin } = require("./utils/seedAdmin");

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nexusboost";
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "dev_only_change_me";
  console.warn("JWT_SECRET not set, using insecure dev fallback");
}

async function startServer() {
  await connectDB(mongoUri);
  await ensureDefaultAdmin();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
