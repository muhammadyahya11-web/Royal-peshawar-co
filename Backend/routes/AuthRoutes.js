import express from "express";
import { login, logout, Register } from "../Controller/Authcontroller.js";

const authRoutes = express.Router();

// ✅ spelling 
authRoutes.post("/register", Register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
