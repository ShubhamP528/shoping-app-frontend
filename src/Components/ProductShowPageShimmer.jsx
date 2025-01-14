// ProductShowPageShimmer.js
import React from "react";

const ProductShowPageShimmer = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg mt-5 animate-pulse">
      {/* Product Details Shimmer */}
      <div className="mb-8">
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-4"></div>
        <div className="w-3/4 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/2 h-6 bg-gray-200 rounded mb-4"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="flex space-x-4 mt-6">
          <div className="w-1/3 h-12 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Review Shimmer */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="w-1/4 h-8 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center mb-4">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>
          <div className="ml-4 h-6 w-1/4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full h-24 bg-gray-200 rounded mb-4"></div>
        <div className="w-1/4 h-12 bg-gray-200 rounded"></div>
        <div className="mt-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="w-full h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
          <div className="w-full h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowPageShimmer;
