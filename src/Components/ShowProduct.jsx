import React, { useEffect, useState } from "react";
import { FaStar, FaEllipsisH } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductShowPageShimmer from "./ProductShowPageShimmer"; // Import the shimmer component
import { useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addToCart, removeItem } from "../features/cart";

function ProductShowPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [editingReview, setEditingReview] = useState(null); // State for the review being edited
  const [userHasReviewed, setUserHasReviewed] = useState(false); // State to check if the user has reviewed
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.user);
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
    const addtocart = await fetch(`${NODE_API_ENDPOINT}/cart/${product._id}`, {
      method: "POST",
      body: JSON.stringify({ quantityval: 1 }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!addtocart.ok) {
      toast.error("Failed to add product to cart");
      dispatch(removeItem(product._id));
      return;
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const prod = await fetch(`/api/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!prod.ok) {
          toast.error("Failed to get product");
          throw new Error("Failed to fetch product");
        }

        const data = await prod.json();
        setReviews(data.product.reviews);
        setProduct(data.product);

        // Check if the current user has already reviewed this product
        const userReview = data.product.reviews.find(
          (review) => review.user?._id === currentUser?._id
        );
        if (userReview) {
          setUserHasReviewed(true);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    getProduct();
  }, [productId, currentUser]);

  const handleReviewSubmit = async () => {
    if (!currentUser) {
      toast.error("Please login first to give review!");
      setRating(0);
      setComment("");
      navigate("/login");
    }
    const newReview = {
      rating,
      comment,
      productId: product._id,
      user: {
        name: currentUser?.name,
      },
    };
    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
    setUserHasReviewed(true); // Prevent further review submissions

    const commentAdded = await fetch(`${NODE_API_ENDPOINT}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.token}`,
      },
      body: JSON.stringify(newReview),
    });
    if (!commentAdded.ok) {
      toast.error("Failed to add comment");
      setReviews([...reviews.slice(0, reviews.length - 1)]);
      setUserHasReviewed(false); // Revert the state if adding comment fails
    }
  };

  const handleEditReview = (review) => {
    setIsShowUpdate(false);
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
    setUserHasReviewed(false); // Allow editing the review
  };

  const handleUpdateReview = async () => {
    const updatedReview = {
      ...editingReview,
      rating,
      comment,
    };
    setReviews(
      reviews.map((review) =>
        review._id === editingReview._id ? updatedReview : review
      )
    );
    setEditingReview(null);
    setRating(0);
    setComment("");
    setUserHasReviewed(true); // After updating, prevent further review submissions

    const reviewUpdated = await fetch(
      `${NODE_API_ENDPOINT}/comment/${editingReview._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify(updatedReview),
      }
    );
    if (!reviewUpdated.ok) {
      toast.error("Failed to update comment");
      setUserHasReviewed(false); // Revert the state if updating comment fails
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const originalReviews = [...reviews];
    setReviews(reviews.filter((review) => review._id !== reviewId));
    setUserHasReviewed(false); // Allow new review after deletion

    const reviewDeleted = await fetch(
      `${NODE_API_ENDPOINT}/comment/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    if (!reviewDeleted.ok) {
      toast.error("Failed to delete comment");
      setReviews(originalReviews); // Restore original reviews if deletion fails
      setUserHasReviewed(true); // Prevent new review if deletion fails
    }
  };

  return (
    <>
      {loading ? (
        <ProductShowPageShimmer />
      ) : (
        <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg mt-5">
          {/* Product Details Section */}
          <div className="mb-8">
            <img
              className="w-full h-96 object-cover rounded-lg"
              src={product?.img}
              alt={product?.name}
            />
            <h1 className="text-4xl font-bold text-gray-800 mt-4">
              {product?.name}
            </h1>
            <p className="text-gray-600 mt-2">{product?.desc}</p>
            <span className="text-3xl font-bold text-indigo-600 mt-4 block">
              ₹{product?.price}
            </span>
            <div className="flex space-x-4 mt-6">
              <button className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition duration-300">
                Buy Now
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600 transition duration-300"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Review Component */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
            {!userHasReviewed ? (
              <>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            className="hidden"
                            onClick={() => setRating(ratingValue)}
                          />
                          <FaStar
                            className={`cursor-pointer text-2xl ${
                              ratingValue <= (hover || rating)
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <span className="ml-4 text-gray-800 font-semibold">
                    {rating} out of 5
                  </span>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
                  onClick={
                    editingReview ? handleUpdateReview : handleReviewSubmit
                  }
                >
                  {editingReview ? "Update Review" : "Submit Review"}
                </button>
              </>
            ) : (
              <p className="text-gray-600">
                You have already reviewed this product.
              </p>
            )}

            {/* Display Existing Reviews */}
            <div className="mt-6">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow mb-4 relative"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={
                          review.user?.profileImage ||
                          "https://picsum.photos/100/100"
                        } // Use a default avatar if no profile image
                        alt={review?.user?.name || "Anonymous"}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {review?.user?.name || "Anonymous"}
                        </h3>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>

                    {/* Show the three-dot menu for the current user's reviews */}
                    {currentUser?.name === review.user?.name && (
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <FaEllipsisH
                            className="cursor-pointer text-gray-500"
                            onClick={() => {
                              setEditingReview(
                                editingReview === review ? null : review
                              );
                              setIsShowUpdate(true);
                            }}
                          />
                          {isShowUpdate && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleEditReview(review)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => handleDeleteReview(review._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductShowPage;
