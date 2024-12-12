import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <div
        key={product?._id}
        className="bg-white rounded-lg shadow-lg relative hover:shadow-2xl transition-all duration-300 group"
      >
        {/* Product Image */}
        <div className="relative">
          <img
            src={product?.images[0]}
            alt={`${product?.name}`}
            className="h-64 w-full object-cover rounded-t-lg md:h-72 lg:h-80"
          />
          {product?.isBestSeller && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded md:text-sm">
              Best Seller
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 truncate sm:text-lg md:text-xl">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-sm sm:text-base">
              {"★".repeat(Math.floor(product?.rating))}
            </span>
          </div>

          {/* Price */}
          <div className="mt-2">
            <span className="text-lg font-bold text-gray-800 sm:text-xl">
              ₹{product?.price}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2 sm:text-base">
              ₹{product?.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
