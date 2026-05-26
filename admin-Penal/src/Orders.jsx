import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Truck, XCircle, Clock } from "lucide-react";
import { AdminCotext } from "./AdminCotext";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
    <div className="p-2 bg-slate-100 rounded-lg">
      <Icon className="w-5 h-5 text-slate-600" />
    </div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Shipped: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Processing: "bg-indigo-100 text-indigo-700",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
        colors[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

function Orders() {
  const { ordersdata, ordersLoading } = useContext(AdminCotext);
  const navigate = useNavigate();

  const stats = {
    pending: ordersdata.filter((o) => o.orderStatus === "Pending").length,
    delivered: ordersdata.filter((o) => o.orderStatus === "Delivered").length,
    shipped: ordersdata.filter((o) => o.orderStatus === "Shipped").length,
    cancelled: ordersdata.filter((o) => o.orderStatus === "Cancelled").length,
  };

  if (ordersLoading && !ordersdata.length) {
    return <p className="text-center py-16 text-slate-500">Loading orders...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500 mt-1">
          {ordersdata.length} total orders
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Clock} label="Pending" value={stats.pending} />
        <StatCard icon={Truck} label="Shipped" value={stats.shipped} />
        <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} />
        <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {ordersdata.length === 0 ? (
          <p className="p-10 text-center text-slate-500">No orders yet</p>
        ) : (
          ordersdata.map((o) => (
            <button
              key={o._id}
              type="button"
              onClick={() => navigate(`/order/${o._id}`)}
              className="w-full text-left p-4 hover:bg-slate-50 flex flex-wrap items-center gap-4 transition"
            >
              <div className="flex-1 min-w-[140px]">
                <p className="font-medium text-slate-900">
                  {o.shippingAddress?.fullName || "Guest"}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  #{o._id.slice(-8)}
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                PKR {o.amount}
              </p>
              <p className="text-sm text-slate-500 capitalize">
                {o.paymentMethod}
              </p>
              <StatusBadge status={o.orderStatus} />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
