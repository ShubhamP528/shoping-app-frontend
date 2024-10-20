// cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { toast } from "react-toastify";

// Async thunk to fetch cart details from the backend
export const fetchCartDetails = createAsyncThunk(
  "cart/fetchCartDetails",
  async (_, { rejectWithValue, getState }) => {
    const storedAuth = localStorage.getItem("shop_auth_user");
    const parsedUser = await JSON.parse(storedAuth);
    try {
      const response = await fetch(`${NODE_API_ENDPOINT}/cart`, {
        headers: {
          Authorization: `Bearer ${parsedUser?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Holds the array of cart items
    status: "idle",
    error: null,
  },
  reducers: {
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart(state) {
      state.cartItems = [];
    },

    addToCart(state, action) {
      console.log(state.cartItems);
      // Check if the product already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item?.product?._id === action?.payload?.product?._id
      );
      if (existingItem) {
        // Update quantity if the product exists in the cart
        existingItem.quantity += action.payload.quantity;
      } else {
        // Add new product to cart
        state.cartItems.push({ product: action.payload, quantity: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming the response data is already in the desired format
        state.cartItems = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateQuantity, removeItem, clearCart, addToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
