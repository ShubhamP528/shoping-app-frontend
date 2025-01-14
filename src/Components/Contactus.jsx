import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Contact Us
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Get In Touch With Us
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            We’d love to hear from you! Whether you have a question, concern, or
            just want to say hi, feel free to reach out to us.
          </p>
        </div>

        {/* Contact Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaPhoneAlt className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">Phone</h4>
            <p className="mt-2 text-base text-gray-500">+91 9027640571</p>
          </div>
          {/* Email */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaEnvelope className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">Email</h4>
            <p className="mt-2 text-base text-gray-500">
              shubham2021prajapati@gmail.com
            </p>
          </div>
          {/* Registered Address */}
          <div className="text-center">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaMapMarkerAlt className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">
              Registered Address
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Rudrapur, Udham Singh Nagar, Uttarakhand, PIN: 263153
            </p>
          </div>
          {/* Operational Address */}
          <div className="text-center md:col-span-3">
            <div className="bg-indigo-100 p-6 rounded-full inline-block">
              <FaMapMarkerAlt className="text-indigo-600 w-10 h-10" />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900">
              Operational Address
            </h4>
            <p className="mt-2 text-base text-gray-500">
              Rudrapur, Udham Singh Nagar, Uttarakhand, PIN: 263153
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 text-center">
              Send Us A Message
            </h3>
            <p className="mt-4 text-lg text-gray-500 text-center">
              Fill out the form below, and we’ll get back to you as soon as
              possible.
            </p>
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
