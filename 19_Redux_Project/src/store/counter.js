import { createSlice } from "@reduxjs/toolkit";

// Counter
const initialCounterState = {
    counter: 0,
    showCounter: true
};

/* 
 * in redux/toolkit -> we're not overwriting the existing code but instead,
 * clone and create a new state object, keep all the state which we're not editing and override the state which we're editing in an immutable way
 * because of this internally used package
*/
const counterSlice = createSlice({ // preparing a slice of our global state
    name: 'counter', // identifier
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;