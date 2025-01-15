import React from "react";

const PaymentWarningPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment in Progress
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Please do not refresh the page or close the tab, your payment is being
          processed.
        </p>

        {/* Loader Spinner (optional) */}
        <div className="flex justify-center items-center mb-6">
          <div className="animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12 border-solid"></div>
        </div>

        {/* Message once the payment is complete */}

        <p className="text-lg text-green-600">
          Your payment is complete! Redirecting...
        </p>
      </div>
    </div>
  );
};

export default PaymentWarningPage;
