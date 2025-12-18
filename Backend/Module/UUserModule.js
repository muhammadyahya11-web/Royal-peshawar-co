import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String, // ✅ type missing تھا
      required: true,
    },

    cart: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, // ✅ createdAt, updatedAt automatically add کرے گا
    minimize: false,  // ✅ empty objects DB میں save ہوں گے
  }
);

// ✅ Correct way to create model
const User = mongoose.model("User", userSchema);

export default User;
