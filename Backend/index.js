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


const app = express();
connectDb();
const port = process.env.PORT || 4000


// ---------------------------------------------------

app.use(express.json());
app.use(cors( ));


//-------------------------- Routes------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", Productrouter);
app.use("/api/cart", CartRoutes );
app.use("/api/order", OrderRoutes);

// ---------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello API is working ");
});

  app.listen(port ,()=>console.log("server start on post :" ,port))
