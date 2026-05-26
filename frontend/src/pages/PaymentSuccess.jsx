import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { ShopContext } from "../Conntex/ShopContext";
import { toast } from "react-toastify";

import { API_BASE } from "../config/api.js";

const PaymentSuccess = () => {
  const { setcart } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      const token = localStorage.getItem("tooken");

      if (!token || !orderId || !sessionId) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE}/order/stripe/verify?orderId=${orderId}&session_id=${sessionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setcart([]);
          localStorage.setItem("cart", JSON.stringify([]));
          setStatus("success");
          toast.success("Payment confirmed!");
        } else {
          setStatus("error");
          toast.error(data.message || "Could not verify payment");
        }
      } catch {
        setStatus("error");
        toast.error("Something went wrong");
      }
    };

    verifyPayment();
  }, [orderId, sessionId, setcart]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-gray-800" size={48} />
        <p className="text-gray-600">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Payment verification failed
          </h2>
          <p className="text-gray-500 mt-3">
            If you were charged, contact support with your order reference.
          </p>
          <Link
            to="/order"
            className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-2xl"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center max-w-md w-full">
        <CheckCircle className="text-green-600 mx-auto" size={64} />
        <h2 className="text-3xl font-bold mt-6 text-gray-900">
          Payment Successful
        </h2>
        <p className="text-gray-500 mt-3">
          Thank you! Your order has been placed and payment received.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mt-2">
            Order ID: {orderId}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            to="/order"
            className="bg-black text-white px-8 py-3 rounded-2xl font-medium"
          >
            My Orders
          </Link>
          <Link
            to="/"
            className="border border-gray-200 px-8 py-3 rounded-2xl font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
