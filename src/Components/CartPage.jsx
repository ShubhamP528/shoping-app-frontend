import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  removeItem,
  updateQuantity,
} from "../features/cart";
import { toast } from "react-toastify";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Shimmer Loader for Cart Items
const CartSkeletonLoader = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-6 max-w-full w-full mx-auto bg-white rounded-lg shadow-md">
      <div className="bg-gray-300 rounded-md h-24 w-24"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, status, error } = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth?.user);
  const [CheckoutLoading, setCheckoutLoading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Lock scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling on body
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling on body
    }

    // Update loading state based on cart status
    if (status === "loading" || status === "failed") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    // Cleanup the overflow style on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, status]);

  const handleQuantityChange = async (item, quantity) => {
    dispatch(updateQuantity({ id: item._id, quantity }));
    const addtocart = await fetch(
      `${NODE_API_ENDPOINT}/cart/${item?.product?._id}`,
      {
        method: "POST",
        body: JSON.stringify({ quantityval: quantity }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    if (!addtocart.ok) {
      toast.error("Failed to add product to cart");
      dispatch(removeItem(item._id));
      return;
    }
  };

  const handleRemoveItem = async (id, item) => {
    const prod = item;
    dispatch(removeItem(id));
    toast.success("Item removed successfully");
    const removeItemData = await fetch(
      `${NODE_API_ENDPOINT}/cart/${item.product._id}/${true}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    if (!removeItemData.ok) {
      toast.error("Failed to remove item from cart");
      dispatch(addToCart(prod));
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully");
    const clearCartData = await fetch(`${NODE_API_ENDPOINT}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    if (!clearCartData.ok) {
      toast.error("Failed to clear cart");
    }
  };

  const handleProceedToPayment = async () => {
    if (!currentUser) {
      toast.error("Please login to checkout");
      return;
    }
    toast.success("Proceeding to checkout...");
    const stripe = await loadStripe(
      "pk_test_51PIsJ3SHp2VgW0nsDmiCFnGWNsBl62z1f6g5iAHRbI7Fy882o43cZVPupGgDJMpx4FIbGhUFATu9f9qP3cJMkTRU00rANbAS0Z"
    );
    setCheckoutLoading(true);
    const response = await axios.post(
      `${NODE_API_ENDPOINT}/create-checkout-session`,
      { items: cartItems },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );

    setCheckoutLoading(false);
    const session = response.data;
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
      setCheckoutLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      toast.error("Please login to checkout");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      {loading ? (
        <>
          <CartSkeletonLoader />
          <CartSkeletonLoader />
        </>
      ) : cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/shop">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="cart-item flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                  className="w-full md:w-1/4 object-cover rounded-lg mb-4 md:mb-0"
                />
                <div className="flex-1 md:ml-4">
                  <h2 className="text-xl font-semibold">
                    {item?.product?.name}
                  </h2>
                  <p className="text-gray-600 text-sm my-2">
                    {item?.product?.desc}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Price: ₹{item?.product?.price}
                  </p>
                  <div className="flex items-center mt-4">
                    <label className="mr-2">Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-16 p-1 border rounded"
                      onChange={(e) =>
                        handleQuantityChange(item, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleRemoveItem(item?._id, item)}
                      className="ml-auto bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Order Summary
            </h2>
            <div className="space-y-2 flex-1">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="font-medium">
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span className="font-medium text-blue-600">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span className="text-blue-600">
                ₹
                {cartItems.reduce(
                  (total, item) =>
                    total + item?.product?.price * item?.quantity,
                  0
                )}
              </span>
            </div>
            <div className="mt-4 space-y-2 flex justify-between flex-wrap gap-2">
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white py-2 px-4 mt-2 mb-2 rounded hover:bg-red-600 transition duration-200"
              >
                <span> Clear Cart</span>
              </button>

              <Link to="/shop">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                  Continue Shopping
                </button>
              </Link>

              <button
                disabled={CheckoutLoading}
                onClick={handleCheckout}
                className={`bg-green-500 w-full text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 ${
                  CheckoutLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {CheckoutLoading ? "Proceeding to checkout..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Enter Shipping Address
            </h2>
            <div className="modal-content overflow-y-auto max-h-[70vh]">
              {" "}
              {/* Scrollable content */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsModalOpen(false);
                  handleProceedToPayment();
                }}
              >
                {/* Full Name */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                {/* Mobile Number */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="mobileNumber"
                  >
                    Mobile Number
                  </label>
                  <input
                    required
                    id="mobileNumber"
                    type="text"
                    placeholder="9876543210"
                    className="w-full p-2 text-sm border rounded-md"
                    pattern="^[6-9]\d{9}$"
                    title="Please enter a valid Indian mobile number"
                  />
                </div>

                {/* Street Address */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <input
                    required
                    id="streetAddress"
                    type="text"
                    placeholder="123 Main St"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                {/* Landmark (optional) */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="landmark"
                  >
                    Landmark (Optional)
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    placeholder="Near Central Park"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                {/* Area */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="area"
                  >
                    Area
                  </label>
                  <input
                    required
                    id="area"
                    type="text"
                    placeholder="Koramangala"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    required
                    id="city"
                    type="text"
                    placeholder="Bangalore"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                {/* State & Postal Code */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <input
                      required
                      id="state"
                      type="text"
                      placeholder="Karnataka"
                      className="w-full p-2 text-sm border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="postalCode"
                    >
                      Postal Code
                    </label>
                    <input
                      required
                      id="postalCode"
                      type="text"
                      placeholder="560001"
                      className="w-full p-2 text-sm border rounded-md"
                      pattern="^[1-9][0-9]{5}$"
                      title="Please enter a valid postal code"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    required
                    id="country"
                    type="text"
                    value="India"
                    readOnly
                    className="w-full p-2 text-sm border rounded-md bg-gray-100"
                  />
                </div>

                {/* Address Type */}
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="addressType"
                  >
                    Address Type
                  </label>
                  <select
                    id="addressType"
                    required
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 text-sm rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 text-sm rounded hover:bg-green-600"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
