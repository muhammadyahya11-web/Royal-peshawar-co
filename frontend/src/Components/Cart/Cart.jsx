import React, { useContext } from "react";
import { ShopContext } from "../../Conntex/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setcart, currency, deliveryFee } = useContext(ShopContext);

  // ➕ Increase Qty
  const increaseQty = (id, size) => {
    const updated = cart.map(item =>
      item.product._id === id && item.Size === size
        ? { ...item, Qty: item.Qty + 1 }
        : item
    );
    setcart(updated);
  };

  // ➖ Decrease Qty
  const decreaseQty = (id, size) => {
    const updated = cart
      .map(item =>
        item.product._id === id && item.Size === size
          ? { ...item, Qty: item.Qty - 1 }
          : item
      )
      .filter(item => item.Qty > 0);

    setcart(updated);
  };

  // 🗑 Delete Item
  const deleteItem = (id, size) => {
    const updated = cart.filter(
      item => !(item.product._id === id && item.Size === size)
    );
    setcart(updated);
  };

  // 💰 Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.Qty,
    0
  );

  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT → CART ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {cart.map(item => (
            <div
              key={`${item.product._id}-${item.Size}`}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                />

                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {currency}{item.product.price} | Size: {item.Size}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    decreaseQty(item.product._id, item.Size)
                  }
                  className="border px-2"
                >
                  −
                </button>

                <span>{item.Qty}</span>

                <button
                  onClick={() =>
                    increaseQty(item.product._id, item.Size)
                  }
                  className="border px-2"
                >
                  +
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  deleteItem(item.product._id, item.Size)
                }
                className="text-gray-400 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT → CART TOTALS */}
        <div className="border p-6 h-fit">
          <h3 className="text-lg font-semibold mb-6 border-b pb-2">
            CART TOTALS
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{currency}{deliveryFee}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-3">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>
          </div>

         <Link to={"/checkout"} > <button className="w-full mt-6 bg-black text-white py-3 text-sm hover:bg-gray-800">
            PROCEED TO CHECKOUT
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
