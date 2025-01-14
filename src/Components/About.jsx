import React from "react";
import { FaShippingFast, FaRegSmile, FaTags, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Your Ultimate Shopping Destination
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            At [Your Brand], we are committed to providing a seamless and joyful
            shopping experience with a wide range of products, great deals, and
            a customer-first approach.
          </p>
        </div>

        {/* Mission and Why Choose Us Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1">
              <h3 className="text-3xl font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                We strive to provide top-quality products at affordable prices
                while delivering exceptional customer service. Our goal is to
                create a shopping experience that is both enjoyable and
                efficient, where customer satisfaction is our top priority.
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="text-3xl font-semibold text-gray-900">
                Why Shop With Us?
              </h3>
              <ul className="mt-4 space-y-4 text-lg text-gray-500">
                <li className="flex items-center">
                  <FaShippingFast className="text-indigo-600 w-6 h-6 mr-3" />{" "}
                  Fast and reliable shipping
                </li>
                <li className="flex items-center">
                  <FaRegSmile className="text-indigo-600 w-6 h-6 mr-3" />{" "}
                  Customer satisfaction guaranteed
                </li>
                <li className="flex items-center">
                  <FaTags className="text-indigo-600 w-6 h-6 mr-3" /> Affordable
                  prices with great deals
                </li>
                <li className="flex items-center">
                  <FaHeadset className="text-indigo-600 w-6 h-6 mr-3" /> 24/7
                  customer support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-center text-gray-900">
            Our Core Values
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-center text-gray-500 mx-auto">
            We believe in honesty, quality, and putting the customer at the
            heart of everything we do.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-indigo-100 p-6 rounded-full inline-block">
                <FaShippingFast className="text-indigo-600 w-10 h-10" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">
                Fast Delivery
              </h4>
              <p className="mt-2 text-base text-gray-500">
                We ensure quick and reliable delivery across all locations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 p-6 rounded-full inline-block">
                <FaRegSmile className="text-indigo-600 w-10 h-10" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">
                Customer Satisfaction
              </h4>
              <p className="mt-2 text-base text-gray-500">
                We always go the extra mile to make sure our customers are
                happy.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 p-6 rounded-full inline-block">
                <FaTags className="text-indigo-600 w-10 h-10" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">
                Best Prices
              </h4>
              <p className="mt-2 text-base text-gray-500">
                We offer competitive prices without compromising on quality.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 p-6 rounded-full inline-block">
                <FaHeadset className="text-indigo-600 w-10 h-10" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">
                24/7 Support
              </h4>
              <p className="mt-2 text-base text-gray-500">
                Our dedicated support team is here to help you, anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-indigo-600 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl font-extrabold text-white">
              Ready to Start Shopping?
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-white mx-auto">
              Explore our wide range of products and experience shopping like
              never before.
            </p>
            <Link to="/shop">
              <button className="mt-8 bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
