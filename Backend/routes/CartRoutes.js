import express from "express"
import { addToCart, updateCartQuantity ,removeFromCart ,getCart } from "../controllers/cartController.js";
import isAuth from "../middleware/isAuth.js";
const CartRoutes = express.Router();

CartRoutes.post("/add", isAuth ,   addToCart);
CartRoutes.get("/get", isAuth, getCart);
CartRoutes.put("/update" ,isAuth , updateCartQuantity);
CartRoutes.delete("/remove" ,isAuth , removeFromCart);

export default CartRoutes
