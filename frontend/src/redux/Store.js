import {configureStore} from "@reduxjs/toolkit"
import  cartReducer  from "./features/cart/CartSlice"
import booksAPI from "./features/books/booksAPI"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksAPI.reducerPath]: booksAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(booksAPI.middleware);
    },
});
