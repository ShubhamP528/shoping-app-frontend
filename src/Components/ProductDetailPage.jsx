import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisH, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { addToCart, removeItem } from "../features/cart";
import HorizentalProductCarousel from "./HorizentalProductListing";

const products = [
  {
    id: 1,
    name: "Smartphone XYZ",
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x401",
      "https://via.placeholder.com/600x402",
    ],
    price: "₹14,999",
    originalPrice: "₹19,999",
    rating: 4.5,
    reviews: 20,
    description: "A powerful smartphone with the latest technology.",
    highlights: ["4GB RAM", "128GB Storage", "5000mAh Battery", "Dual SIM"],
    features: [
      "Octa-core Processor",
      "Super AMOLED Display",
      "Fast Charging",
      "5G Support",
    ],
    comments: [
      {
        user: "Alice",
        comment: "Great phone, very smooth performance!",
        rating: 5,
      },
      { user: "Bob", comment: "Decent phone for the price.", rating: 4 },
      {
        user: "Alice",
        comment: "Great phone, very smooth performance!",
        rating: 5,
      },
      { user: "Bob", comment: "Decent phone for the price.", rating: 4 },
      {
        user: "Alice",
        comment: "Great phone, very smooth performance!",
        rating: 5,
      },
      { user: "Bob", comment: "Decent phone for the price.", rating: 4 },
      {
        user: "Alice",
        comment: "Great phone, very smooth performance!",
        rating: 5,
      },
      { user: "Bob", comment: "Decent phone for the price.", rating: 4 },
      {
        user: "Alice",
        comment: "Great phone, very smooth performance!",
        rating: 5,
      },
      { user: "Bob", comment: "Decent phone for the price.", rating: 4 },
    ],
  },
];

const suggestedProducts = [
  {
    id: 2,
    name: "Bluetooth Headphones ABC",
    image: "https://via.placeholder.com/600x403",
    price: "₹1,999",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop 123",
    image: "https://via.placeholder.com/600x404",
    price: "₹34,999",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Bluetooth Headphones ABC",
    image: "https://via.placeholder.com/600x403",
    price: "₹1,999",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop 123",
    image: "https://via.placeholder.com/600x404",
    price: "₹34,999",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Bluetooth Headphones ABC",
    image: "https://via.placeholder.com/600x403",
    price: "₹1,999",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop 123",
    image: "https://via.placeholder.com/600x404",
    price: "₹34,999",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Bluetooth Headphones ABC",
    image: "https://via.placeholder.com/600x403",
    price: "₹1,999",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop 123",
    image: "https://via.placeholder.com/600x404",
    price: "₹34,999",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Bluetooth Headphones ABC",
    image: "https://via.placeholder.com/600x403",
    price: "₹1,999",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop 123",
    image: "https://via.placeholder.com/600x404",
    price: "₹34,999",
    rating: 4.6,
  },
];

const Shimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
      <div className="bg-gray-300 h-6 rounded mb-2 w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded mb-1 w-1/2"></div>
      <div className="bg-gray-300 h-4 rounded mb-1 w-1/3"></div>
      <div className="bg-gray-300 h-4 rounded mb-4 w-full"></div>
      <div className="flex space-x-2 mb-4">
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
      </div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
      <div className="bg-gray-300 h-10 rounded mb-2 w-full"></div>
    </div>
  );
};

