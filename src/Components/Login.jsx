import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google"; // Import from react-oauth/google
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isGLoading, setGIsLoading] = useState(false); // Loading state
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
      setIsLoading(true); // Start loading
      try {
        const resp = await axios.post(`${NODE_API_ENDPOINT}/login`, {
          email,
          password,
        });
        dispatch(login(resp.data)); // Store auth data in Redux
        toast.success("Login successful!");
        navigate("/");

        // Reset form state
        setEmail("");
        setPassword("");
        setFormErrors({});
      } catch (error) {
        // Display error toast
        toast.error(error.response?.data?.message || "Login failed!");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${NODE_API_ENDPOINT}/auth/google`, "_self"); // Redirect to Google Auth route
  };

  const responseGoogle = async (response) => {
    console.log("Google response:", response); // Log the entire Google response object

    if (response.credential) {
      const token = response.credential;

      setGIsLoading(true);
      // Send the token to the backend for validation
      const resp = await fetch(`${NODE_API_ENDPOINT}/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send token as JSON body
      });

      if (!resp.ok) {
        setGIsLoading(false);

        throw new Error("Invalid credentials");
      }
      setGIsLoading(false);
      const data = await resp.json();
      dispatch(login(data));
      toast.success("Logged in successfully!");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            className="max-w-xs"
          />
        </div>

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
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            New on our platform?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create an account
            </Link>
          </p>
          <div className="flex justify-center space-x-4 mb-4 mt-6">
            {/* <button
              className="w-full px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:shadow transition duration-150 place-content-center"
              onClick={handleGoogleSignup}
            >
              <img
                class="w- h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Log in with Google</span>
            </button> */}

            {isGLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperClass="flex justify-center"
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
              />
            ) : (
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
