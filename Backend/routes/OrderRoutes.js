// ===============================
// BACKEND
// FILE: Routes/OrderRoutes.js
// ===============================

import express from "express";

import isAuth from "../Middleware/isAuth.js";

import {
  placeOrder,
  stripeOrder,
  verifyStripePayment,
  getorders,
  getAllOrders,
  getsingleorder,
  updateOrderStatus,
} from "../Controller/Ordercontroller.js";

import { adminAuthorization } from "../Middleware/isAdmin.js";

const OrderRoutes = express.Router();

/* ================= USER ================= */

OrderRoutes.post(
  "/place",
  isAuth,
  placeOrder
);

OrderRoutes.post(
  "/stripe",
  isAuth,
  stripeOrder
);

OrderRoutes.get(
  "/stripe/verify",
  isAuth,
  verifyStripePayment
);

OrderRoutes.get(
  "/orders",
  isAuth,
  getorders
);

/* ================= ADMIN ================= */

OrderRoutes.get(
  "/admin/orders",
  adminAuthorization,
  getAllOrders
);

OrderRoutes.get(
  "/admin/singleorder/:id",
  adminAuthorization,
  getsingleorder
);

OrderRoutes.put(
  "/admin/orderstatus/:id",
  adminAuthorization,
  updateOrderStatus
);

export default OrderRoutes;