import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsCustomer(!isCustomer);
    setFormErrors({});
  };

  const validateForm = (formData) => {
    const errors = {};
    ["name", "email", "password", "confirm-password"].forEach((field) => {
      if (!formData.get(field)) errors[field] = "This field is required";
    });

    if (!isCustomer) {
      [
        "store-name",
        "business-address",
        "contact-number",
        "business-category",
      ].forEach((field) => {
        if (!formData.get(field)) errors[field] = "This field is required";
      });
    }

    if (formData.get("password") !== formData.get("confirm-password")) {
      errors["confirm-password"] = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);
    setFormErrors(errors);
    toast.error(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true); // Start loading
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        userType: isCustomer ? "Customer" : "Seller",
        ...(isCustomer || {
          storeName: formData.get("store-name"),
          businessAddress: formData.get("business-address"),
          contactNumber: formData.get("contact-number"),
          businessCategory: formData.get("business-category"),
        }),
      };

      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
          setFormErrors({ general: data.error });
          toast.error(data.error);
        } else {
          dispatch(login(data));
          navigate("/");
        }
      } catch (error) {
        setFormErrors({ general: "Something went wrong. Please try again." });
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${NODE_API_ENDPOINT}/auth/google`, "_self");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden my-16">
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1725251874~exp=1725252474~hmac=e202e5cef4f0640869370902d122ddea7c0e32cb231bfa6e9739e4669ad82970"
            alt="Sign Up Illustration"
            className="max-w-xs"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col items-center">
          <button
            onClick={toggleForm}
            className="w-3/4 bg-gray-600 text-white py-2 rounded mb-6 transition-transform duration-500 hover:scale-105 hover:bg-gray-700 focus:outline-none"
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
            {/* Customer/Seller common fields */}
            {["name", "email", "password", "confirm-password"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700" htmlFor={field}>
                  {field === "confirm-password"
                    ? "Confirm Password"
                    : field[0].toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  id={field}
                  name={field}
                  className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                    formErrors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-600"
                  }`}
                  placeholder={`Enter your ${field.replace("-", " ")}`}
                />
                {formErrors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[field]}
                  </p>
                )}
              </div>
            ))}
            {!isCustomer && (
              <>
                {/* Seller specific fields */}
                {[
                  "store-name",
                  "business-address",
                  "contact-number",
                  "business-category",
                ].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700" htmlFor={field}>
                      {field
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </label>
                    {field === "business-category" ? (
                      <select
                        id={field}
                        name={field}
                        className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                          formErrors[field]
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
                    ) : (
                      <input
                        type="text"
                        id={field}
                        name={field}
                        className={`w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 ${
                          formErrors[field]
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-blue-600"
                        }`}
                        placeholder={`Enter your ${field.replace("-", " ")}`}
                      />
                    )}
                    {formErrors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mb-4 transition-transform duration-500 hover:scale-105 hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {formErrors.general && (
              <p className="text-red-500 text-center mb-4">
                {formErrors.general}
              </p>
            )}
          </form>
          <button
            className="w-full px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:shadow transition duration-150 place-content-center"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <img
              className="w- h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
