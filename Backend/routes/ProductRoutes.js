import express from "express";


import upload from "../Config/multer.js";
import { addNewProduct, getSingalProduct, ProductList, productStatus, RemoveProduct, UpdateProduct ,} from "../Controller/Productscontroller.js";
import { adminAuthorization } from "../Middleware/isAdmin.js";


const Productrouter = express.Router();

Productrouter.post("/addnewproduct" ,upload.array("images", 4), adminAuthorization  ,addNewProduct);
Productrouter.get("/productlist" , ProductList);
Productrouter.get("/product/:id"  ,getSingalProduct);
Productrouter.delete("/deleteproduct/:id",adminAuthorization , RemoveProduct)
Productrouter.put("/updateproduct/:id", UpdateProduct)
Productrouter.put("/productstatus/:id", adminAuthorization , productStatus  )
export default Productrouter;
