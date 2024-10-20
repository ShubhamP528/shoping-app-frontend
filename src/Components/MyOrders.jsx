import { toast } from "react-toastify";
import OrderCard from "./OrderCard";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-6 max-w-full w-full mx-auto bg-white rounded-xl shadow-md">
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const currentUser = useSelector((state) => state.auth?.user);
  console.log(currentUser);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const resp = await fetch(`${NODE_API_ENDPOINT}/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });

        if (!resp.ok) {
          setLoading(false); // Stop loading in case of error
          toast.error("Failed to fetch orders");
        }

        const order = await resp.json();
        setOrders(order);
        setLoading(false); // Stop loading after fetching data
      } catch (error) {
        toast.error(error.message);
        setLoading(false); // Stop loading in case of error
      }
    };
    if (currentUser) {
      getOrder();
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      <div className="space-y-8">
        {loading ? (
          <>
            {/* Render Shimmer Loader while fetching orders */}
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default Orders;
