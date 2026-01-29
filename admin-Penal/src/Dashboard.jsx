import React, { useContext, useState } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  RefreshCw,
  Download,
  Bell,
  Star,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { AdminCotext } from "./AdminCotext";

// ================= MOCK DATA =================
const stats = [
  { title: "Total Revenue", value: "$92,650", icon: DollarSign },
  { title: "Total Orders", value: "1,645", icon: ShoppingCart },
  { title: "Active Customers", value: "1,462", icon: Users },
  { title: "Products", value: "320", icon: Package },
];

const salesData = [
  { name: "Mon", sales: 120 },
  { name: "Tue", sales: 200 },
  { name: "Wed", sales: 150 },
  { name: "Thu", sales: 278 },
  { name: "Fri", sales: 189 },
  { name: "Sat", sales: 239 },
  { name: "Sun", sales: 300 },
];

const orderStatusData = [
  { name: "Pending", value: 25 },
  { name: "Processing", value: 30 },
  { name: "Shipped", value: 40 },
  { name: "Delivered", value: 45 },
  { name: "Cancelled", value: 10 },
];

const revenueCompare = [
  { name: "This Week", value: 4200 },
  { name: "Last Week", value: 3100 },
];

const recentOrders = [
  { id: "#1023", customer: "Ali Khan", amount: "$240", status: "Delivered" },
  { id: "#1024", customer: "Usman", amount: "$120", status: "Pending" },
  { id: "#1025", customer: "Hamza", amount: "$560", status: "Shipped" },
  { id: "#1026", customer: "Bilal", amount: "$90", status: "Processing" },
];

const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"];

// ================= COMPONENTS =================
const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl p-6 shadow-lg flex items-center justify-between hover:scale-[1.05] transition-all">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
    <div className="bg-white p-3 rounded-full shadow">
      <Icon className="w-8 h-8 text-emerald-500" />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusColor = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

// ================= DASHBOARD =================
const Dashboard = () => {
  const [range, setRange] = useState("7d");
  const { ordersdata} = useContext(AdminCotext)
  console.log(ordersdata);
  

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-600">Business intelligence overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-xl px-4 py-2 text-sm shadow">
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="bg-white p-3 rounded-xl shadow hover:bg-gray-100 transition">
            <RefreshCw className="w-5 h-5 text-emerald-500" />
          </button>
          <button className="bg-white p-3 rounded-xl shadow hover:bg-gray-100 transition">
            <Download className="w-5 h-5 text-emerald-500" />
          </button>
          <button className="relative bg-white p-3 rounded-xl shadow hover:bg-gray-100 transition">
            <Bell className="w-5 h-5 text-emerald-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* SALES TREND + ORDER STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SALES TREND */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" /> Sales Trend
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={salesData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} />
              <YAxis stroke="#94A3B8" tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #10B981" }}
                itemStyle={{ color: "#065F46", fontWeight: "bold" }}
              />
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#10B981", stroke: "#fff", strokeWidth: 3 }}
                animationDuration={1500}
              />
              <Line type="monotone" dataKey="sales" stroke="none" fill="url(#salesGradient)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" innerRadius={60} outerRadius={110} label>
                {orderStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REVENUE COMPARISON + RECENT ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" /> Revenue Comparison
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueCompare}>
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-500" /> Recent Orders
          </h2>
          <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b border-gray-200">Order</th>
                <th className="p-3 border-b border-gray-200">Customer</th>
                <th className="p-3 border-b border-gray-200">Amount</th>
                <th className="p-3 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 border-b border-gray-200">{o.id}</td>
                  <td className="p-3 border-b border-gray-200">{o.customer}</td>
                  <td className="p-3 border-b border-gray-200">{o.amount}</td>
                  <td className="p-3 border-b border-gray-200">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
