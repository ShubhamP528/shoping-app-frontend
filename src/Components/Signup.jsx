import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // State to toggle between customer and seller forms
  const [isCustomer, setIsCustomer] = useState(true);

  // Form state for handling validation errors
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to toggle form type
  const toggleForm = () => {
    setIsCustomer(!isCustomer);
    setFormErrors({}); // Reset errors on form switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = {};

    // Validate common fields
    ["name", "email", "password", "confirm-password"].forEach((field) => {
      if (!formData.get(field)) {
        errors[field] = "This field is required";
      }
    });

    // Validate Seller-specific fields
    if (!isCustomer) {
      [
        "store-name",
        "business-address",
        "contact-number",
        "business-category",
      ].forEach((field) => {
        if (!formData.get(field)) {
          errors[field] = "This field is required";
        }
      });
    }

    // Check password match
    if (formData.get("password") !== formData.get("confirm-password")) {
      errors["confirm-password"] = "Passwords do not match";
    }

    setFormErrors(errors);

    // If no errors, proceed with form submission logic
    if (Object.keys(errors).length === 0) {
      // Prepare the payload based on form type (Customer or Seller)
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        userType: isCustomer ? "Customer" : "Seller",
      };

      if (!isCustomer) {
        // Include Seller-specific fields
        payload.storeName = formData.get("store-name");
        payload.BusinessAddress = formData.get("business-address");
        payload.ContactNumber = formData.get("contact-number");
        payload.BusinessCategory = formData.get("business-category");
        payload.userType = isCustomer ? "Customer" : "Seller";
      }

      console.log(payload);
      try {
        // Send form data to backend API for registration
        const response = await fetch(`${NODE_API_ENDPOINT}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          setFormErrors({ general: data.error });
        } else {
          console.log("Registration successful:", data);
          dispatch(login(data));
          navigate("/");
          // Redirect or update UI based on successful registration
        }
      } catch (error) {
        setFormErrors({
          general: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${NODE_API_ENDPOINT}/auth/google`, "_self"); // Redirect to your Google Auth route
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden my-16">
        {/* Left side illustration */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1725251874~exp=1725252474~hmac=e202e5cef4f0640869370902d122ddea7c0e32cb231bfa6e9739e4669ad82970"
            alt="Sign Up Illustration"
            className="max-w-xs"
          />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 p-8 flex flex-col items-center">
          {/* Swap button */}
          <button
            onClick={toggleForm}
            className="w-3/4 bg-gray-600 text-white py-2 rounded mb-6 transform transition-transform duration-500 hover:scale-105 hover:bg-gray-700 focus:outline-none"
          >
            {isCustomer
              ? "Switch to Seller Sign Up"
              : "Switch to Customer Sign Up"}
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {isCustomer
              ? "Create a Customer Account"
              : "Create a Seller Account"}
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="Enter your name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                  formErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="Create a password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                  formErrors["confirm-password"]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="Confirm your password"
              />
              {formErrors["confirm-password"] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors["confirm-password"]}
                </p>
              )}
            </div>

            {/* Additional fields for Seller form */}
            {!isCustomer && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="store-name">
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="store-name"
                    name="store-name"
                    className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                      formErrors["store-name"]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-600"
                    }`}
                    placeholder="Enter your store name"
                  />
                  {formErrors["store-name"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors["store-name"]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700"
                    htmlFor="business-address"
                  >
                    Business Address
                  </label>
                  <input
                    type="text"
                    id="business-address"
                    name="business-address"
                    className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                      formErrors["business-address"]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-600"
                    }`}
                    placeholder="Enter your business address"
                  />
                  {formErrors["business-address"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors["business-address"]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700"
                    htmlFor="contact-number"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contact-number"
                    name="contact-number"
                    className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                      formErrors["contact-number"]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-600"
                    }`}
                    placeholder="Enter your contact number"
                  />
                  {formErrors["contact-number"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors["contact-number"]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700"
                    htmlFor="business-category"
                  >
                    Business Category
                  </label>
                  <select
                    id="business-category"
                    name="business-category"
                    className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                      formErrors["business-category"]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-600"
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="food">Food</option>
                  </select>
                  {formErrors["business-category"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors["business-category"]}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mb-4 transform transition-transform duration-500 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          {/* Social sign up buttons */}
          <div className="flex justify-center space-x-4 mb-4 w-full">
            {/* <button className="bg-blue-600 text-white p-2 rounded-full focus:outline-none">
              <FaFacebookF />
            </button>
            <button className="bg-blue-400 text-white p-2 rounded-full focus:outline-none">
              <FaTwitter />
            </button>
            <button className="bg-red-500 text-white p-2 rounded-full focus:outline-none">
              <FaGoogle onClick={handleGoogleSignup} />
            </button> */}
            <button
              class="w-full px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              onClick={handleGoogleSignup}
            >
              <img
                class="w- h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="text-center">Sign up with Google</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
