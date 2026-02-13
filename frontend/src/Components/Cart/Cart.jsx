import React, { useContext, useMemo } from "react";
import { ShopContext } from "../../Conntex/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, increaseQty, tooken , decreaseQty, removeItem, currency, deliveryFee ,} = useContext(ShopContext);
   const navigate = useNavigate()
  const handlecheckout =()=>{
    if(  tooken){
       navigate("/checkout")
      
    }
    else{
      alert("first login  with gmail  ")
    }

  }
  console.log('====================================');
  console.log(cart);
  console.log('====================================');

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const total = subtotal + deliveryFee;

    
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet</p>
        <Link to="/">
          <button className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ================= ITEMS ================= */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map(item => (
            <div key={`${item.product._id}-${item.size}`} className="bg-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md transition">
              <img src={item.images[0]} alt={item.product._id} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg" />

              <div className="flex-1 w-full">
                <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                  <span>Size: <b className="text-gray-700">{item.size}</b></span>
                  <span>Price: <b className="text-gray-800">{currency}{item.product.price}</b></span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <button onClick={() => decreaseQty(item.product._id, item.size)} disabled={item.quantity <= 1} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-40"><Minus size={16} /></button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button onClick={() => increaseQty(item.product._id, item.size , item.quantity)} className="p-1 rounded-full hover:bg-gray-200"><Plus size={16} /></button>
              </div>

              <button onClick={() => removeItem(item.product._id, item.size)} className="text-gray-400 hover:text-red-500 transition" title="Remove item">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>{currency}{deliveryFee}</span>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>
          </div>

          <div onClick={handlecheckout} >
            <button className="w-full mt-6 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition">
              Checkout Securely
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">Secure checkout · Easy returns</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
