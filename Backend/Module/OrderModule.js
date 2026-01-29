import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {type : String, required : true} ,
      image: [String],
      size: String,
      quantity: Number,
      price: {type :Number ,required : true},
    }
  ],

  amount: Number,

  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  paymentMethod: {
    type: String,
    enum: ["cod", "easypaisa", "bank"],
    default: "cod",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },

  isPaid: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true }
);


const Order =mongoose.model("orders" ,orderSchema);
export default Order