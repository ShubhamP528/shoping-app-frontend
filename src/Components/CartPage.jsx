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
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ColorRing } from "react-loader-spinner";
import PaymentWarningPage from "./PaymentWarningPage";

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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [amount, setAmount] = useState(0);
  const [patiallyDone, setPatiallyDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const sum = cartItems.reduce(
      (total, item) => total + item?.product?.price * item?.quantity,
      0
    );
    setAmount(sum);
  }, [cartItems]);

  useEffect(() => {
    // Lock scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling on body
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling on body
    }

    // Update loading state based on cart status
    // if (status === "loading" || status === "failed") {
    //   setLoading(true);
    // } else {
    //   setLoading(false);
    // }

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
    // setIsModalOpen(true);
    navigate("/checkout");
  };

  const loadRazorpay = async () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      setLoading(false);
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/create-order`,
          {
            amount: amount,
            currency: "INR",
            receipt: receipt,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        setIsModalOpen(false);

        console.log(result);

        const { id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_ID,
          //   amount: String(amount),
          currency: currency,
          name: "CLAW LEGALTECH PRIVATE LIMITED",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            console.log(response);
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              amount,
            };

            console.log(response);
            setPatiallyDone(true);
            const result = await axios.post(
              `${NODE_API_ENDPOINT}/verifyPayment`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${currentUser?.token}`,
                },
              }
            );
            setPatiallyDone(false);
            alert("Payment done successfully");
            toast.success("Your order has been placed successfully");
            setLoading(false);
            dispatch(clearCart());
            console.log(result.data);
            navigate("/orders");
          },
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: currentUser?.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log(options);

        const paymentObject = new window.Razorpay(options);

        console.log(paymentObject);
        paymentObject.open();
      } catch (error) {
        setLoading(false);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  // useEffect(() => {
  //   if (!loading) {
  //     setIsModalOpen(false);
  //   }
  // }, [loading]);

  if (patiallyDone) {
    return <PaymentWarningPage />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      {status === "loading" || status === "failed" ? (
        <>
          <CartSkeletonLoader />
          <CartSkeletonLoader />
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
              <span className="text-blue-600">₹{amount}</span>
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
    </div>
  );
}

export default Cart;
