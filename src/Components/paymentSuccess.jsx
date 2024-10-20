import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart";
import { NODE_API_ENDPOINT } from "../utils/utils";

const PaymentSuccess = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  console.log(cartItems);
  console.log(currentUser);

  useEffect(() => {
    const deleteCart = async () => {
      // Check if cartItems is an array
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart items is not an array or is empty:", cartItems);
        return;
      }

      const totalPrice = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      console.log(totalPrice);

      try {
        await axios.delete(
          `${NODE_API_ENDPOINT}/payment-success/${totalPrice}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        toast.success("Order successfully done");
        dispatch(clearCart());
      } catch (error) {
        console.error("Error during payment success request:", error);
        toast.error(error.message);
      }
    };

    if (currentUser && cartItems.length > 0) {
      deleteCart();
    }
  }, [currentUser, cartItems, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Payment Successful!
        </h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your cart has been processed
          successfully.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/shop"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            Back to Shop
          </Link>
          <Link
            to={`/orders`}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
