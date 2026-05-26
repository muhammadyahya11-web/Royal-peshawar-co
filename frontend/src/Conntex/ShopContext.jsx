import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../config/api.js";
import { getCartSubtotal } from "../utils/cartHelpers.js";

export const ShopContext = createContext();


const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

const ShopContextProvider = ({ children }) => {
  const [showSearch, setshowSearch] = useState(false);
  const [visible, setvisible] = useState(false);
  const [search, setsearch] = useState("");
  const [orders, setorders] = useState([]);

  const [tooken, settooken] = useState(() => localStorage.getItem("tooken"));

  useEffect(() => {
    if (tooken) localStorage.setItem("tooken", tooken);
    else localStorage.removeItem("tooken");
  }, [tooken]);

  const [cart, setcart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!tooken) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, tooken]);

  useEffect(() => {
    API.interceptors.request.use((config) => {
      const token = localStorage.getItem("tooken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const onRejected = (error) => {
      if (error.response?.status === 401) {
        settooken("");
        setcart([]);
        localStorage.removeItem("tooken");
        localStorage.removeItem("cart");
        toast.error(
          error.response?.data?.message || "Session expired. Please login again."
        );
      }
      return Promise.reject(error);
    };

    API.interceptors.response.use((r) => r, onRejected);
    axios.interceptors.response.use((r) => r, onRejected);
  }, []);

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = "PKR";
  const deliveryFee = 10;

  const LogOut = async (navigate) => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      settooken("");
      setcart([]);
      localStorage.removeItem("tooken");
      localStorage.removeItem("cart");
      if (navigate) navigate("/login");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/productlist");
      setproducts(res.data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCart = async () => {
    if (!tooken) return;

    try {
      const res = await API.get("/cart/get");
      setcart(res.data.items || []);
    } catch (err) {
      if (err.response?.status !== 401) {
        toast.error("Could not load cart");
      }
    }
  };

  useEffect(() => {
    if (tooken) fetchCart();
  }, [tooken]);

const addToCart = async (product, size) => {
  if (!size) {
    toast.error("Please select a size");
    return;
  }

  if (tooken) {
    try {
      const res = await API.post("/cart/add", {
        productId: product._id,
        size,
        quantity: 1,
        images : product.images[0],
      });

      setcart(res.data.items || []);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add to cart");
    }
  } else {
    setcart((prev) => {
      const exist = prev.find(
        (i) => i.product._id === product._id && i.size === size
      );

      if (exist) {
        return prev.map((i) =>
          i.product._id === product._id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { product, size, quantity: 1 }];
    });

    toast.success("Added to cart");
  }
};

  const increaseQty = async (productId, size) => {
    const item = cart.find(
      (i) => i.product._id === productId && i.size === size
    );
    if (!item) return;

    const newQuantity = item.quantity + 1;

    if (tooken) {
      try {
        const res = await API.put("/cart/update", {
          productId,
          size,
          quantity: newQuantity,
        });
        setcart(res.data.items || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Could not update quantity");
      }
    } else {
      setcart((prev) =>
        prev.map((i) =>
          i.product._id === productId && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    }
  };

  const decreaseQty = async (productId, size) => {
    const item = cart.find(
      (i) => i.product._id === productId && i.size === size
    );
    if (!item) return;

    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) return removeItem(productId, size);

    if (tooken) {
      try {
        const res = await API.put("/cart/update", {
          productId,
          size,
          quantity: newQuantity,
        });
        setcart(res.data.items || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Could not update quantity");
      }
    } else {
      setcart((prev) =>
        prev.map((i) =>
          i.product._id === productId && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };

  const removeItem = async (productId, size) => {
    if (tooken) {
      try {
        const res = await API.delete("/cart/remove", {
          data: { productId, size },
        });
        setcart(res.data.items || []);
        toast.success("Item removed");
      } catch (err) {
        toast.error(err.response?.data?.message || "Could not remove item");
      }
    } else {
      setcart((prev) =>
        prev.filter(
          (i) => !(i.product._id === productId && i.size === size)
        )
      );
      toast.success("Item removed");
    }
  };

  const getSubtotal = () => getCartSubtotal(cart);
  const getTotal = () => getSubtotal() + deliveryFee;
  const cartlength = cart.reduce((sum, item) => sum + item.quantity, 0);

  const fetchOrders = async () => {
    if (!tooken) return;
    try {
      const res = await API.get("/order/orders");
      setorders(res.data.orders || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tooken]);

  const value = {
    products,
    loading,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    getSubtotal,
    getTotal,
    currency,
    deliveryFee,
    showSearch,
    setshowSearch,
    visible,
    setvisible,
    search,
    setsearch,
    cartlength,
    setcart,
    LogOut,
    tooken,
    settooken,
    orders,
    setorders,
    fetchOrders,
    fetchCart,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
