import React from "react";
import { Link } from "react-router-dom";

const CancellationReturnHelpSection = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Cancellation & Return Policy
        </h2>

        {/* Cancellation Policy */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Cancellation Policy
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We understand that plans change! You can cancel your order anytime
            before it is dispatched. Once your order has been dispatched, it
            cannot be canceled, and you will need to initiate a return request
            after receiving the item. To cancel your order, visit your order
            history and click on the "Cancel Order" button next to the relevant
            item.
          </p>
        </div>

        {/* Return Policy */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Return Policy
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We want you to be fully satisfied with your purchase! If you're not
            happy with the product, you may return it within 30 days of delivery
            for a full refund or exchange, provided the item is in its original
            condition and packaging. Some exclusions may apply, including
            customized or perishable items.
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h3>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                How do I cancel my order?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To cancel your order, go to your order history, select the order
                you want to cancel, and click on the "Cancel Order" button. If
                the cancellation is successful, you will receive a confirmation
                email. If the order has already been shipped, you cannot cancel
                it, but you may return the product after it has been delivered.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                How do I return a product?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To initiate a return, go to your order history, select the item
                you wish to return, and follow the instructions to schedule a
                pickup. You will be refunded once the returned item is received
                and processed. Please make sure the product is in its original
                condition and packaging.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Can I exchange a product instead of returning it?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Yes! If you’d like to exchange an item for a different size,
                color, or model, you can select the exchange option when
                initiating a return. Availability depends on stock levels at the
                time of your request.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                How long does the return process take?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Once you initiate a return, our logistics team will pick up the
                item within 2-5 business days. After the item is received and
                inspected, refunds are typically processed within 5-7 business
                days. You will be notified via email throughout the process.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-300 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Are there any items that cannot be returned?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, certain items such as perishable goods, customized items,
                and certain personal care products cannot be returned. Please
                refer to our return policy for a full list of exclusions.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Returns & Cancellation Help */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Need Help with Returns or Cancellations?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            If you have any additional questions or concerns regarding
            cancellations or returns, don’t hesitate to contact our customer
            support team for further assistance. We're here to help!
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

export default CancellationReturnHelpSection;
