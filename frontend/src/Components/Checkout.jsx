import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "./../context/ShopContext.jsx";
import { API_BASE } from "../config/api.js";
import {
  buildOrderItems,
  getItemImage,
  getItemName,
  getLineTotal,
} from "../utils/cartHelpers.js";
import {
  User,
  Wallet,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Check,
  Banknote,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    currency,
    deliveryFee,
    getSubtotal,
    getTotal,
    setcart,
    fetchOrders,
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.city || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("tooken");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const orderPayload = {
      items: buildOrderItems(cart),
      shippingAddress: {
        fullName: form.name,
        phone: form.phone,
        city: form.city,
        address: form.address,
      },
      amount: getTotal(),
      deliveryFee,
    };

    try {
      setLoading(true);

      if (paymentMethod === "stripe") {
        const res = await fetch(`${API_BASE}/order/stripe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();

        if (res.ok && data.url) {
          toast.info("Redirecting to Stripe...");
          window.location.href = data.url;
          return;
        }

        toast.error(data.message || "Could not start payment");
        return;
      }

      const res = await fetch(`${API_BASE}/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...orderPayload,
          paymentMethod: "cod",
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("Order placed successfully");
        setcart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        fetchOrders?.();
        navigate("/order");
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 shadow-sm rounded-[32px] p-10 text-center max-w-md w-full">
          <div className="w-24 h-24 rounded-full bg-black mx-auto flex items-center justify-center">
            <ShoppingBag size={42} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold mt-7 text-gray-900">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Looks like you haven’t added any products yet.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-black hover:bg-gray-900 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-3">
              Secure Checkout
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Complete Your Order
            </h1>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm">
            <ShieldCheck size={20} className="text-green-600" />

            <p className="text-sm text-gray-600">
              SSL Encrypted & Secure Payments
            </p>
          </div>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* LEFT */}

          <div className="xl:col-span-2 space-y-8">
            {/* BILLING */}

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10">
              <SectionTitle
                icon={<User size={24} />}
                title="Billing Details"
                subtitle="Enter your shipping information"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Muhammad Yahya"
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                />

                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Lahore"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10">
              <SectionTitle
                icon={<Wallet size={24} />}
                title="Payment Method"
                subtitle="Choose your preferred payment option"
              />

              <div className="space-y-5 mt-10">
                <PaymentCard
                  selected={paymentMethod}
                  value="stripe"
                  title="Stripe Payment"
                  desc="Pay securely with Visa, Mastercard or debit card"
                  icon={<CreditCard size={24} />}
                  onChange={setPaymentMethod}
                />

                <PaymentCard
                  selected={paymentMethod}
                  value="cod"
                  title="Cash on Delivery"
                  desc="Pay after receiving your order"
                  icon={<Banknote size={24} />}
                  onChange={setPaymentMethod}
                />
              </div>

              {paymentMethod === "stripe" && (
                <div className="mt-8 bg-[#fafafa] border border-gray-200 rounded-[30px] p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                      <ExternalLink size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Secure Stripe Checkout
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        You will be redirected to Stripe to pay with card.
                        Card details are never stored on this site.
                      </p>
                      <p className="text-xs text-gray-400 mt-3">
                        Test card: 4242 4242 4242 4242 · any future expiry · any CVC
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div className="xl:sticky xl:top-8 h-fit">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
              {/* HEADER */}

              <div className="bg-black p-7 text-white">
                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

                <p className="text-gray-300 mt-2 text-sm">
                  Review your products and payment
                </p>
              </div>

              {/* ITEMS */}

              <div className="p-7 space-y-6 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.product._id + item.size}
                    className="flex gap-4"
                  >
                    <img
                      src={getItemImage(item)}
                      alt={getItemName(item)}
                      className="w-24 h-24 rounded-2xl object-cover border border-gray-200"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {getItemName(item)}
                      </h3>

                      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                        <span>Qty: {item.quantity}</span>

                        {item.size && (
                          <span>Size: {item.size}</span>
                        )}
                      </div>

                      <p className="mt-4 text-lg font-bold text-gray-900">
                        {currency}
                        {getLineTotal(item)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTALS */}

              <div className="border-t border-gray-100 p-7">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>

                    <span>
                      {currency}
                      {getSubtotal()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>

                    <span>
                      {currency}
                      {deliveryFee}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-3xl font-bold text-gray-900">
                      {currency}
                      {getTotal()}
                    </span>
                  </div>
                </div>

                {/* BUTTON */}

                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full mt-8 bg-black hover:bg-gray-900 transition-all duration-300 text-white py-5 rounded-2xl font-semibold text-lg disabled:opacity-60"
                >
                  {loading
                    ? "Processing..."
                    : paymentMethod === "stripe"
                    ? "Pay with Stripe"
                    : "Place Order"}
                </button>

                {/* SECURITY */}

                <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
                  <Check size={16} />

                  <p>Trusted secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SECTION TITLE ================= */

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-5">
    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
      {icon}
    </div>

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="text-gray-500 mt-1 text-sm">
        {subtitle}
      </p>
    </div>
  </div>
);

/* ================= INPUT ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>

    <input
      {...props}
      className="w-full h-14 bg-[#fafafa] border border-gray-200 rounded-2xl px-5 outline-none focus:border-black focus:bg-white transition-all duration-300"
    />
  </div>
);

/* ================= PAYMENT CARD ================= */

const PaymentCard = ({
  selected,
  value,
  title,
  desc,
  icon,
  onChange,
}) => (
  <label
    className={`relative flex items-center gap-5 p-6 rounded-[28px] border-2 cursor-pointer transition-all duration-300 ${
      selected === value
        ? "border-black bg-black text-white"
        : "border-gray-200 bg-white hover:border-gray-400"
    }`}
  >
    <input
      type="radio"
      checked={selected === value}
      onChange={() => onChange(value)}
      className="hidden"
    />

    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
        selected === value
          ? "bg-white text-black"
          : "bg-gray-100 text-black"
      }`}
    >
      {icon}
    </div>

    <div className="flex-1">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p
        className={`text-sm mt-1 ${
          selected === value
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
        {desc}
      </p>
    </div>

    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        selected === value
          ? "border-white"
          : "border-gray-300"
      }`}
    >
      {selected === value && (
        <div className="w-3 h-3 rounded-full bg-white" />
      )}
    </div>
  </label>
);

export default Checkout;