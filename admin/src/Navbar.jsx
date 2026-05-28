import React, { useContext } from "react";
import { AdminCotext } from "./AdminCotext";
import { Menu, RefreshCw } from "lucide-react";

function Navbar() {
  const { sidebarOpen, setSidebarOpen, fetchOrders, fetchProducts } =
    useContext(AdminCotext);

  const refresh = () => {
    fetchOrders();
    fetchProducts();
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 md:hidden"
        >
          <Menu size={20} className="text-slate-700" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Store Admin</h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            Manage products and orders
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={refresh}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-lg hover:bg-slate-50"
      >
        <RefreshCw size={16} />
        <span className="hidden sm:inline">Refresh</span>
      </button>
    </header>
  );
}

export default Navbar;
