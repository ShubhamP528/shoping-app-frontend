import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul>
              <li className="mb-2">
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              {/* <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Flipkart Stories
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul>
              <li className="mb-2">
                <Link to="/help-payment" className="  hover:underline">
                  Payments
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help-shiping" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/help-cancellation-and-return"
                  className="hover:underline"
                >
                  Cancellation & Returns
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policy</h3>
            <ul>
              <li className="mb-2">
                <Link to="/return-policy" className="hover:underline">
                  Return Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms-of-service" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li className="mb-2">
                <Link to="security-policy" className="hover:underline">
                  Security
                </Link>
              </li>
              <li className="mb-2">
                <Link to="policy" className="hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  YouTube
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} shopkro. All rights reserved.</p>
          <p className="mt-2">This is a fictional footer for a shopkro.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
