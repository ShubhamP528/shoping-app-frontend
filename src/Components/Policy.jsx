import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          At [Your Website], we respect your privacy and are committed to
          protecting the personal information you share with us. This Privacy
          Policy outlines how we collect, use, and safeguard your information
          when you use our services.
        </p>

        <div className="space-y-6">
          {/* Information We Collect */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. Information We Collect
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We collect personal information such as your name, email address,
              shipping address, and payment details when you make a purchase or
              create an account. We may also collect information about your
              browsing activity on our site, such as IP address, browser type,
              and device information, to improve our services.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. How We Use Your Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The information we collect is used to process orders, deliver
              products, and provide customer support. We also use this data to
              send promotional materials, analyze user behavior to improve our
              services, and for fraud detection.
            </p>
          </div>

          {/* Sharing Your Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. Sharing Your Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal information to third parties. We may
              share your data with trusted service providers who assist us in
              running our platform, such as payment processors and shipping
              carriers. These partners are obligated to protect your information
              and only use it for the services they provide to us.
            </p>
          </div>

          {/* Cookies and Tracking Technologies */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. Cookies and Tracking Technologies
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, personalize content, and analyze traffic on
              our site. You can control cookies through your browser settings,
              though disabling them may affect the functionality of our
              services.
            </p>
          </div>

          {/* Your Privacy Rights */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5. Your Privacy Rights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, or delete your personal
              information at any time. You may also opt out of receiving
              promotional communications by following the instructions in those
              emails. If you have concerns about how your data is being used,
              please contact us at privacy@[YourWebsite].com.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6. Data Retention
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this policy, such as processing
              orders and complying with legal obligations. After this period,
              your data will be securely deleted or anonymized.
            </p>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              7. Security
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We take the security of your personal information seriously. We
              use industry-standard measures, including encryption and
              authentication tools, to protect your data from unauthorized
              access, disclosure, or misuse.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              8. Changes to This Policy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We encourage you
              to review this policy periodically to stay informed about how we
              are protecting your data.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            If you have any questions about our Privacy Policy, feel free to{" "}
            <span className="text-blue-600 underline cursor-pointer">
              <Link to="/contact">contact us</Link>
            </span>{" "}
            at privacy@shopkro.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
