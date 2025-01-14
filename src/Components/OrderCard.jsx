import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For generating tables in the PDF

const OrderCard = ({ order }) => {
  const [showInvoice, setShowInvoice] = useState(false);

  const { user, items, totalAmount, status, createdAt } = order;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Set default font size
    doc.setFontSize(12);

    // Add title
    doc.text(`Invoice for Order: ${order._id}`, 14, 20);

    // User Info
    doc.text(`User: ${order.user}`, 14, 30);

    // Status and Order Date
    doc.text(`Status: ${order.status}`, 14, 40);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleString()}`,
      14,
      50
    );

    // Create an item table
    const itemRows = order.items.map((item) => [
      item.product.name,
      item.quantity,
      `${item.product.price}/-`,
      `${item.quantity * item.product.price}/-`,
    ]);

    // Auto table for order items
    doc.autoTable({
      startY: 60, // Start the table below the previous text
      head: [["Product", "Quantity", "Price", "Total"]],
      body: itemRows,
      theme: "grid", // Option for grid table style
      headStyles: {
        fillColor: [41, 128, 185], // Customize header color
        textColor: [255, 255, 255], // White text for headers
      },
      styles: {
        overflow: "linebreak", // Allow content to wrap within cells
        cellPadding: 3, // Add padding to cells
      },
    });

    // Add Total Amount below the table
    const finalY = doc.lastAutoTable.finalY; // Get Y position of the last table row
    doc.text(`Total Amount: ${order.totalAmount}/-`, 14, finalY + 10);

    // Save the PDF
    doc.save(`invoice_${order._id}.pdf`);
  };

  return (
    <>
      <div
        className="p-6 w-full mx-auto bg-white rounded-xl shadow-md space-y-4 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowInvoice(true)} // Show modal on click
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
        </div>

        <div>
          <p className="text-gray-800 font-semibold">User ID: {user}</p>
          <p className="text-gray-600">
            Status:{" "}
            <span
              className={`ml-2 px-2 py-1 rounded ${
                status === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </p>
          <p className="text-gray-600">
            Order Date: {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Items:</h3>
          {items.map((item) => (
            <div key={item._id} className="border-b py-4">
              <div className="flex">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-xl font-semibold text-gray-800">
            Total Amount: ₹{totalAmount}
          </p>
        </div>
      </div>

      {/* Modal to Preview Invoice */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
            <p className="text-sm text-gray-500">Order ID: {order._id}</p>
            <p>User ID: {user}</p>
            <p>Status: {status}</p>
            <p>Order Date: {new Date(createdAt).toLocaleString()}</p>

            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul>
              {items.map((item) => (
                <li key={item._id} className="mb-2">
                  <strong>{item.product.name}</strong> - ₹{item.product.price} x{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">Total Amount: ₹{totalAmount}</p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setShowInvoice(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleDownloadInvoice}
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
