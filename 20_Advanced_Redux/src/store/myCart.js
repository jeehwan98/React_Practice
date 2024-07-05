import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    showMyCart: false,
    notification: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggleCart(state) {
            state.showMyCart = !state.showMyCart;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
            console.log(action.payload);
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;