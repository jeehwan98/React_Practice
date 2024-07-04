import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.js';
import counterReducer from './counter.js';

// configureStore method: helps us to combine lots of states into one global reducer
const store = configureStore({
    reducer: { // store has to have only 1 root reducer
        counter: counterReducer,
        auth: authReducer
    }
});

export default store; // export so that we can use logic outside of this file