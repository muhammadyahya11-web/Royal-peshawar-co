import express from "express"; // fix typo
import isAuth from "../Middleware/isAuth.js";
import { getAllOrders, getorders, getsingleorder, placeOrder, updateOrderStatus, } from "../Controller/Ordercontroller.js";
import { adminAuthorization } from "../Middleware/isAdmin.js";



const OrderRoutes = express.Router();

OrderRoutes.post("/place" , isAuth  , placeOrder); 
OrderRoutes.get("/orders" ,  isAuth ,getorders ); 
OrderRoutes.get("/admin/orders"   , getAllOrders); 
OrderRoutes.get("/admin/singleorder/:id" , adminAuthorization  , getsingleorder); 
OrderRoutes.put("/admin/orderstatus/:id" ,adminAuthorization , updateOrderStatus);

export default OrderRoutes;
