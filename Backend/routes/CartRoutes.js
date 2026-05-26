import exppress from "express"
import { addToCart, updateCartQuantity ,removeFromCart ,getCart } from "../Controller/CartController.js";
import isAuth from "../Middleware/isAuth.js";
const CartRoutes = exppress.Router();

CartRoutes.post("/add", isAuth ,   addToCart);
CartRoutes.get("/get", isAuth, getCart);
CartRoutes.put("/update" ,isAuth , updateCartQuantity);
CartRoutes.delete("/remove" ,isAuth , removeFromCart);

export default CartRoutes
