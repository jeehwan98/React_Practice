// // "npm init -y" in the terminal
// // "npm install redux"

// // we import Redux from the Redux package with this syntax
// const redux = require('redux');

// /* we need to create 
//  - store
//  - reducer function (which changes the store)
//  - action
//  - component

//  => usually start with a store as it is the central piece and concept of Redux
//  * */

// const counterReducer = (state = { counter: 0 }, action) => { // receives state and action as default
//     return {
//         counter: state.counter + 1
//     };
// };

// const store = redux.createStore(counterReducer); // store needs to know which reducer is responsible for changing that store

// // console.log(store.getState());

// // subscription
// // this function will always be updated whenever the state changes
// const counterSubscriber = () => {
//     const latestState = store.getState(); // gives us the latest snapshot after being updated
//     console.log(latestState);
// };

// store.subscribe(counterSubscriber);

// store.dispatch({ type: 'increment' });

const redux = require('redux');

const initialState = { counter: 0 };

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        };
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        };
    }

    return state;
}

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

store.subscribe(counterSubscriber);

const incrementAction = { type: 'increment' };
const decrementAction = { type: 'decrement' };

store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(decrementAction);

