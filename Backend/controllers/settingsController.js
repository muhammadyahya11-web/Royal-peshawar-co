import Settings from "../models/Settings.js";

const defaultSettings = {
  storeName: "Royal Peshawar Co.",
  tagline: "Premium fashion for everyday style",
  supportEmail: process.env.ADMIN_EMAIL || "",
  supportPhone: "",
  currency: "PKR",
  deliveryFee: 10,
  freeShippingMin: 5000,
  lowStockThreshold: 5,
  storefrontUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  announcement: "",
  codEnabled: true,
  stripeEnabled: true,
};

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(defaultSettings);
  }
  return settings;
};

export const getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load settings",
      error: error.message,
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const allowed = [
      "storeName",
      "tagline",
      "supportEmail",
      "supportPhone",
      "currency",
      "deliveryFee",
      "freeShippingMin",
      "lowStockThreshold",
      "storefrontUrl",
      "announcement",
      "codEnabled",
      "stripeEnabled",
    ];

    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ ...defaultSettings, ...updates });
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, updates, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Settings saved",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
};
