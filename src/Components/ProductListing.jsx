import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import ProductCardShimmer from "./ProductCardShimmer"; // Shimmer component for loading state
import { NODE_API_ENDPOINT } from "../utils/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousal";
import HorizentalProductCarousel from "./HorizentalProductListing";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast.error("Error fetching products");
          throw new Error(`API request failed with status ${response.status}`);
        }

        const products = await response.json();
        setProducts(products); // Set products when fetched
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading after fetching
      }
    };

    getProducts();
  }, []);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -400, behavior: "smooth" }); // Adjust scroll value based on card size
    } else {
      current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto mt-10">
      <Carousel />

      {/* Horizontal scroll section for "Top Picks" */}

      <HorizentalProductCarousel
        products={products.slice(0, 10)}
        loading={loading}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 px-4">
        {/* Vertical grid section for all other products */}
        {loading ? (
          // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          <>
            {/* Show shimmer placeholders in a grid */}
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <ProductCardShimmer key={i} />
              ))}
          </>
        ) : (
          // </div>
          <>
            {products.slice(6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
