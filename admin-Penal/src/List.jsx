import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Plus, Pencil, Trash2, Eye, Package } from "lucide-react";
import { AdminCotext } from "./AdminCotext";

function List() {
  const {
    tooken,
    products,
    loading,
    deleteProduct,
    updateProduct,
    viewProduct,
     setProducts
  } = useContext(AdminCotext);


     
     
  
  const statusStyle = (status) => {
    if (status === "active") return "bg-emerald-100 text-emerald-700";
    if (status === "unactive") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };
  
  const updateStatus = async (id, currentStatus) => {
    try {
      console.log("hhhhh" ,tooken);
      
      const newStatus = currentStatus === "active" ? "unactive" : "active";

    const res =  await axios.put(
  `http://localhost:8000/api/product/productstatus/${id}`,
  {status:newStatus}, 
  {
    headers: {
      Authorization: `Bearer ${tooken}`,
    },
  }
);
     console.log(res.data);
     
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* 🔹 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Manage all store products</p>
        </div>

        <Link
          to="/addproduct"
          className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* 🔹 STATS */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={products.length} icon={<Package />} />
        <StatCard
          title="Active Products"
          value={products.filter((p) => p.status === "active").length}
          icon={<Package />}
        />
        <StatCard
          title="Inactive Products"
          value={products.filter((p) => p.status === "unactive").length}
          icon={<Package />}
        />
        <StatCard
          title="Out of Stock"
          value={products.filter((p) => p.stock === 0).length}
          icon={<Package />}
        />
      </div>

      {/* 🔹 DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-emerald-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.images?.[0]}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-500">{p._id}</p>
                    </div>
                  </td>

                  <td className="p-4 text-center">{p.category}</td>
                  <td className="p-4 text-center font-medium">Rs {p.price}</td>
                  <td className="p-4 text-center">{p.stock}</td>

                  <td className="p-4 text-center">
                    <span
                      onClick={() => updateStatus(p._id, p.status)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                    
                      <Link to="/addproduct">
                        <ActionBtn icon={<Pencil size={16} />} onClick={() => updateProduct(p._id)} />
                      </Link>
                      <ActionBtn
                        icon={<Trash2 size={16} />}
                        danger
                        onClick={() => deleteProduct(p._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* 🔹 MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-2xl shadow p-4 flex gap-4">
            <img
              src={p.images?.[0]}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1 space-y-1">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-xs text-gray-500">{p._id}</p>
              <p className="text-sm">Category: {p.category}</p>
              <p className="text-sm font-medium">Rs {p.price}</p>

              <span
                onClick={() => updateStatus(p._id, p.status)}
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${statusStyle(
                  p.status
                )}`}
              >
                {p.status}
              </span>

              <div className="flex gap-3 mt-3">
                <ActionBtn icon={<Eye size={16} />} onClick={() => viewProduct(p._id)} />
                <Link to="/addproduct">
                  <ActionBtn icon={<Pencil size={16} />} onClick={() => updateProduct(p._id)} />
                </Link>
                <ActionBtn
                  icon={<Trash2 size={16} />}
                  danger
                  onClick={() => deleteProduct(p._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔹 SMALL COMPONENTS */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow p-5 flex items-center gap-4">
      <div className="p-3 bg-white rounded-xl shadow">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border transition ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-gray-200 text-gray-700 hover:bg-emerald-50"
      }`}
    >
      {icon}
    </button>
  );
}

export default List;
