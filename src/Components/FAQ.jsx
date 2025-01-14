import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards, net banking, UPI, and digital wallets like PayPal and Google Pay.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you will receive a confirmation email with the tracking details. You can also track your order through the 'Order History' section on your account page.",
    },
    {
      question: "Can I change or cancel my order after it has been placed?",
      answer:
        "Yes, you can cancel or modify your order before it is shipped. Once your order has been dispatched, you won’t be able to modify or cancel it, but you can initiate a return after delivery.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery, provided the product is in its original condition and packaging. Some items, like personalized or perishable products, are non-returnable.",
    },
    {
      question: "How long will it take to receive my refund?",
      answer:
        "Once we receive the returned item and inspect it, we will process your refund within 5-7 business days. The refund will be credited to your original payment method.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "At the moment, we only offer shipping within the country. We are working on expanding our services to international destinations soon.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
