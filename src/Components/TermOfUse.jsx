import React from "react";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Terms of Use
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to [Your Website]. By using this website, you agree to comply
          with and be bound by the following terms and conditions of use. Please
          read them carefully before using our platform.
        </p>

        <div className="space-y-6">
          {/* General Use Clause */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. General Terms
            </h3>
            <p className="text-gray-600 leading-relaxed">
              By accessing this website, you agree to comply with all applicable
              laws and regulations and agree that you are responsible for
              compliance with any local laws. You are prohibited from using the
              website in any way that may damage or impair the website or access
              to it for others.
            </p>
          </div>

          {/* Account Responsibility */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. Account Responsibility
            </h3>
            <p className="text-gray-600 leading-relaxed">
              When you create an account on our website, you are responsible for
              maintaining the confidentiality of your account information,
              including your password, and for restricting access to your
              computer. You agree to accept responsibility for all activities
              that occur under your account or password.
            </p>
          </div>

          {/* Prohibited Use */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. Prohibited Use
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You may not use the website for any unlawful or unauthorized
              purpose. You agree not to use the website to conduct any illegal
              activities, including but not limited to hacking, phishing, or any
              activities that could harm other users.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. Intellectual Property Rights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, graphics, logos,
              images, and software, is the property of [Your Website] or its
              content suppliers and is protected by international copyright
              laws. You may not reproduce, distribute, or exploit the content
              without our express written consent.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5. Limitation of Liability
            </h3>
            <p className="text-gray-600 leading-relaxed">
              [Your Website] shall not be liable for any damages arising from
              the use of or inability to use the website or any information
              provided on the website. This includes, but is not limited to,
              direct, indirect, incidental, punitive, and consequential damages.
            </p>
          </div>

          {/* Modification of Terms */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6. Modification of Terms
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Any
              changes will be posted on this page, and your continued use of the
              website after the changes are made constitutes your acceptance of
              the new terms.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              7. Governing Law
            </h3>
            <p className="text-gray-600 leading-relaxed">
              These terms of use are governed by and construed in accordance
              with the laws of [Your Country/State], and you irrevocably submit
              to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            For any questions or further information regarding these terms,
            please{" "}
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

export default TermsOfUse;
