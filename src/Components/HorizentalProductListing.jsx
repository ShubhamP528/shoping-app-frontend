import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductCardShimmer from "./ProductCardShimmer";

const HorizentalProductCarousel = ({ products, loading }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -400, behavior: "smooth" }); // Adjust scroll value based on card size
    } else {
      current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="relative mt-7">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Scrollable Container */}
        <div
          className="flex overflow-x-hidden space-x-4 scrollbar-hide p-6 rounded-md"
          ref={scrollRef}
        >
          {loading ? (
            <>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <ProductCardShimmer horiz={true} key={i} />
                ))}
            </>
          ) : (
            <>
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg relative hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300 group"
                >
                  <div className="relative ">
                    <img
                      src={product.images[0]}
                      alt={`${product.name}`}
                      className="min-w-[300px] max-w-[305px] h-[300px] bg-white shadow-lg rounded-lg"
                    />
                    {/* <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.offer}
                </div> */}
                    {product.isBestSeller && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                        Best Seller
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(product.rating))}
                      </span>
                      {/* <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span> */}
                    </div>
                    <div className="mt-2">
                      <span className="text-xl font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    {/* 
                <ul className="mt-3 text-sm text-gray-600">
                  {product.highlights.map((highlight, index) => (
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
                </div>

                // <div
                //   key={index}
                //   className="min-w-[300px] max-w-[300px] bg-white shadow-lg p-4 rounded-lg"
                // >
                //   <img
                //     src={product.images[0]}
                //     alt={product.name}
                //     className="h-40 object-cover w-full"
                //   />
                //   <h3 className="mt-2 font-semibold text-sm truncate">
                //     {product.name}
                //   </h3>
                //   <p className="text-sm text-gray-600">{product.description}</p>
                // </div>
              ))}
            </>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HorizentalProductCarousel;
