import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductCardShimmer from "./ProductCardShimmer";

const HorizontalProductCarousel = ({ products, loading }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth; // Dynamic scroll based on container width
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
          className="flex overflow-x-scroll space-x-4 p-6 rounded-md hide-scrollbar"
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
              {products.map((product) => (
                <div
                  onClick={() => navigate(`/product/${product?._id}`)}
                  key={product._id}
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 group w-[300px] border border-gray-200"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={`${product.name}`}
                      className="w-full h-[250px] object-cover rounded-t-lg"
                    />
                    {product.isBestSeller && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded">
                        Best Seller
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-yellow-400 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                      <span className="text-gray-500 ml-2 text-xs">
                        ({product.rating.toFixed(1)})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
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

export default HorizontalProductCarousel;
