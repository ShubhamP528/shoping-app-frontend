// src/components/EditProfile.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    storeName: "",
    businessAddress: "",
    contactNumber: "",
    businessCategory: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data for editing
    axios
      .get("/api/user/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/profile/edit", user)
      .then((response) => {
        navigate("/profile"); // Redirect to profile page after successful update
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="storeName"
            className="block text-lg font-medium text-gray-700"
          >
            Store Name:
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={user.storeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="businessAddress"
            className="block text-lg font-medium text-gray-700"
          >
            Business Address:
          </label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={user.businessAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-lg font-medium text-gray-700"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="businessCategory"
            className="block text-lg font-medium text-gray-700"
          >
            Business Category:
          </label>
          <select
            id="businessCategory"
            name="businessCategory"
            value={user.businessCategory}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Groceries">Groceries</option>
            <option value="Beauty">Beauty</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      <Link to="/profile" className="mt-4 inline-block text-blue-600">
        Back to Profile
      </Link>
    </div>
  );
};

export default EditProfile;
