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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth?.user);
  const [CheckoutLoading, setCheckoutLoading] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state for shimmer

  useEffect(() => {
    // Simulate a loading time for shimmer effect (you can replace this with real fetching logic)
    setTimeout(() => {
      setLoading(false); // Remove shimmer after fetching cart items
    }, 1500);
  }, []);

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
      `${NODE_API_ENDPOINT}/cart/${item.product._id}`,
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

  const handleCheckout = async () => {
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      {loading ? (
        <>
          {/* Shimmer Effect during loading */}
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
          {/* Cart Items Section */}
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
          {/* Order Summary Section */}
          <div className="cart-summary bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Order Summary
            </h2>
            {/* Itemized List */}
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
            {/* Divider */}
            <div className="border-t my-4"></div>
            {/* Total Price */}
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
            {/* Buttons */}
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
                className={`${
                  CheckoutLoading
                    ? "bg-gray-400 cursor-not-allowed "
                    : "bg-green-500 hover:bg-green-700 text-white "
                } font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out`}
                onClick={handleCheckout}
              >
                {CheckoutLoading ? "Processing..." : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
