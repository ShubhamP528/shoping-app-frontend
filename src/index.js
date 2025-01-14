import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import Error from "./Components/Error"; // Component to show in case of errors
// import Home from "./Components/Home"; // Add a Home component for the root path
import ProductListing from "./Components/ProductListing"; // Assuming you have a ProductDetail component
import ProductDetail from "./Components/ShowProduct"; // Assuming you have a ProductDetail component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import LoginPage from "./Components/Login";
import SignUp from "./Components/Signup";
import { Provider } from "react-redux";
import store from "./store";
import ForgotPassword from "./Components/ForgetPassword";
import CartPage from "./Components/CartPage";
import PaymentSuccess from "./Components/paymentSuccess";
import PaymentCancel from "./Components/payment.failed";
import OrdersPage from "./Components/MyOrders";
import ProductDetailPage from "./Components/ProductDetailPage";
import About from "./Components/About";
import ContactUs from "./Components/Contactus";
import Careers from "./Components/Career";
import PaymentSection from "./Components/PaymentHelp";
import ShippingHelpSection from "./Components/ShipingHelp";
import CancellationReturnHelpSection from "./Components/CancellationAndReturn";
import FAQSection from "./Components/FAQ";
import ReturnPolicy from "./Components/ReturnPolicy";
import TermsOfUse from "./Components/TermOfUse";
import SecurityPolicy from "./Components/SecurityPolicy";
import PrivacyPolicy from "./Components/Policy";
import AddProductForm from "./Components/AddProduct";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";

// Define your router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />, // Define the Home component for the root path
      },
      {
        path: "/shop",
        element: <ProductListing />, // Path for the product listing page
      },
      {
        path: "/product/:productId",
        // element: <ProductDetail />, // Path for individual product details
        element: <ProductDetailPage />, // Path for individual product details
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/resetPassword",
        element: <ForgotPassword />, // Path for resetting password
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <CartPage />, // Path for the cart page
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/failure",
        element: <PaymentCancel />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/add-new-product",
        element: <AddProductForm />,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/help-payment",
        element: <PaymentSection />,
      },
      {
        path: "/help-shiping",
        element: <ShippingHelpSection />,
      },
      {
        path: "/help-cancellation-and-return",
        element: <CancellationReturnHelpSection />,
      },
      {
        path: "/faq",
        element: <FAQSection />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfUse />,
      },
      {
        path: "/security-policy",
        element: <SecurityPolicy />,
      },
      {
        path: "/policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
        <ToastContainer />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
