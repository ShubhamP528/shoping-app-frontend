import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  // const nav = () => navigate(`/product/${product._id}`);

  return (
    <div
      className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
      // onClick={nav}
    >
      <div
        key={product?._id}
        className="bg-white rounded-lg shadow-lg relative hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="relative">
          <img
            src={product?.images[0]}
            alt={`${product?.name}`}
            className="h-64 w-full object-cover rounded-t-lg"
          />
          {/* <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.offer}
          </div> */}
          {product?.isBestSeller && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
              Best Seller
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 text-nowrap overflow-clip">
            {product?.name}
          </h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-sm">
              {"★".repeat(Math.floor(product?.rating))}
            </span>
            {/* <span className="ml-2 text-sm text-gray-500">
              ({product?.reviews} reviews)
            </span> */}
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-gray-800">
              ₹{product?.price}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product?.originalPrice}
            </span>
          </div>

          {/* <ul className="mt-3 text-sm text-gray-600">
            {product?.highlights?.map((highlight, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-green-600">✔</span>
                {highlight}
              </li>
            ))}
          </ul> */}

          {/* View Product Button */}
          <button
            onClick={() => navigate(`/product/${product?._id}`)}
            className="mt-4 w-full block bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            View Product
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default ProductCard;
