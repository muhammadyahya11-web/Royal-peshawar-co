import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/Db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";
import userRoutes from "./routes/UserRotes.js";
import Productrouter from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();

const app = express();

// ⭐ CORS MUST BE FIRST
app.use(cors({
    
    origin: ["http://localhost:5175","http://localhost:5173",] ,
  
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", Productrouter);
app.use("/api/cart", CartRoutes );
app.use("/api/order", OrderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello API is working ");
});

// Start server
connectDb().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 8000}`);
  });
});
