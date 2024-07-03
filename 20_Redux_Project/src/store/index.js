import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

createSlice({ // preparing a slice of our global state
    name: 'counter', // identifier
    initialState: initialState,
    reducers: {

    }
})

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        };
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        };
    }

    if (action.type === 'toggle') {
        return {
            counter: state.counter,
            showCounter: !state.showCounter
        }
    }

    return state;
}

// create redux store
const store = createStore(counterReducer);

export default store; // export so that we can use logic outside of this file

// subscriber function
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

const incrementAction = { type: 'increment' };
const decrementAction = { type: 'decrement' };

// subscribe to store changes
store.subscribe(counterSubscriber);

store.dispatch(incrementAction);
store.dispatch(decrementAction);