import Cart from "../Module/CartModule.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // ← from middleware
    const { productId, quantity = 1, size ,image , name , price} = req.body;
      
    if(! image){
       return res.status(400).json({ message: "product image not avlible " });
    }
    if (!productId || !size) {
      return res.status(400).json({ message: "productId and size required" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be > 0" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity, size ,name , price ,image}],
      });
      cart = await cart.populate("items.product", "name price image");
      return res.status(201).json({ message: "Added to cart", items: cart.items });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size ,image , name ,price});
    }

    await cart.save();
    cart = await cart.populate("items.product", "name price image");

    res.status(200).json({ message: "Cart updated", items: cart.items });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================================================================

const updateCartQuantity = async (req, res) => {
  try {
     const userId = req.userId;
    
    
    console.log("User ID:", userId);

    const { productId, quantity, size } = req.body;
    console.log("Product ID:", productId, "Quantity:", quantity, "Size:", size);

    if (!productId || quantity === undefined || !size) {
      return res.status(400).json({ message: "Product, quantity, and size are required" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
  

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    // Populate product details
    cart = await cart.populate("items.product", "name price image");

    res.status(200).json({ message: "Cart updated", items: cart.items });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ===================================================================

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size } = req.body;
   
    console.log("userid " ,userId);
    

    if (!productId || !size)
      return res.status(400).json({ message: "ProductId and size required" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();
    cart = await cart.populate("items.product", "name price image");


    res.status(200).json({ message: "Item removed", items: cart.items });
  } catch (error) {
    console.error("REMOVE CART ITEM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


  
// =======================GET CART=========================================

const getCart = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    let cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};





export { addToCart  , removeFromCart ,updateCartQuantity ,getCart };
