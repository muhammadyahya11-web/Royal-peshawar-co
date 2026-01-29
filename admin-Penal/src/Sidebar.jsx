import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, PlusCircle, Clipboard, Home, Settings, LogOut } from "lucide-react";
import { AdminCotext } from "./AdminCotext";

function Sidebar() {
  const { sidebarOpen, setSidebarOpen , logout } = useContext(AdminCotext);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={20} />, greenShadow: true },
    { to: "/list", label: "Product List", icon: <Box size={20} /> },
    { to: "/addproduct", label: "Add Product", icon: <PlusCircle size={20} /> },
    { to: "/", label: "Orders", icon: <Clipboard size={20} /> },
  ];

  // Optional: close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 900) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`
        bg-gray-50 shadow-lg p-4 

        md:flex md:flex-col md:w-64 md:min-h-screen
        fixed md:static top-0 left-0 h-full z-50 w-full
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* LOGO */}
      <div className="mb-8 px-4 py-3">
        <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
          Royal Peshawar Co.
        </h1>
      </div>

      {/* MAIN LINKS */}
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
              ${isActive ? "bg-emerald-500 text-white shadow-lg scale-105" : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800"}`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
            {link.greenShadow && (
              <span className="absolute -bottom-1 left-10 w-3/4 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-sm"></span>
            )}
          </NavLink>
        ))}
      </div>

      {/* SETTINGS & LOGOUT */}
      <div className="flex flex-col gap-2 mt-6">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
             ${isActive ? "bg-emerald-500 text-white shadow-lg scale-105" : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800"}`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-gray-700 hover:bg-red-100 hover:text-red-600"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;