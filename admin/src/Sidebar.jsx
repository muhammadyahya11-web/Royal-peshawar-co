import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { AdminCotext } from "./AdminCotext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/list", label: "Products", icon: Package },
  { to: "/addproduct", label: "Add Product", icon: PlusCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const { sidebarOpen, setSidebarOpen, logout } = useContext(AdminCotext);

  const closeOnMobile = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-200 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-5 py-6 border-b border-slate-800">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Admin
        </p>
        <h1 className="text-lg font-semibold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
          Royal Peshawar
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeOnMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-red-950 hover:text-red-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
