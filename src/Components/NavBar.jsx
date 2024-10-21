import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth";
import { FaShoppingCart } from "react-icons/fa";
import { fetchCartDetails } from "../features/cart";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth?.user);
  const cartItemsCount = useSelector(
    (state) => state.cart?.cartItems?.length || 0
  ); // Adjust based on your Redux cart state structure

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "py-5 px-3 text-blue-500 border-b-2 border-blue-500"
      : "py-5 px-3 text-gray-700 hover:text-gray-900";
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCartDetails());
    }
  }, [currentUser]);

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <img
                  height={40}
                  width={40}
                  className="rounded-full"
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeTgqVozZ2-D6mepTDaoQw2LfVc222sRZ0dQ&s"
                />
              </Link>
            </div>

            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link to="/shop" className={getLinkClasses("/shop")}>
                Shop
              </Link>
              <Link to="/about" className={getLinkClasses("/about")}>
                About
              </Link>
              <Link to="/contact" className={getLinkClasses("/contact")}>
                Contact
              </Link>
              {currentUser && (
                <Link to={`/orders`} className={getLinkClasses(`/orders`)}>
                  My Orders
                </Link>
              )}
            </div>
          </div>

          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser && (
              <Link
                to="/cart"
                className="relative py-2 px-3 text-gray-700 hover:text-gray-900 flex items-center"
              >
                <FaShoppingCart className="text-2xl" />
                <span className="ml-1">Cart</span>
                {/* Cart badge */}
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}
            {currentUser ? (
              <>
                <span className="py-2 px-3 text-gray-700">
                  {currentUser.name}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="py-2 px-3 text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={getLinkClasses("/login")}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="mobile-menu-button">
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <Link to="/" className={getLinkClasses("/")} onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link
          to="/shop"
          className={getLinkClasses("/shop")}
          onClick={toggleMobileMenu}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className={getLinkClasses("/about")}
          onClick={toggleMobileMenu}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={getLinkClasses("/contact")}
          onClick={toggleMobileMenu}
        >
          Contact
        </Link>
        {currentUser && (
          <Link
            to="/orders"
            className={getLinkClasses("/orders")}
            onClick={toggleMobileMenu}
          >
            My Orders
          </Link>
        )}

        <Link
          to="/cart"
          className="relative block py-2 px-4 text-gray-700 hover:text-gray-900 mt-6"
          onClick={toggleMobileMenu}
        >
          Cart
          <FaShoppingCart className="text-xl inline-block" />
          {/* Cart badge */}
          {cartItemsCount > 0 && (
            <span className=" absolute top-1/4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform -translate-y-1/2">
              {cartItemsCount}
            </span>
          )}
        </Link>
        {currentUser ? (
          <>
            <span className="block py-2 px-4 text-gray-700">
              {currentUser.name}
            </span>
            <button
              onClick={() => {
                dispatch(logout());
                toggleMobileMenu(); // Close menu on logout
              }}
              className="block py-2 px-4 text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={getLinkClasses("/login")}
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className=" w-fit my-2 mx-1 block py-1 px-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
