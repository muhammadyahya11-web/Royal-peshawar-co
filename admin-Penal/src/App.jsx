import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Addproduct from "./Addproduct";
import Orders from "./Orders";
import List from "./List";
import ViewOrder from "./Vieworder";
import Dashboard from "./Dashboard";
import AdminLogin from "./AdminLogin";

import { AdminCotext } from "./AdminCotext";
import Setting from "./Setting";
import Jackets from "../../frontend/src/Components/Jackets";

function App() {
  const { sidebarOpen, tooken } = useContext(AdminCotext);

  return (
    <BrowserRouter>
      {!tooken ? (
        //  NOT LOGGED IN  LOGIN ONLY
        <Routes>
          <Route path="*" element={<AdminLogin />} />
        </Routes>
      ) : (
        //  LOGGED IN  FULL ADMIN PANEL
        <div className="flex min-h-screen">
          {/* Sidebar */}
          {sidebarOpen && (
            <div className="w-64">
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Navbar />

            <div className="p-4">
              <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/list" element={<List />} />
                <Route path="/order/:id" element={<ViewOrder />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/jackets" element={<Jackets />} />
                  {/* fallback */}
                <Route path="" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;