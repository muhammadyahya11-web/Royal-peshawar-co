import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminCotext } from "./AdminCotext";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Truck, XCircle } from "lucide-react";

// ================= KPI CARD =================
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={`flex items-center gap-4 p-5 rounded-2xl shadow-lg bg-gradient-to-br ${color} hover:scale-[1.03] transition transform cursor-pointer`}>
    <div className="p-3 bg-white rounded-full shadow flex items-center justify-center">
      <Icon className="w-6 h-6 text-gray-700" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// ================= STATUS BADGE =================
const StatusBadge = ({ status }) => {
  let colors = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Shipped: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  let icons = {
    Delivered: <CheckCircle className="w-3 h-3 text-emerald-700" />,
    Shipped: <Truck className="w-3 h-3 text-purple-700" />,
    Cancelled: <XCircle className="w-3 h-3 text-red-700" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {icons[status]} {status}
    </span>
  );
};

// ================= ORDERS PAGE =================
const Orders = () => {
  const { tooken, setordersdata } = useContext(AdminCotext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Count only Delivered, Shipped, Cancelled
  const stats = {
    delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
    shipped: orders.filter((o) => o.orderStatus === "Shipped").length,
    cancelled: orders.filter((o) => o.orderStatus === "Cancelled").length,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = tooken || localStorage.getItem("tooken");
        const res = await axios.get(
          "http://localhost:8000/api/order/admin/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data.orders || []);
        setordersdata(res.data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [tooken, setordersdata]);

  if (loading)
    return <p className="text-center py-10 text-gray-500 text-lg">Loading orders...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Orders Management</h1>

      {/* ===== SIMPLIFIED KPI STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} color="from-emerald-100 to-emerald-200" />
        <StatCard icon={Truck} label="Shipped" value={stats.shipped} color="from-purple-100 to-purple-200" />
        <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled} color="from-red-100 to-red-200" />
      </div>

      {/* ===== ORDERS TABLE ===== */}
      <div className="hidden md:grid grid-cols-1 gap-4">
        {orders.map((o) => (
          <div
            key={o._id}
            onClick={() => navigate(`/order/${o._id}`)}
            className="p-4 bg-white rounded-2xl shadow-lg flex justify-between items-center cursor-pointer transition hover:scale-[1.02]"
          >
            <div>
              <p className="text-xs text-gray-400">{o._id}</p>
              <p className="font-semibold text-gray-900">{o.shippingAddress?.fullName}</p>
            </div>
            <div className="text-sm text-gray-700">Rs {o.amount}</div>
            <div className="text-sm text-gray-700">{o.paymentMethod}</div>
            <StatusBadge status={o.orderStatus} />
          </div>
        ))}
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            onClick={() => navigate(`/order/${o._id}`)}
            className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2 cursor-pointer transition hover:scale-[1.02]"
          >
            <p className="text-xs text-gray-400">{o._id}</p>
            <p className="font-semibold text-gray-900">{o.shippingAddress?.fullName}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Rs {o.amount}</p>
              <p className="text-sm text-gray-700">{o.paymentMethod}</p>
            </div>
            <StatusBadge status={o.orderStatus} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
