import { createContext, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

/*
 * createContext -> help us store values
 * from here, we can store that value in any variable or constant of our choice
 * 
 * next step...
 * -> we can pass a value to create context that will be used as an initial value that can be provided to multiple copmponents in the react app, to all the components that wil be wrapped by the context
 * -> provide it to the app and to our components
*/
export const CartContext = createContext({
    items: [],
    addItemToCart: () => {}, // add a dummy function here ... (helps with autocompletion)
    updateItemQuantity: () => {},
});

// this function is created outside because it shouldn't be recreated whenever the component function is executed, because it also won't need direct access to any value defined or updated in the component function
function shoppingCartReducer(state, action) { // needs these 2 parameters because this function would be called by react after we dispatch a so-called action
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items]; // prevShoppingCart -> changed to state
        
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
    
        if (existingCartItem) {
            const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
            });
        }
        return {
            // ...state, // not needed here because we have only one value
            items: updatedItems,
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );
    
        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };
    
        updatedItem.quantity += action.payload.amount;
    
        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }
    
        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

// idea is to grab all the state management and context value management
export default function CartContextProvider({ children }) {
    const [ shoppingCartState, shoppingCartDispatch ] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    );
    // after writing useReducer, we now need a reducer function that will actually get triggered by dispatching values -> that will then produce a new state
    // we don't have to use useState since we're using useReducer
    
    function handleAddItemToCart(id) {
        // instead of having all the state updating logic, we just call this dispatch function, which we got back from useReducer function and use it to dispatch an action
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id,
        });
    }
    
    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId: productId,
                amount: amount
            }
        })
    }
    
    const ctxValue = {
        items: shoppingCartState.items, // 
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}