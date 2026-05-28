import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
     price: { type:Number, required: true },
    des: { type: String, required: true },
    status : {type : Object ,anum:["active" , "unactive"]} ,
    category: { type: String, required: true },
    subcategory: { type: String },
    bestseller: { type: Boolean, default: false },
    sizes: [{ type: String }],
     featured: { type: Boolean, default: false },
    images: [{ type: String }],
     stock: { type:Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
