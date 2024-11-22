import {configureStore} from "@reduxjs/toolkit"
import  cartReducer  from "./features/cart/CartSlice"
import booksAPI from "./features/books/booksAPI"
import ordersAPI from "./features/orders/ordersAPI";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksAPI.reducerPath]: booksAPI.reducer,
        [ordersAPI.reducerPath]:ordersAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(booksAPI.middleware,ordersAPI.middleware)
    },
});
