import Order from "../Module/OrderModule.js";
import User from "../Module/UUserModule.js";
import Cart from "../Module/CartModule.js";
import Stripe from "stripe";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in Backend/.env");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const stripeCurrency = () =>
  (process.env.STRIPE_CURRENCY || "pkr").toLowerCase();

const mapOrderItems = (items = []) =>
  items.map((item) => ({
    productId: item.productId || item.product,
    quantity: item.quantity,
    size: item.size,
    image: item.image
      ? Array.isArray(item.image)
        ? item.image
        : [item.image]
      : [],
    name: item.name,
    price: item.price,
  }));

const clearUserCart = async (userId) => {
  await User.findByIdAndUpdate(userId, { cart: [] });
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });
};

const markOrderPaid = async (orderId, sessionId) => {
  await Order.findByIdAndUpdate(orderId, {
    isPaid: true,
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    ...(sessionId ? { stripeSessionId: sessionId } : {}),
  });
};

/* =========================================================
   PLACE COD ORDER
========================================================= */

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const { items, shippingAddress, amount, paymentMethod } = req.body;

    if (!items?.length || !shippingAddress || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newOrder = new Order({
      user: userId,
      items: mapOrderItems(items),
      shippingAddress,
      amount,
      paymentMethod: paymentMethod === "cod" ? "cod" : paymentMethod,
      orderStatus: "Pending",
      paymentStatus: "Pending",
      isPaid: false,
    });

    await newOrder.save();
    await clearUserCart(userId);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

/* =========================================================
   STRIPE CHECKOUT SESSION
========================================================= */

const stripeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, shippingAddress, amount, deliveryFee = 0 } = req.body;

    if (!items?.length || !shippingAddress || !amount) {
      return res.status(400).json({
        success: false,
        message: "Items, shipping address, and amount are required",
      });
    }

    const mappedItems = mapOrderItems(items);

    const newOrder = new Order({
      user: userId,
      items: mappedItems,
      shippingAddress,
      amount,
      paymentMethod: "stripe",
      orderStatus: "Pending",
      paymentStatus: "Pending",
      isPaid: false,
    });

    await newOrder.save();

    const currency = stripeCurrency();
    const stripe = getStripe();

    const line_items = mappedItems.map((item) => {
      const imageUrl = item.image?.[0];
      const productData = { name: item.name };
      if (
        imageUrl &&
        (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
      ) {
        productData.images = [imageUrl];
      }

      return {
        price_data: {
          currency,
          product_data: productData,
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    if (deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency,
          product_data: { name: "Delivery Fee" },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/payment/success?orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/cancel?orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
      },
    });

    newOrder.stripeSessionId = session.id;
    await newOrder.save();

    res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Stripe payment failed",
      error: error.message,
    });
  }
};

/* =========================================================
   VERIFY STRIPE PAYMENT (success page)
========================================================= */

const verifyStripePayment = async (req, res) => {
  try {
    const { orderId, session_id: sessionId } = req.query;

    if (!orderId || !sessionId) {
      return res.status(400).json({
        success: false,
        message: "orderId and session_id are required",
      });
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    if (session.metadata?.orderId !== orderId) {
      return res.status(400).json({
        success: false,
        message: "Order mismatch",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.isPaid) {
      await markOrderPaid(orderId, sessionId);
      await clearUserCart(session.metadata.userId);
    }

    const updatedOrder = await Order.findById(orderId);

    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

/* =========================================================
   STRIPE WEBHOOK
========================================================= */

const stripeWebhook = async (req, res) => {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).send("Stripe webhook not configured");
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;

    if (orderId) {
      const order = await Order.findById(orderId);
      if (order && !order.isPaid) {
        await markOrderPaid(orderId, session.id);
        if (userId) await clearUserCart(userId);
      }
    }
  }

  res.json({ received: true });
};

/* =========================================================
   GET USER ORDERS
========================================================= */

const getorders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* =========================================================
   ADMIN GET ALL ORDERS
========================================================= */

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* =========================================================
   SINGLE ORDER
========================================================= */

const getsingleorder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

/* =========================================================
   UPDATE STATUS
========================================================= */

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Status updated",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

export {
  placeOrder,
  stripeOrder,
  verifyStripePayment,
  stripeWebhook,
  getorders,
  getAllOrders,
  getsingleorder,
  updateOrderStatus,
};
