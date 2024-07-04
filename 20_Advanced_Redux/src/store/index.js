import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './myCart.js';
import cartItemReducer from './cartItem.js';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        cartItem: cartItemReducer
    }
});

export default store;