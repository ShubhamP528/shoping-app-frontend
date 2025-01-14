import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Verify code, 3: Reset password
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [verificationSent, setVerificationSent] = useState(false);

  // Mock API calls (replace with real API calls)
  const sendVerificationCode = () => {
    console.log("Sending verification code to:", email);
    // Simulate API response
    setVerificationSent(true);
    setStep(2);
  };

  const verifyCode = () => {
    console.log("Verifying code:", verificationCode);
    // Simulate successful verification
    setStep(3);
  };

  const resetPassword = () => {
    console.log("Resetting password to:", newPassword);
    // Simulate password reset
    alert("Password has been reset successfully!");
    // Redirect user or reset form
    setStep(1);
    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const validateEmail = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    let errors = {};
    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      sendVerificationCode();
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (verificationCode) {
      verifyCode();
    } else {
      setFormErrors({ verificationCode: "Verification code is required" });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      resetPassword();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Forgot Password
            </h2>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Enter your email address
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
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded mt-6 hover:bg-purple-700"
              >
                Send Verification Code
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Verify Code
            </h2>
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700"
                  htmlFor="verificationCode"
                >
                  Enter the verification code sent to your email
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none ${
                    formErrors.verificationCode
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-600"
                  }`}
                  placeholder="Enter verification code"
                />
                {formErrors.verificationCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.verificationCode}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded mt-6 hover:bg-purple-700"
              >
                Verify Code
              </button>
              {verificationSent && (
                <p className="text-green-500 text-sm mt-4 text-center">
                  Verification code sent to your email!
                </p>
              )}
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Reset Password
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none ${
                    formErrors.newPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-600"
                  }`}
                  placeholder="Enter new password"
                />
                {formErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.newPassword}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 border rounded mt-1 focus:outline-none ${
                    formErrors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-600"
                  }`}
                  placeholder="Confirm new password"
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded mt-6 hover:bg-purple-700"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-purple-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
