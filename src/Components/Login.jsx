import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic
      console.log("Form submitted with values:", { email, password });
      const resp = await fetch(`${NODE_API_ENDPOINT}/login`, {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) {
        const error = await resp.json();
        toast.error(error.message);
        // throw new Error(error.message);
      }

      const auth = await resp.json();
      console.log(auth);
      dispatch(login(auth));
      navigate("/");
      // Reset form state
      setEmail("");
      setPassword("");
      setFormErrors({});

      // Redirect to home page after successful login
    }
  };

  const handleGoogleSignup = () => {
    window.open("http://localhost:8000/api/auth/google", "_self"); // Redirect to your Google Auth route
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side illustration */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1725251874~exp=1725252474~hmac=e202e5cef4f0640869370902d122ddea7c0e32cb231bfa6e9739e4669ad82970" // Replace with your image URL
            alt="Login Illustration"
            className="max-w-xs"
          />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Welcome to Sneath!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border rounded mt-1 focus:outline-none ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 border rounded mt-1 focus:outline-none ${
                  formErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
                placeholder="Enter your password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 leading-tight"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <Link
                to="/resetPassword"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded mt-6 hover:bg-purple-700"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            New on our platform?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create an account
            </Link>
          </p>
          <div className="flex justify-center space-x-4 mb-4 mt-6">
            <button className="bg-blue-600 text-white p-2 rounded-full focus:outline-none">
              <FaFacebookF />
            </button>
            <button className="bg-blue-400 text-white p-2 rounded-full focus:outline-none">
              <FaTwitter />
            </button>
            <button className="bg-red-500 text-white p-2 rounded-full focus:outline-none">
              <FaGoogle onClick={handleGoogleSignup} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
