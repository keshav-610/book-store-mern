import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    toast:true,
                    title: "Item Already exists in your cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK"
                  })
            }
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
