import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Return & Refund Policy
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          We want you to be completely satisfied with your purchase. If you are
          not happy with the product or if it arrives damaged, you can return it
          to us. Please read our return and refund policy to know more.
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Eligibility for Returns
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can return most items purchased within 30 days of delivery,
              provided they are in their original condition, with all tags and
              packaging intact. Certain items like perishable goods, intimate or
              sanitary products, and personalized items are not eligible for
              return.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              How to Return an Item
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To initiate a return, log into your account, go to the 'Order
              History' section, select the item you want to return, and click on
              the 'Return Item' button. Follow the prompts to schedule a pickup
              or drop-off. We will arrange for the item to be collected, or you
              can send it back to us using a local courier.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Refund Process
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Once we receive your returned item, our team will inspect it. If
              approved, the refund will be processed within 5-7 business days
              and will be credited back to your original payment method. Please
              note that shipping charges are non-refundable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Non-Returnable Items
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The following items are not eligible for return:
              <ul className="list-disc ml-5 mt-3">
                <li>Perishable goods (e.g., food, flowers)</li>
                <li>Personalized or custom-made items</li>
                <li>Intimate or sanitary products</li>
                <li>Gift cards</li>
                <li>Final sale items</li>
              </ul>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Damaged or Defective Items
            </h3>
            <p className="text-gray-600 leading-relaxed">
              If you receive an item that is damaged or defective, please
              contact us within 48 hours of receiving the product. We will
              provide a replacement or full refund, including any shipping
              costs, after verifying the defect.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            For further assistance with your return or refund, feel free to
            <span className="text-blue-600 underline cursor-pointer">
              {" "}
              <Link to="/contact">contact our support team</Link>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
