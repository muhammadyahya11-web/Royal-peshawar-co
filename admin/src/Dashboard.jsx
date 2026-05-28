import React, { useContext, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Clock,
  CreditCard,
  Banknote,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  PlusCircle,
  ClipboardList,
  Box,
} from "lucide-react";
import { AdminCotext } from "./AdminCotext";

const StatCard = ({ icon: Icon, title, value, hint, accent }) => (
  <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-900 mt-1 truncate">{value}</p>
        {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      </div>
      <div
        className={`p-2.5 rounded-xl shrink-0 ${
          accent || "bg-emerald-50 text-emerald-600"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

const statusColor = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-indigo-100 text-indigo-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

const BarRow = ({ label, count, total, color }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-900">
          {count} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

function Dashboard() {
  const { ordersdata, products, ordersLoading, fetchOrders } =
    useContext(AdminCotext);
  const navigate = useNavigate();

  const analytics = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const revenue = ordersdata.reduce((s, o) => s + (o.amount || 0), 0);
    const paidRevenue = ordersdata
      .filter((o) => o.isPaid || o.paymentStatus === "Paid")
      .reduce((s, o) => s + (o.amount || 0), 0);

    const ordersThisWeek = ordersdata.filter(
      (o) => new Date(o.createdAt) >= weekAgo
    ).length;

    const statusCounts = {};
    ordersdata.forEach((o) => {
      const st = o.orderStatus || "Pending";
      statusCounts[st] = (statusCounts[st] || 0) + 1;
    });

    const stripeOrders = ordersdata.filter(
      (o) => o.paymentMethod === "stripe"
    ).length;
    const codOrders = ordersdata.filter(
      (o) => o.paymentMethod === "cod"
    ).length;

    const lowStock = products.filter((p) => (p.stock ?? 0) <= 5);
    const outOfStock = products.filter((p) => (p.stock ?? 0) === 0);
    const inactive = products.filter((p) => p.status === "unactive").length;

    const productSales = {};
    ordersdata.forEach((order) => {
      order.items?.forEach((item) => {
        const key = item.name || "Unknown";
        productSales[key] =
          (productSales[key] || 0) + (item.quantity || 1);
      });
    });
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const avgOrder =
      ordersdata.length > 0 ? Math.round(revenue / ordersdata.length) : 0;

    return {
      revenue,
      paidRevenue,
      orders: ordersdata.length,
      ordersThisWeek,
      pending: statusCounts.Pending || 0,
      delivered: statusCounts.Delivered || 0,
      statusCounts,
      stripeOrders,
      codOrders,
      lowStock,
      outOfStock,
      inactive,
      topProducts,
      avgOrder,
      activeProducts: products.filter((p) => p.status === "active").length,
      products: products.length,
    };
  }, [ordersdata, products]);

  const recent = ordersdata.slice(0, 8);
  const totalForBars = ordersdata.length || 1;

  if (ordersLoading && !ordersdata.length) {
    return (
      <p className="text-center py-16 text-slate-500">Loading dashboard...</p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Store overview · {new Date().toLocaleDateString("en-PK", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchOrders}
          className="text-sm text-emerald-600 font-medium hover:underline"
        >
          Refresh data
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/addproduct"
          className="flex items-center gap-2 bg-emerald-600 text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-emerald-700 transition"
        >
          <PlusCircle size={18} />
          Add product
        </Link>
        <Link
          to="/orders"
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-50 transition"
        >
          <ClipboardList size={18} />
          All orders
        </Link>
        <Link
          to="/list"
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-50 transition"
        >
          <Box size={18} />
          Products
        </Link>
        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium hover:bg-amber-100 transition"
        >
          <Clock size={18} />
          {analytics.pending} pending
        </button>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          title="Total sales"
          value={`PKR ${analytics.revenue.toLocaleString()}`}
          hint={`Avg PKR ${analytics.avgOrder} / order`}
        />
        <StatCard
          icon={TrendingUp}
          title="Paid revenue"
          value={`PKR ${analytics.paidRevenue.toLocaleString()}`}
          hint="Confirmed payments"
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total orders"
          value={analytics.orders}
          hint={`${analytics.ordersThisWeek} this week`}
        />
        <StatCard
          icon={Package}
          title="Catalog"
          value={`${analytics.activeProducts} active`}
          hint={`${analytics.products} total · ${analytics.inactive} inactive`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          title="Pending"
          value={analytics.pending}
          accent="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={CheckCircle}
          title="Delivered"
          value={analytics.delivered}
          accent="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={CreditCard}
          title="Stripe"
          value={analytics.stripeOrders}
          hint="Card payments"
          accent="bg-violet-50 text-violet-600"
        />
        <StatCard
          icon={Banknote}
          title="Cash on delivery"
          value={analytics.codOrders}
          accent="bg-slate-100 text-slate-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order status chart */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Order status</h2>
          <div className="space-y-4">
            {Object.entries(analytics.statusCounts).length === 0 ? (
              <p className="text-sm text-slate-500">No orders yet</p>
            ) : (
              Object.entries(analytics.statusCounts).map(([label, count]) => (
                <BarRow
                  key={label}
                  label={label}
                  count={count}
                  total={totalForBars}
                  color={
                    label === "Delivered"
                      ? "bg-emerald-500"
                      : label === "Pending"
                      ? "bg-amber-500"
                      : label === "Cancelled"
                      ? "bg-red-500"
                      : "bg-indigo-500"
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Top products */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Top sellers</h2>
          {analytics.topProducts.length === 0 ? (
            <p className="text-sm text-slate-500">No sales data yet</p>
          ) : (
            <ul className="space-y-3">
              {analytics.topProducts.map(([name, qty], i) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-xs font-bold flex items-center justify-center text-slate-600">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-slate-800 truncate">
                    {name}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {qty} sold
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Low stock alert */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-slate-900">Stock alerts</h2>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            {analytics.outOfStock.length} out of stock ·{" "}
            {analytics.lowStock.length} low (≤5)
          </p>
          {analytics.lowStock.length === 0 ? (
            <p className="text-sm text-emerald-600">All stock levels OK</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {analytics.lowStock.slice(0, 8).map((p) => (
                <li
                  key={p._id}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg bg-amber-50"
                >
                  <img
                    src={p.images?.[0]}
                    alt=""
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="flex-1 truncate text-slate-800">
                    {p.name}
                  </span>
                  <span
                    className={`font-semibold ${
                      p.stock === 0 ? "text-red-600" : "text-amber-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/list"
            className="inline-block mt-4 text-sm text-emerald-600 hover:underline"
          >
            Manage inventory →
          </Link>
        </div>
      </div>

      {/* Payment split */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-4">Payment methods</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
          <BarRow
            label="Stripe (card)"
            count={analytics.stripeOrders}
            total={analytics.orders || 1}
            color="bg-violet-500"
          />
          <BarRow
            label="Cash on delivery"
            count={analytics.codOrders}
            total={analytics.orders || 1}
            color="bg-slate-500"
          />
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">Recent orders</h2>
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="text-sm text-emerald-600 hover:underline font-medium"
          >
            View all →
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="p-8 text-center text-slate-500 text-sm">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Payment</th>
                  <th className="text-left p-3 font-medium">Paid</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr
                    key={o._id}
                    onClick={() => navigate(`/order/${o._id}`)}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-3 font-medium text-slate-800">
                      {o.shippingAddress?.fullName || "—"}
                    </td>
                    <td className="p-3 font-semibold">PKR {o.amount}</td>
                    <td className="p-3 capitalize">{o.paymentMethod}</td>
                    <td className="p-3">
                      {o.isPaid || o.paymentStatus === "Paid" ? (
                        <span className="text-emerald-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColor[o.orderStatus] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
