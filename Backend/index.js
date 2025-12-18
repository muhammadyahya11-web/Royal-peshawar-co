import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/Db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";   // ⭐ CORS IMPORT
import userRoutes from "./routes/UserRotes.js";


dotenv.config();

const app = express();

// ⭐ CORS MUST BE FIRST (before routes)
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user" , userRoutes );

// Test route
app.get("/", (req, res) => {
  res.send("Hello API is working 🚀");
});

// Start server
connectDb().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(` Server running on http://localhost:${process.env.PORT || 3000}`);
  });
});
