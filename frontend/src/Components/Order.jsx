import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Package, CreditCard, MapPin } from "lucide-react";
import { ShopContext } from "../Conntex/ShopContext";
import { getItemImage } from "../utils/cartHelpers.js";

const getOrderItemImage = (item) => {
  if (Array.isArray(item.image) && item.image[0]) return item.image[0];
  if (typeof item.image === "string") return item.image;
  return getItemImage(item);
};

const MyOrders = () => {
  const { orders } = useContext(ShopContext);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Package size={72} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
        <Link
          to="/"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-10">My Orders</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.isPaid || order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.paymentStatus || (order.isPaid ? "Paid" : "Pending")}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                >
                  <img
                    src={getOrderItemImage(item)}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
                    PKR {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard size={16} />
                {(order.paymentMethod || "cod").toUpperCase()}
              </div>

              <div className="font-semibold text-lg">
                Total: PKR {order.amount}
              </div>

              {order.shippingAddress && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.address}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
