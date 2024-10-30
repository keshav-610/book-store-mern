import {configureStore} from "@reduxjs/toolkit"
import  cartReducer  from "./features/cart/CardSlice"

export const store = configureStore({
    reducer:{
        cart:cartReducer
    }
})