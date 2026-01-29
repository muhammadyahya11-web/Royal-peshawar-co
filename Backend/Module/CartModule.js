import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
       image: {
        type : Array ,
        required :true ,


        } ,
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          required: true,
        },
        name : {
          type : String ,
           reqired : true,
        } ,
        price :{
          type : Number ,
          reqired : true
        }

      },
    ],
  },
  { timestamps: true }
);

// 🔥 FIX: avoid overwriting model
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
