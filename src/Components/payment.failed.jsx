import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Payment Cancelled
        </h1>
        <p className="text-lg mb-6">
          Your payment was cancelled. If you have any issues, please contact our
          support team.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/cart"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            Try Again
          </Link>
          <Link
            to="/shop"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
