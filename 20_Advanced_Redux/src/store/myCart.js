import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    showMyCart: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggleCart(state) {
            state.showMyCart = !state.showMyCart;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;