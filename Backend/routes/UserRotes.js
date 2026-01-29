import express from "express" ;
import getcurrentuser, { updateProfile } from "../Controller/UserController.js";
import isAuth from "../Middleware/isAuth.js";

const userRoutes = express.Router();
userRoutes.put("/updateprofile" ,isAuth , updateProfile )

userRoutes.get("/getcurrentuser" ,isAuth ,getcurrentuser )
export default userRoutes

