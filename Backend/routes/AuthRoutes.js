import express from "express";
import { adminLogin, login, logout, Register } from "../controllers/authController.js";

const authRoutes = express.Router();

// ✅ spelling 
authRoutes.post("/register", Register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/adminlogin" , adminLogin)

export default authRoutes;
