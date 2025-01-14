// src/components/Profile.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSelector } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.auth?.user);

  useEffect(() => {
    // Fetch user data
    const getUserData = async () => {
      const props = await fetch(`${NODE_API_ENDPOINT}/getUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (!props.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const userData = await props.json();
      setUser(userData.user);
    };
    if (currentUser) {
      getUserData();
    }
  }, [currentUser, currentUser.token]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center">
          {/* Placeholder for Profile Picture */}
          <span className="text-xl text-gray-600">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-lg text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-8 space-y-6">
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Role</p>
          <p className="text-lg text-gray-600">{user.role}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Adress</p>
          <p className="text-lg text-gray-600">{user.adress || "NA"}</p>
        </div>

        {user.role === "Seller" && (
          <>
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">Store Name</p>
              <p className="text-lg text-gray-600">{user.storeName || "N/A"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">
                Business Address
              </p>
              <p className="text-lg text-gray-600">
                {user.businessAddress || "N/A"}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">
                Contact Number
              </p>
              <p className="text-lg text-gray-600">
                {user.contactNumber || "N/A"}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-700">
                Business Category
              </p>
              <p className="text-lg text-gray-600">
                {user.businessCategory || "N/A"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="mt-8 text-center">
        <Link
          to="/edit-profile"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
