import React, { useContext, useMemo } from "react";
import { ShopContext } from "./../../context/ShopContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

import {
  getProductId,
  getItemImage,
  getItemName,
  getItemPrice,
} from "../../utils/cartHelpers.js";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    currency,
    deliveryFee,
    getSubtotal,
    getTotal,
    tooken,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (tooken) {
      navigate("/checkout");
    } else {
      toast.error("Please login to checkout");
      navigate("/login");
    }
  };

  /* ================= TOTAL CALC ================= */
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }, [cart]);

  const total = subtotal + deliveryFee;

  /* ================= EMPTY CART ================= */
  if (!cart.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet
        </p>

        <Link to="/">
          <button className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div
              key={`${getProductId(item)}-${item.size}`}
              className="bg-white rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md transition"
            >
              <img
                src={getItemImage(item)}
                alt={getItemName(item)}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
              />

              <div className="flex-1 w-full">
                <h3 className="font-semibold text-gray-800">
                  {getItemName(item)}
                </h3>

                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>
                    Size: <b>{item.size}</b>
                  </span>
                  <span>
                    Price:{" "}
                    <b>
                      {currency}
                      {getItemPrice(item)}
                    </b>
                  </span>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <button
                  onClick={() =>
                    decreaseQty(getProductId(item), item.size)
                  }
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQty(getProductId(item), item.size)
                  }
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* DELETE */}
              <button
                onClick={() =>
                  removeItem(getProductId(item), item.size)
                }
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>
                {currency}
                {getSubtotal()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>
                {currency}
                {deliveryFee}
              </span>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {currency}
                {getTotal()}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition"
          >
            Checkout Securely
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Secure checkout · Easy returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;