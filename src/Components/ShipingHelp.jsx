import React from "react";
import { Link } from "react-router-dom";

const ShippingHelpSection = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shipping Information & Help
        </h2>

        {/* Shipping Overview */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Overview
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We strive to deliver your items as quickly as possible. Once your
            order is confirmed, it will typically be dispatched within 1-2
            business days. Shipping times vary based on your location and the
            availability of the items you’ve ordered. Please note that estimated
            delivery times are provided for your convenience and may vary.
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h3>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                When will I receive my order?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                The estimated delivery time is typically between 3-7 business
                days, depending on your location. You will receive a
                confirmation email with tracking information once your order has
                been dispatched.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Do you offer express shipping?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, we offer express shipping options at checkout. Express
                shipping ensures your order will be delivered within 1-3
                business days. Additional charges may apply based on your
                location and the items in your order.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Can I track my order?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! Once your order has been shipped, you will receive a
                tracking number via email. You can use this tracking number to
                monitor your package’s journey.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                What are the shipping charges?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Shipping charges depend on your location and the total weight of
                your order. You can see the exact shipping charges during
                checkout before completing your purchase. We also offer free
                shipping on certain orders.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Do you ship internationally?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, we offer international shipping to selected countries.
                Please note that international shipping times and charges vary
                based on destination. Customs fees and import duties are the
                responsibility of the customer.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Shipping Help */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Need Further Assistance?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            If you have any other questions or concerns regarding shipping,
            please do not hesitate to reach out to our customer support team.
            We're here to help!
          </p>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-block py-3 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingHelpSection;
