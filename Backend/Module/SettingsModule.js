import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Royal Peshawar Co." },
    tagline: { type: String, default: "Premium fashion for everyday style" },
    supportEmail: { type: String, default: "" },
    supportPhone: { type: String, default: "" },
    currency: { type: String, default: "PKR" },
    deliveryFee: { type: Number, default: 10 },
    freeShippingMin: { type: Number, default: 5000 },
    lowStockThreshold: { type: Number, default: 5 },
    storefrontUrl: { type: String, default: "http://localhost:5173" },
    announcement: { type: String, default: "" },
    codEnabled: { type: Boolean, default: true },
    stripeEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
