import React, { useContext, useState } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import {
  CreditCard,
  User,
  ShoppingBag,
  Wallet,
  Banknote
} from "lucide-react";

const easypaisaLogo =
  "https://upload.wikimedia.org/wikipedia/commons/5/54/Easypaisa_logo.png";

const Checkout = () => {
  const { cart, currency, deliveryFee,setcart , getSubtotal, getTotal, clearCart } =
    useContext(ShopContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("tooken");
      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }
  
    
      const orderData = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          image : item.image ,
          name : item.name ,
          price : item.price ,
          
        })),
        shippingAddress: {
          fullName: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        amount: getTotal(),
        paymentMethod
      };
  
  
      const res = await fetch("http://localhost:8000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token sent to backend
        },
        body: JSON.stringify(orderData),
      });
      console.log(res);
      
      const data = await res.json();

      if (res.status === 201) {
        alert("Order placed successfully 🎉");
        setcart([])
        localStorage.setItem("cart" ,[])
        setForm({ name: "", phone: "", address: "", city: "" });
        setPaymentMethod("cod");
      } else {
        alert(data.message || "Order failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <ShoppingBag size={70} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500">Add items to continue</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-10">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* BILLING */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User size={20} /> Billing Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Full Name *" name="name" value={form.name} onChange={handleChange} />
              <Input label="Phone *" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="City *" name="city" value={form.city} onChange={handleChange} />
              <div className="md:col-span-2">
                <Input label="Address *" name="address" value={form.address} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Wallet size={20} /> Payment Method
            </h2>
            <div className="space-y-4">
              <PaymentOption selected={paymentMethod} value="cod" label="Cash on Delivery" icon={<Banknote size={22} />} onChange={setPaymentMethod} />
              <PaymentOption selected={paymentMethod} value="easypaisa" label="EasyPaisa" image={easypaisaLogo} onChange={setPaymentMethod} />
              <PaymentOption selected={paymentMethod} value="bank" label="Bank Transfer" icon={<CreditCard size={22} />} onChange={setPaymentMethod} />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-lg p-7 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <CreditCard size={20} /> Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.product._id + item.size} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>{currency}{item.product.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between">
              <span>Subtotal</span>
              <span>{currency}{getSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{currency}{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-4">
              <span>Total</span>
              <span>{currency}{getTotal()}</span>
            </div>
          </div>
          <button onClick={placeOrder} disabled={loading} className="w-full mt-8 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition disabled:opacity-60">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black" />
  </div>
);

/* PAYMENT OPTION COMPONENT */
const PaymentOption = ({ selected, value, label, icon, image, onChange }) => (
  <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${selected === value ? "border-black bg-gray-50" : "border-gray-200"}`}>
    <input type="radio" name="payment" checked={selected === value} onChange={() => onChange(value)} className="hidden" />
    {image ? <img src={image} alt={label} className="h-8" /> : icon}
    <span className="font-medium">{label}</span>
  </label>
);

export default Checkout;
