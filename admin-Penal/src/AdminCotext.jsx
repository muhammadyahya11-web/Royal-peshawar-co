import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { API_BASE } from "./config/api.js";

export const AdminCotext = createContext();

const adminApi = axios.create({ baseURL: API_BASE });

export const AdminContextProvider = ({ children }) => {
  const [tooken, settooken] = useState(() => localStorage.getItem("tooken"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SingleProduct, setSingleProduct] = useState(null);
  const [ordersdata, setordersdata] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Men",
    subcategory: "Top Wear",
    sizes: [],
    stock: "",
    featured: false,
    status: "active",
    des: "",
  });

  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth > 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    adminApi.interceptors.request.use((config) => {
      const token = localStorage.getItem("tooken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, []);

  const logout = () => {
    settooken("");
    setordersdata([]);
    localStorage.removeItem("tooken");
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/product/productlist");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Products:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    const token = tooken || localStorage.getItem("tooken");
    if (!token) return;

    try {
      setOrdersLoading(true);
      const res = await adminApi.get("/order/admin/orders");
      setordersdata(res.data.orders || []);
    } catch (err) {
      console.error("Orders:", err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, [tooken]);

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await adminApi.delete(`/product/deleteproduct/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id) => {
    if (!id) return;
    try {
      const res = await adminApi.get(`/product/product/${id}`);
      setSingleProduct(res.data.singleProduct || null);
    } catch (err) {
      console.error("Product detail:", err.message);
    }
  };

  const viewProduct = updateProduct;

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
      status: "active",
      des: "",
    });
  };

  useEffect(() => {
    if (tooken) {
      fetchProducts();
      fetchOrders();
    }
  }, [tooken, fetchProducts, fetchOrders]);

  const value = {
    tooken,
    settooken,
    logout,
    products,
    setProducts,
    fetchProducts,
    product,
    setProduct,
    SingleProduct,
    updateProduct,
    viewProduct,
    clearSingleProduct,
    deleteProduct,
    loading,
    ordersdata,
    setordersdata,
    ordersLoading,
    fetchOrders,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <AdminCotext.Provider value={value}>{children}</AdminCotext.Provider>
  );
};
