import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AdminLogin from "./AdminLogin";
import { AdminCotext } from "./AdminCotext";

const Dashboard = lazy(() => import("./Dashboard"));
const Orders = lazy(() => import("./Orders"));
const List = lazy(() => import("./List"));
const Addproduct = lazy(() => import("./Addproduct"));
const ViewOrder = lazy(() => import("./Vieworder"));
const Setting = lazy(() => import("./Setting"));

const PageLoader = () => (
  <div className="flex items-center justify-center py-20 text-slate-500">
    Loading...
  </div>
);

function App() {
  const { sidebarOpen, setSidebarOpen, tooken } = useContext(AdminCotext);

  if (!tooken) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar />

        <div className="md:ml-64 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1 p-4 md:p-6">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/list" element={<List />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/order/:id" element={<ViewOrder />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
