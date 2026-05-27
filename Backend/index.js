import express from "express";
import cors from "cors";

import connectDb from "./Config/Db.js";

import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRotes.js";
import Productrouter from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import SettingsRoutes from "./routes/SettingsRoutes.js";

import { stripeWebhook } from "./Controller/Ordercontroller.js";

const app = express();
connectDb();

const port = process.env.PORT || 8000;

/* ================= STRIPE WEBHOOK (MUST FIRST) ================= */
app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://royal-peshawar-co.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", Productrouter);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/settings", SettingsRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Hello API is working");
});

/* ================= SERVER ================= */
app.listen(port, () =>
  console.log("server started on port:", port)
);