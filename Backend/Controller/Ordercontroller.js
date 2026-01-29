import Order from "../Module/OrderModule.js";
import User from "../Module/UUserModule.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // middleware se set hua
    const { items, shippingAddress, amount, paymentMethod } = req.body;

    if (!items?.length || !shippingAddress || !amount || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
      }
    console.log(items.map((p)=>{
      console.log("product detail" ,p);
      
    }));
    
    const newOrder = new Order({
      user: userId,
      items,
      shippingAddress,
      amount,
      paymentMethod,
      orderStatus: "Pending",
      paymentStatus: "Pending",
      isPaid: false,
    });

    await newOrder.save();
    console.log("nworder" , newOrder);
    

  
  const clearcart =  await User.findByIdAndUpdate(userId, { cart: [] });
  
  

    res.status(201).json({ message: "Order placed successfully", order: newOrder , clearcart });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};


// ====================================================================================================


//
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// =======================================================

 

const getsingleorder = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ status: 400, message: "Order ID is required" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ status: 404, message: "Order not found" });
    }

    res.status(200).json({ status: 200, message: "Order fetched successfully", order });
  } catch (error) {
    console.error("Get Single Order Error:", error);
    res.status(500).json({ status: 500, message: "Failed to fetch order", error: error.message });
  }
};
// ======================================================================================

  

 const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;     
    const { status } = req.body;     
    
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// =========================================================================

const getorders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ message: "User orders fetched", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Some error in API" });
  }
};



export { placeOrder ,getAllOrders ,getsingleorder , getorders ,updateOrderStatus };
