import React, { useContext, useState } from "react";
import { ShopContext } from "../../Conntex/ShopContext";

const Checkout = () => {
  const {
    cart,
    currency,
    deliveryFee,
    getSubtotal,
    getTotal,
    clearCart
  } = useContext(ShopContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order Placed Successfully 🎉");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20 text-xl">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT — BILLING FORM */}
        <div>
          <h3 className="text-xl font-medium mb-4">
            Billing Details
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />

            <input
              type="text"
              placeholder="Phone *"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />

            <input
              type="text"
              placeholder="Address *"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />

            <input
              type="text"
              placeholder="City *"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />

            <input
              type="text"
              placeholder="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border px-4 py-2"
            />
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="border p-6 h-fit">
          <h3 className="text-xl font-medium mb-4 border-b pb-2">
            Order Summary
          </h3>

          <div className="space-y-4 text-sm">
            {cart.map(item => (
              <div
                key={`${item.product._id}-${item.Size}`}
                className="flex justify-between"
              >
                <span>
                  {item.product.name} × {item.Qty}
                </span>
                <span>
                  {currency}
                  {item.product.price * item.Qty}
                </span>
              </div>
            ))}

            <div className="flex justify-between border-t pt-3">
              <span>Subtotal</span>
              <span>{currency}{getSubtotal()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{currency}{deliveryFee}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>{currency}{getTotal()}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-black text-white py-3 mt-6"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
