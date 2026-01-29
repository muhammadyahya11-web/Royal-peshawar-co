import React, { useContext } from "react";
import { Package, CreditCard, MapPin } from "lucide-react";
import { ShopContext } from "../Conntex/ShopContext";

const MyOrders = () => {
  const { orders } = useContext(ShopContext);

  // EMPTY STATE
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <Package size={72} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-500">You haven't placed any orders yet</p>
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
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold">Order #{order._id}</h2>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* ITEMS */}
            <div className="space-y-4 mb-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                >
                  {/* Product Image */}
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">PKR {item.price}</div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard size={16} />
                {order.paymentMethod.toUpperCase()}
              </div>

              <div className="font-semibold text-lg">Total: PKR {order.amount}</div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                {order.shippingAddress.city}, {order.shippingAddress.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;