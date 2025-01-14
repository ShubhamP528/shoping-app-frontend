import React from "react";
import { Link } from "react-router-dom";

const SecurityPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Security Policy
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          At [Your Website], we are committed to safeguarding your personal
          information and ensuring a secure shopping experience. This Security
          Policy outlines the steps we take to protect your data, as well as
          your role in maintaining security.
        </p>

        <div className="space-y-6">
          {/* Data Encryption */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. Data Encryption
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We use advanced encryption technologies (SSL/TLS) to ensure that
              all personal and payment information you provide during the
              checkout process is protected. This prevents unauthorized access
              to sensitive data transmitted between your browser and our
              servers.
            </p>
          </div>

          {/* Account Security */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. Account Security
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials, including your username and password. We
              recommend using strong, unique passwords and changing them
              periodically. Do not share your password with anyone, and be
              cautious of phishing attempts asking for your login information.
            </p>
          </div>

          {/* Secure Payments */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. Secure Payments
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We ensure that all payment transactions are securely processed
              through trusted payment gateways. We do not store your full credit
              card or payment details on our servers. All payment information is
              handled in accordance with PCI DSS (Payment Card Industry Data
              Security Standards).
            </p>
          </div>

          {/* Data Storage */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. Data Storage and Retention
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your personal information is stored securely in our database using
              industry-standard security protocols. We retain your data for as
              long as necessary to provide you with our services and for legal
              and business purposes. Afterward, it will be securely deleted or
              anonymized.
            </p>
          </div>

          {/* Fraud Detection */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5. Fraud Detection and Prevention
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We employ automated tools to detect and prevent fraudulent
              transactions and account activities. In cases where fraudulent
              activity is suspected, we may temporarily lock accounts or reject
              transactions to ensure the security of all users.
            </p>
          </div>

          {/* User Responsibility */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6. Your Responsibility
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You play a critical role in protecting your information. Always
              log out after using shared or public devices and report any
              suspicious activity on your account to us immediately. By using
              strong passwords and staying vigilant against potential threats,
              you help us maintain a secure environment for all users.
            </p>
          </div>

          {/* Reporting Security Issues */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              7. Reporting Security Issues
            </h3>
            <p className="text-gray-600 leading-relaxed">
              If you encounter any security vulnerabilities or issues on our
              website, please report them to our security team at{" "}
              <span className="text-blue-600 underline cursor-pointer">
                security@[YourWebsite].com
              </span>
              . We take all reports seriously and will investigate any potential
              threats promptly.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            If you have further questions about our security policies, feel free
            to{" "}
            <span className="text-blue-600 underline cursor-pointer">
              <Link to="/contact">contact our support team</Link>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPolicy;
