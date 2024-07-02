import { createContext, useReducer } from "react"; // used to just spread the data to the components

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

// goal of this function is to return an updated state
function cartReducer(state, action) {  // these parameters are passed into the function automatically by React
    if (action.type === 'ADD_ITEM') {
        // ... update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        // existing items
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) { // if exists
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem; // overwrite the existing items once added
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return { ...state, items: updatedItems }; // copy the old state and update the items
    }

    if (action.type === 'REMOVE_ITEM') {
        // ... remove an item from the state
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        // const updatedItems = [...state.items];

        if (existingCartItem) {
            const updatedItems = [...state.items];
            if (existingCartItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return { ...state, items: updatedItems };
        }

    }
    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }
    return state;
}

// used to wrap other components to make the CartContext available to components, which will do the actual data and state management
export function CartContextProvider({ children }) {
    /* used to manage complex states easier and move the logic out of the component function 
     * needs a reducer function -> function cartReducer()
     * */
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }); // defines how the state should look like by passing on the reducer function as the first parameter, and an initial state value as the second parameter
    // pass the cart to the `CartContext.Provider` component, which passes the values to the wrapped components

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    // 확인용
    console.log(cartContext);

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;