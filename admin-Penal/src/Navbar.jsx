import React, { useContext } from "react";
import { AdminCotext } from "./AdminCotext";
import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
  const { logout ,sidebarOpen, setSidebarOpen} = useContext(AdminCotext);

  return (
    <nav className="flex items-center justify-between bg-white shadow-lg px-6 py-3">
      {/* ===== LEFT: Sidebar Toggle ===== */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 md:hidden transition"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-emerald-500" />
          ) : (
            <Menu className="w-6 h-6   text-emerald-500" />
          )}
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Admin Panel
        </h1>
      </div>

      {/* ===== RIGHT: Logout ===== */}
      <div className="flex items-center gap-3">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-2xl hover:bg-emerald-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
