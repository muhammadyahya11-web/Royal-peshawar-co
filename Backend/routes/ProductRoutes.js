import express from "express";


import upload from "../config/multer.js";
import { addNewProduct, getSingleProduct, ProductList, productStatus, RemoveProduct, UpdateProduct ,} from "../controllers/productController.js";
import { adminAuthorization } from "../middleware/isAdmin.js";


const Productrouter = express.Router();

Productrouter.post("/addnewproduct" ,upload.array("images", 4), adminAuthorization  ,addNewProduct);
Productrouter.get("/productlist" , ProductList);
Productrouter.get("/product/:id"  ,getSingleProduct);
Productrouter.delete("/deleteproduct/:id",adminAuthorization , RemoveProduct)
Productrouter.put("/updateproduct/:id", adminAuthorization, UpdateProduct);
Productrouter.put("/productstatus/:id", adminAuthorization , productStatus  )
export default Productrouter;
