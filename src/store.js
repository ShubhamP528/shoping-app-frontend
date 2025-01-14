import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth";
import cart from "./features/cart";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cart,
  },
});

export default store;
