import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [], 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "Increased item quantity in cart",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {

        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Swal.fire({
        toast: true,
        position: "top",
        icon: "info",
        title: "Item removed from cart",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    },

    clearCart: (state) => {
      state.cartItems = [];
      Swal.fire({
        toast: true,
        position: "top",
        icon: "info",
        title: "Cart cleared",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    },

    decrementQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        Swal.fire({
          toast: true,
          position: "top",
          icon: "info",
          title: "Decreased item quantity in cart",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        Swal.fire({
          toast: true,
          position: "top",
          icon: "warning",
          title: "Item removed from cart",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
