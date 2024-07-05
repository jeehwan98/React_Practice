import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './myCart.js';
import cartItemReducer from './cartItem.js';
import cartSlice from './cart-slice.js';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        cartItem: cartItemReducer,
        cartSlice: cartSlice,
    }
});

export default store;