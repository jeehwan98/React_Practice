import { initStore } from "./store";

const configureStore = () => {
    const actions = {
        // value should be a function where we get our current state and
        // return the part of the state we want to update
        TOGGLE_FAV: (curState, productId) => {
            const prodIndex = curState.products.findIndex(
                p => p.id === productId
            );
            const newFavStatus = !curState.products[prodIndex].isFavorite; // get new favorite status
            const updatedProducts = [...curState.products];                // create updated product list based on the old lilst
            updatedProducts[prodIndex] = {                               // swap the one item we're updating
                ...curState.products[prodIndex],                           // copy old item
                isFavorite: newFavStatus                                 // replace with new item
            };
            return { products: updatedProducts };
        }
    }
    initStore(actions, {
        products: [
            {
                id: 'p1',
                title: 'Red Scarf',
                description: 'A pretty red scarf.',
                isFavorite: false
            },
            {
                id: 'p2',
                title: 'Blue T-Shirt',
                description: 'A pretty blue t-shirt.',
                isFavorite: false
            },
            {
                id: 'p3',
                title: 'Green Trousers',
                description: 'A pair of lightly green trousers.',
                isFavorite: false
            },
            {
                id: 'p4',
                title: 'Orange Hat',
                description: 'Street style! An orange hat.',
                isFavorite: false
            }
        ]
    });
};

export default configureStore;