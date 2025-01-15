import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For generating tables in the PDF

const OrderCard = ({ order }) => {
  const [showInvoice, setShowInvoice] = useState(false);

  const { user, items, totalAmount, status, createdAt } = order;

  console.log(order);

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Correct font path for CRA public folder
    const fontPath = "/fonts/NotoSans-Regular.ttf"; // Correct relative path from 'public' directory

    // Load the font
    doc.addFileToVFS("NotoSans-Regular.ttf", fontPath); // Add font to virtual file system
    doc.setFont("NotoSans-Regular"); // Set the font to NotoSans-Regular

    // Set font size and other settings
    doc.setFontSize(12);

    // Add company name and invoice title
    doc.setFontSize(16);
    doc.text("Smart Solution Pvt. Ltd.", 14, 20);
    doc.setFontSize(12);
    doc.text("www.smart-shop-kro.netlify.app", 14, 25);

    // Draw a horizontal line to separate header from the rest of the document
    doc.line(14, 28, 200, 28);

    doc.setFontSize(14);
    doc.text(`Invoice for Order: ${order._id}`, 14, 40);

    // User Info
    doc.setFontSize(12);
    doc.text(`User: ${order.user.name}`, 14, 50);
    doc.text(`Email: ${order.user.email}`, 14, 55);

    // Status and Order Date
    doc.text(`Status: ${order.status}`, 14, 65);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleString()}`,
      14,
      70
    );

    // Draw a horizontal line to separate order info from the address
    doc.line(14, 75, 200, 75);

    // Address Information
    const address = order.address;
    if (address) {
      doc.setFontSize(12);
      doc.text("Delivery Address:", 14, 85);
      doc.text(`${address.name}`, 14, 95);
      doc.text(`${address.address}`, 14, 100);
      doc.text(
        `${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`,
        14,
        105
      );
      doc.text(`Phone: ${address.phone}`, 14, 110);
      if (address.landmark) {
        doc.text(`Landmark: ${address.landmark}`, 14, 115);
      }

      // Draw a line after the address to separate it from the items table
      doc.line(14, 120, 200, 120);
    }

    // Create an item table with improved styling
    const itemRows = order.items.map((item) => [
      item.product.name,
      item.quantity,
      `${item.product.price}/-`,
      `${item.quantity * item.product.price}/-`,
    ]);

    doc.autoTable({
      startY: 125, // Start the table below the address section
      head: [["Product", "Quantity", "Price", "Total"]],
      body: itemRows,
      theme: "striped",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
      },
      styles: {
        overflow: "linebreak",
        cellPadding: 5,
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { halign: "center" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
    });

    // Add subtotal and total amount
    const finalY = doc.lastAutoTable.finalY;
    const subtotal = order.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const totalAmount = order.totalAmount;

    // Add the ₹ symbol correctly
    doc.text(`Subtotal: ${subtotal}/-`, 14, finalY + 10); // Using ₹ directly
    doc.text(`Total Amount: ${totalAmount}/-`, 14, finalY + 20); // Using ₹ directly

    // Add Footer with Terms or Additional Info
    doc.setFontSize(8);
    doc.text(
      "Terms and Conditions: All sales are final. No refunds.",
      14,
      doc.internal.pageSize.height - 10
    );

    // Save the PDF with a custom name
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
          <p className="text-gray-800 font-semibold">User ID: {user._id}</p>
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
            <p>User ID: {user._id}</p>
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
