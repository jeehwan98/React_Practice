import React from 'react';
import ReactDOM from 'react-dom/client';
// we go to the highest point of the component and import { Provider } from 'react-redux' so that our entire App can have access to the store
import { Provider } from 'react-redux'; // this is actually a component

import './index.css';
import App from './App';
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
