import React from "react";
import { FaLaptopCode, FaBullhorn, FaBusinessTime } from "react-icons/fa";
import { Link } from "react-router-dom";

const Careers = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Careers
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Join Our Team
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            We’re always on the lookout for talented, passionate people to help
            us grow and make an impact in the world of e-commerce. Explore the
            opportunities below and join our journey!
          </p>
        </div>

        {/* Job Categories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tech Careers */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaLaptopCode className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">
              Tech & Engineering
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Join our engineering team and help build innovative shopping
              experiences for millions of customers.
            </p>
            <Link
              to="#"
              className="text-indigo-600 mt-4 inline-block font-semibold"
            >
              Explore Tech Roles &rarr;
            </Link>
          </div>

          {/* Marketing Careers */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaBullhorn className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">
              Marketing & Sales
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Drive our growth and engagement with dynamic marketing strategies
              that speak to a global audience.
            </p>
            <Link
              to="#"
              className="text-indigo-600 mt-4 inline-block font-semibold"
            >
              Explore Marketing Roles &rarr;
            </Link>
          </div>

          {/* Business Operations */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaBusinessTime className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">
              Business & Operations
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Help shape our business operations, logistics, and customer
              service to create a seamless experience.
            </p>
            <Link
              to="#"
              className="text-indigo-600 mt-4 inline-block font-semibold"
            >
              Explore Business Roles &rarr;
            </Link>
          </div>
        </div>

        {/* Life at Our Company */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 text-center">
              Life at Shopkro
            </h3>
            <p className="mt-4 text-lg text-gray-500 text-center">
              We believe that a great workplace is where people feel inspired,
              appreciated, and empowered. At Shopkro, we foster a culture that
              encourages creativity, collaboration, and personal growth.
            </p>

            {/* Perks & Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Flexible Work Environment
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Enjoy the freedom to work remotely or in our office, providing
                  you with the flexibility you need to do your best work.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Health & Wellness
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  We offer comprehensive health benefits and wellness programs
                  to ensure that our team stays healthy and happy.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Professional Development
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Grow with us through opportunities for continuous learning,
                  skill development, and career advancement.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Inclusive Culture
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  We celebrate diversity and strive to create a workplace where
                  everyone feels valued and respected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Ready to Join Us?
          </h3>
          <p className="mt-4 text-lg text-gray-500">
            If you're passionate about e-commerce and want to make an impact,
            we’d love to hear from you. Check out our open positions below.
          </p>
          <Link
            to="#"
            className="bg-indigo-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-indigo-700 mt-6 inline-block"
          >
            View Open Positions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;
