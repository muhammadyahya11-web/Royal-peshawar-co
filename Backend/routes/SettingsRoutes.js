import express from "express";
import { getSettings, updateSettings } from "../Controller/SettingsController.js";
import { adminAuthorization } from "../Middleware/isAdmin.js";

const SettingsRoutes = express.Router();

SettingsRoutes.get("/", getSettings);
SettingsRoutes.put("/", adminAuthorization, updateSettings);

export default SettingsRoutes;
