import express from "express" ;
import getcurrentuser from "../Controller/UserController.js";
import isAuth from "../Middleware/isAuth.js";

const userRoutes = express.Router();


userRoutes.get("/getcurrentuser" ,isAuth ,getcurrentuser )
export default userRoutes

