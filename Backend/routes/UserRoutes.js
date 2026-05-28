import express from "express" ;
import getcurrentuser, { updateProfile } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";

const userRoutes = express.Router();
userRoutes.put("/updateprofile" ,isAuth , updateProfile )

userRoutes.get("/getcurrentuser" ,isAuth ,getcurrentuser )
export default userRoutes

