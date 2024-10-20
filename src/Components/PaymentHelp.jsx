import React, { useState } from "react";

const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    upiId: "",
    wallet: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment logic here, e.g., Razorpay integration, etc.
    console.log("Payment submitted", formData);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Payment Details
        </h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Select Payment Method:
          </label>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg cursor-pointer ${
                paymentMethod === "creditCard" ? "bg-indigo-200" : "bg-white"
              } border border-gray-300 shadow-sm`}
              onClick={() => setPaymentMethod("creditCard")}
            >
              <p className="font-semibold text-gray-800">Credit/Debit Card</p>
            </div>
            <div
              className={`p-4 rounded-lg cursor-pointer ${
                paymentMethod === "upi" ? "bg-indigo-200" : "bg-white"
              } border border-gray-300 shadow-sm`}
              onClick={() => setPaymentMethod("upi")}
            >
              <p className="font-semibold text-gray-800">UPI</p>
            </div>
            <div
              className={`p-4 rounded-lg cursor-pointer ${
                paymentMethod === "wallet" ? "bg-indigo-200" : "bg-white"
              } border border-gray-300 shadow-sm`}
              onClick={() => setPaymentMethod("wallet")}
            >
              <p className="font-semibold text-gray-800">Wallet</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form
          onSubmit={handlePaymentSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {paymentMethod === "creditCard" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nameOnCard"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <div className="mb-4">
              <label
                htmlFor="upiId"
                className="block text-sm font-medium text-gray-700"
              >
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="example@upi"
                required
              />
            </div>
          )}

          {paymentMethod === "wallet" && (
            <div className="mb-4">
              <label
                htmlFor="wallet"
                className="block text-sm font-medium text-gray-700"
              >
                Wallet
              </label>
              <select
                name="wallet"
                value={formData.wallet}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Wallet</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="mobikwik">MobiKwik</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;
