import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const [showSearch, setshowSearch] = useState(false);
  const [visible, setvisible] = useState(false);
  const [search, setsearch] = useState("");
  const [cart, setcart] = useState([]);

  const currency = "$";
  const deliveryFee = 10;

  // 🛒 ADD TO CART
  const addToCart = (productDetail, size) => {
    const exist = cart.find(
      item =>
        item.product._id === productDetail._id &&
        item.Size === size
    );

    if (exist) {
      setcart(
        cart.map(item =>
          item.product._id === productDetail._id &&
          item.Size === size
            ? { ...item, Qty: item.Qty + 1 }
            : item
        )
      );
    } else {
      setcart([
        ...cart,
        { product: productDetail, Size: size, Qty: 1 }
      ]);
    }
  };

  // ➕ INCREASE QTY
  const increaseQty = (id, size) => {
    setcart(
      cart.map(item =>
        item.product._id === id && item.Size === size
          ? { ...item, Qty: item.Qty + 1 }
          : item
      )
    );
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id, size) => {
    setcart(
      cart
        .map(item =>
          item.product._id === id && item.Size === size
            ? { ...item, Qty: item.Qty - 1 }
            : item
        )
        .filter(item => item.Qty > 0)
    );
  };

  // 🗑 DELETE ITEM
  const deleteItem = (id, size) => {
    setcart(
      cart.filter(
        item => !(item.product._id === id && item.Size === size)
      )
    );
  };

  // 🧮 SUBTOTAL
  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.Qty,
      0
    );
  };

  // 💰 TOTAL
  const getTotal = () => {
    return getSubtotal() + deliveryFee;
  };

  //  CLEAR CART
  const clearCart = () => {
    setcart([]);
  };
// ================CART LENGTH =========================================================================
    const cartlength = cart.length

  //================================ LOAD CART FROM LOCAL STORAGE=======================================
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
  
    
    if (savedCart) {
      setcart(JSON.parse(savedCart));
    }
  }, []);


  // ==========================================SAVE CART TO LOCAL STORAGE=======================================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  const value = {
    products,
    cart,
    setcart,
    addToCart,
    increaseQty,
    decreaseQty,
    deleteItem,
    clearCart,
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
    cartlength
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