const ProductDetailPage = () => {
  //   const { productId } = useParams();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [suggestedProduct, setSuggestProduct] = useState([]);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [editingReview, setEditingReview] = useState(null); // State for the review being edited
  const [userHasReviewed, setUserHasReviewed] = useState(false); // State to check if the user has reviewed
  const currentUser = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // Scroll to the top of the page on initial render
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures it only runs on mount

  const handleAddToCartAndBuy = async () => {
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

    navigate("/cart");

    if (!addtocart.ok) {
      toast.error("Failed to add product to cart");
      dispatch(removeItem(product._id));
      return;
    }
  };

  useEffect(() => {
    // Simulating a data fetch
    // const fetchData = () => {
    //   const fetchedProduct = products.find((p) => p.id === parseInt(productId));
    //   setProduct(fetchedProduct);
    //   setLoading(false);
    //   if (fetchedProduct) {
    //     setSelectedImage(fetchedProduct.images[0]);
    //     setComments(fetchedProduct.comments);
    //   }
    // };
    // const timer = setTimeout(fetchData, 1500); // Simulating a delay
    // return () => clearTimeout(timer);

    const getProduct = async () => {
      try {
        window.scrollTo(0, 0);
        const prod = await fetch(`${NODE_API_ENDPOINT}/product/${productId}`, {
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
        setReviews(data?.product?.reviews);
        setProduct(data?.product);
        setSelectedImage(data?.product?.images[0]);
        setComments(data?.product?.reviews);

        // Check if the current user has already reviewed this product
        const userReview = data?.product?.reviews.find((review) => {
          console.log(review.user?._id);
          console.log(currentUser);
          return review.user?.name === currentUser?.name;
        });
        // console.log(userReview);
        if (userReview) {
          setUserHasReviewed(true);
        }

        const suggestedProducts = await fetch(
          `${NODE_API_ENDPOINT}/suggested-products?productId=${productId}&category=${data?.product?.category}&name=${data?.product?.name}`
        );

        if (!suggestedProducts.ok) {
          toast.error("Failed to fetch suggested products");
          return;
        }
        const suggestedData = await suggestedProducts.json();
        setSuggestProduct(suggestedData.suggestedProducts);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    getProduct();
  }, [productId, currentUser]);

  console.log(suggestedProduct);

  const handleAddComment = async () => {
    if (!currentUser) {
      toast.error("Please login first to give review!");
      setNewRating(0);
      setNewComment("");
      navigate("/login");
      return;
    }
    const newReview = {
      rating: newRating,
      comment: newComment,
      productId: product._id,
      user: {
        name: currentUser.name,
      },
    };
    setReviews([...reviews, newReview]);
    setComments([...reviews, newReview]);
    setNewRating(0);
    setNewComment("");
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
      setComments([...reviews.slice(0, reviews.length - 1)]);
      setUserHasReviewed(false); // Revert the state if adding comment fails
    }
  };

  const handleEditReview = (review) => {
    setIsShowUpdate(false);
    setEditingReview(review);
    setNewRating(review.rating);
    setNewComment(review.comment);
    setUserHasReviewed(false); // Allow editing the review
  };

  const handleUpdateReview = async () => {
    const updatedReview = {
      ...editingReview,
      rating: newRating,
      comment: newComment,
    };
    setReviews(
      reviews.map((review) =>
        review._id === editingReview._id ? updatedReview : review
      )
    );
    setComments(
      reviews.map((review) =>
        review._id === editingReview._id ? updatedReview : review
      )
    );
    setEditingReview(null);
    setNewRating(0);
    setNewComment("");
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
    setComments(reviews.filter((review) => review._id !== reviewId));
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
      setComments(originalReviews); // Restore original reviews if deletion fails
      setUserHasReviewed(true); // Prevent new review if deletion fails
    }
  };

  // const handleAddComment = () => {
  //   if (newComment.trim() && newRating) {
  //     const newCommentObj = {
  //       user: "New User",
  //       comment: newComment,
  //       rating: newRating,
  //     };
  //     setComments([...comments, newCommentObj]);
  //     setNewComment("");
  //     setNewRating(0);
  //   }
  // };

  const renderStars = (rating, isInteractive = false) => {
    return (
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar
              key={i}
              size={24}
              color={
                (isInteractive ? hoverRating || newRating : rating) > i
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => isInteractive && setHoverRating(i + 1)}
              onMouseLeave={() => isInteractive && setHoverRating(0)}
              onClick={() => isInteractive && setNewRating(i + 1)}
              className={isInteractive ? "cursor-pointer" : ""}
            />
          ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <Shimmer />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 text-2xl">
        Product not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <div className="flex space-x-4 justify-center">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 cursor-pointer rounded-lg ${
                    selectedImage === image ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              {renderStars(Math.floor(product.rating))}
              <span className="ml-2 text-lg text-gray-500">
                ({product.rating} reviews)
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              ₹{product.price}
            </div>
            <div className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-700">{product.description}</p>

            {/* Highlights */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Highlights
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Features
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition duration-300"
              onClick={handleAddToCartAndBuy}
            >
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

        {/* Comments Section */}
        {/* <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Comments
          </h2>
          {comments.map((comment, index) => (
            <div key={comment._id} className="mb-4 border-b pb-2">
              <div className="flex items-center">
                {renderStars(comment?.rating)}
                <span className="ml-2 font-semibold text-gray-800">
                  {comment?.user?.name}
                </span>
              </div>
              <p className="text-gray-700">{comment?.comment}</p>
            </div>
          ))} */}

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
                          setIsShowUpdate(!isShowUpdate);
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

        {/* Add Comment */}

        {!userHasReviewed ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Leave a Comment
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <div className="flex items-center mb-4">
              {renderStars(newRating, true)}
            </div>
            <button
              onClick={editingReview ? handleUpdateReview : handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingReview ? "Update Review" : "Submit Review"}
            </button>
          </div>
        ) : (
          <p className="text-gray-600">
            You have already reviewed this product.
          </p>
        )}
      </div>

      {/* Suggested Products */}
      <div className="mt-10 mx-7">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Suggested Products
        </h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
        {/* {suggestedProducts.map((suggestedProduct) => (
            <div
              key={suggestedProduct.id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src={suggestedProduct.image}
                alt={suggestedProduct.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {suggestedProduct.name}
              </h3>
              <div className="flex items-center mb-2">
                {renderStars(Math.floor(suggestedProduct.rating))}
                <span className="ml-2 text-lg text-gray-500">
                  ({suggestedProduct.reviews} reviews)
                </span>
              </div>
              <div className="text-xl font-bold text-gray-800">
                {suggestedProduct.price}
              </div>
              <button className="bg-blue-600 text-white w-full py-2 rounded mt-2 hover:bg-blue-700">
                View Product
              </button>
            </div>
          ))} */}

        <HorizentalProductCarousel
          products={suggestedProduct}
          loading={loading}
        />
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};

export default ProductDetailPage;
