import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureProductsStore from './hooks-store/products-store';

// this makes sure that we initialize our store since we import initStore from the store file
// globalState, listeners, actions will all be set up and be initialized with the values we're passing in the products-store.js file


configureProductsStore(); // by doing this, we can just simply call it in the components that we want to use it in

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
