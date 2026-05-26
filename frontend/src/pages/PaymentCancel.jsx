import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center max-w-md w-full">
        <XCircle className="text-red-500 mx-auto" size={64} />
        <h2 className="text-3xl font-bold mt-6 text-gray-900">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mt-3">
          No charge was made. You can return to checkout and try again.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mt-2">
            Pending order: {orderId}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            to="/checkout"
            className="bg-black text-white px-8 py-3 rounded-2xl font-medium"
          >
            Back to Checkout
          </Link>
          <Link
            to="/cart"
            className="border border-gray-200 px-8 py-3 rounded-2xl font-medium"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
