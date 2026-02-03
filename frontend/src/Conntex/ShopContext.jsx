import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

const API = axios.create({

  baseURL: "http://localhost:8000/api",

});

const ShopContextProvider = ({ children }) => {
  // ================= UI =================
  const [showSearch, setshowSearch] = useState(false);
  const [visible, setvisible] = useState(false);
  const [search, setsearch] = useState("");
  const [orders, setorders] = useState([])

  // ================= TOKEN =================
  const [tooken, settooken] = useState(() => localStorage.getItem("tooken"));
  useEffect(() => {
    if (tooken) localStorage.setItem("tooken", tooken);
  }, [tooken]);

  // ================= CART =================
  const [cart, setcart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!tooken) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, tooken]);

  // ================= PRODUCTS =================
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = "PKR";
  const deliveryFee = 10;

  // ================= LOGOUT =================
  const LogOut = async (navigate) => {
    try {
      await API.post("/auth/logout");
      settooken("");
      setcart([]);
      localStorage.removeItem("tooken");
      localStorage.removeItem("cart");
      if (navigate) navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/productlist" );
      setproducts(res.data.products || []);
        console.log("products" ,res.data.products);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
 
   
  // ================= FETCH CART =================
  const fetchCart = async () => {
    if (!tooken) return; 
    
    
    try {
      const res = await API.get("/cart/get", {
        headers: { Authorization:  `Bearer ${tooken}` },
      });
      console.log("cart data " ,res.data);
      
      setcart(res.data.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [tooken]);

  // ================= ADD TO CART =================
  const addToCart = async (product, size) => {
  
    console.log(product ,"size " ,size);
    
    if (tooken) {
      
       
        
      try {
        const res = await API.post(
          "/cart/add",
          { productId: product._id, size , quantity: 1 ,image : product.images[0] ,name :product.name ,price : product.price ,},
          { headers: { Authorization: `Bearer ${tooken}` } }
        );
        setcart(res.data.items || cart);
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    } else {
      // user not logged in → localStorage
      const exist = cart.find(
        (i) => i.product._id === product._id && i.size === size
      );
      let updatedCart = [];
      if (exist) {
        updatedCart = cart.map((i) =>
          i.product._id === product._id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updatedCart = [...cart, { product, size, quantity: 1 }];
      }
      setcart(updatedCart);
    }
  };

  // ================= UPDATE QUANTITY =================
  const increaseQty = async (productId, size) => {
    const item = cart.find((i) => i.product._id === productId && i.size === size);
    if (!item) return;
    console.log(productId ,size );
    
    const newQuantity = item.quantity + 1;

    if (tooken) {
      // API
      try {
        const res = await API.put(
          "/cart/update",
          { productId, size, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${tooken}` } }
        );
        setcart(res.data.items || cart);
      } catch (err) {
        console.error("Increase quantity error:", err);
      }
    } else {
      // localStorage
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
    const item = cart.find((i) => i.product._id === productId && i.size === size);
    if (!item) return;
    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) return removeItem(productId, size);

    if (tooken) {
      try {
        console.log(tooken);
        
        const res = await API.put(
          "/cart/update",
          { productId, size, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${tooken}` } }
        );
        setcart(res.data.items || cart);
      } catch (err) {
        console.error("Decrease quantity error:", err);
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

  // ================= REMOVE ITEM =================
  const removeItem = async (productId, size) => {
    console.log(productId ,size);
    
    
    if (tooken) {
      try {
        const res = await API.delete("/cart/remove", {
          headers: { Authorization: `Bearer ${tooken}` },
          data: { productId, size },
        });
        console.log(res.data ,tooken);
        
        setcart(res.data.items || cart.filter((i) => !(i.product._id === productId && i.size === size)));
      } catch (err) {
        console.error("Remove item error:", err);
      }
    } else {
      setcart((prev) =>
        prev.filter((i) => !(i.product._id === productId && i.size === size))
      );
    }
  };



  // ================= TOTALS =================
  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getTotal = () => getSubtotal() + deliveryFee;

  const cartlength = cart.reduce((sum, item) => sum + item.quantity, 0);
  // ===================================================================
  useEffect(() => {
      const fetchorder = async () => {
        try {
          const orders = await axios.get(
            "http://localhost:8000/api/order/orders",
            
            {
              headers: { Authorization: `Bearer ${tooken}` },
            }
           
  
          );
          
          setorders(orders.data.orders)
          
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      if (tooken) fetchorder();
    }, [tooken]);
    
    
  
  
  // ===================================================================================

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
    orders , setorders
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
