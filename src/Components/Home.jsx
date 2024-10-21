import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { NODE_API_ENDPOINT } from "../utils/utils";
import ProductCardShimmer from "./ProductCardShimmer";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch featured products from your API
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/products/featured`);
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Handle the redirect from Google OAuth
  useEffect(() => {
    const getUserDataFromBackend = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const email = queryParams.get("email");
        const name = queryParams.get("name");
        const userId = queryParams.get("userId");

        console.log(token, email, name, userId);

        if (token && email && name && userId) {
          // Store the token in localStorage
          // Set user info in state
          setUser({
            email,
            name,
            userId,
            token,
          });

          dispatch(
            login({
              email,
              name,
              userId,
              token,
            })
          );

          // Clear query string from URL
          window.history.replaceState(null, "", window.location.pathname);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserDataFromBackend();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero bg-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store!</h1>
          <p className="text-lg mb-8">
            Discover the best products at unbeatable prices.
          </p>
          <Link
            to="/shop"
            className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products py-10 mx-2">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
            {isLoading ? (
              <>
                {/* Show shimmer placeholders in a grid */}
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <ProductCardShimmer key={i} />
                  ))}
              </>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights py-10 bg-gray-100 mx-2">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="highlight bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Our products are of the highest quality, sourced from the best
                manufacturers.
              </p>
            </div>
            <div className="highlight bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                We offer competitive prices on all our products, ensuring you
                get the best value.
              </p>
            </div>
            <div className="highlight bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Excellent Support</h3>
              <p className="text-gray-600">
                Our support team is available 24/7 to assist you with any
                inquiries or issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
