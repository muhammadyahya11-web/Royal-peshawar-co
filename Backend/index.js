import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./Config/Db.js";

import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import Productrouter from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import SettingsRoutes from "./routes/SettingsRoutes.js";

import { stripeWebhook } from "./controllers/orderController.js";

dotenv.config();

const app = express();

/* ================= DB CONNECTION (SAFE) ================= */
let isConnected = false;

const initDb = async () => {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
};

/* ================= STRIPE WEBHOOK (RAW MUST FIRST) ================= */
app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/* ================= MIDDLEWARE ================= */

 app.use(
  cors({
    origin: [
      "https://royal-peshawar-co.vercel.app",
      "https://royal-peshawar-co-admin.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    origin : true,
  })
)


app.use(express.json());

/* ================= INIT DB MIDDLEWARE ================= */
app.use(async (req, res, next) => {
  await initDb();
  next();
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", Productrouter);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/settings", SettingsRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Hello API is working 🚀");
});

/* ================= START SERVER (LOCAL) ================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

/* ================= EXPORT (IMPORTANT FOR VERCEL) ================= */
export default app;
