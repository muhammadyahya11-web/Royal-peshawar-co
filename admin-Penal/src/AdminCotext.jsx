import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AdminCotext = createContext();

export const AdminContextProvider = ({ children }) => {
  const localToken = localStorage.getItem("token");

  /* ================= STATES ================= */
  const [tooken, settooken] = useState(localToken);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SingleProduct, setSingleProduct] = useState(null);
  const [ordersdata, setordersdata] = useState([]);
  // ================================================
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

useEffect(() => {
const handleResize = () => {
if (window.innerWidth <= 900) {
setSidebarOpen(false);
} else {
setSidebarOpen(true);
}
};

}, []);
// ===============================================

  /* 🔹 PRODUCT FORM STATE (Add + Update) */
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Men",
    subcategory: "Top Wear",
    sizes: [],
    stock: "",
    featured: false,
    status: "Active",
    des: "",
  });

  /* ================= LOGOUT ================= */
  const logout = () => {
    settooken("");
    localStorage.removeItem("token");
  };

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/product/productlist"
      );
      if (res.status === 200) {
        setProducts(res.data.products || []);
      }
    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/product/deleteproduct/${id}`,
        { headers: { authorization: `Bearer ${tooken}` } }
      );

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= GET SINGLE PRODUCT ================= */
  const updateProduct = async (id) => {
    if (!id) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/api/product/product/${id}`,
        { headers: { authorization: `Bearer ${tooken}` } }
      );

      setSingleProduct(res.data.singleProduct || null);
    } catch (err) {
      console.log("Single product error:", err.message);
    }
  };

  /* ================= CLEAR SINGLE PRODUCT ================= */
  const clearSingleProduct = () => {
    setSingleProduct(null);
    setProduct({
      name: "",
      price: "",
      category: "Men",
      subcategory: "Top Wear",
      sizes: [],
      stock: "",
      featured: false,
      status: "Active",
      des: "",
    });
  };

  /* ================= INIT ================= */
  useEffect(() => {
    fetchProducts();
    console.log(tooken);
     settooken(  localStorage.getItem("tooken"))
    
  }, []);

  /* ================= CONTEXT VALUE ================= */
  const value = {
    tooken,
    settooken,
    logout,

   products, 
   setProducts ,
    fetchProducts,

    product,
    setProduct,

    SingleProduct,
    updateProduct,
    clearSingleProduct,

    deleteProduct,
    loading,

    ordersdata,
    setordersdata,

    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <AdminCotext.Provider value={value}>
      {children}
    </AdminCotext.Provider>
  );
};
