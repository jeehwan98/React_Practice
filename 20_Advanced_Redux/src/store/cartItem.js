import { createSlice } from "@reduxjs/toolkit";

const initialCartItemState = {
    name: 'Test',
    quantity: 0,
    price: 6,
    description: 'This is a first product - amazing'
};

const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState: initialCartItemState,
    reducers: {
        increment(state, action) {
            state.quantity++;
        },

        decrement(state) {
            state.quantity--;
        }
    }
});

export const cartItemActions = cartItemSlice.actions;
export default cartItemSlice.reducer;