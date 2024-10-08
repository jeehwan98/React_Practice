import React, { useState } from "react";

// context object
export const ProductsContext = React.createContext({
    products: [],
    toggleFav: (id) => { }
});

export default props => {
    const [productsList, setProductsList] = useState([
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
    ]);

    const toggleFavorite = productId => {
        setProductsList(currentProdList => {
            const prodIndex = currentProdList.findIndex(
                p => p.id === productId
            );
            const newFavStatus = !currentProdList[prodIndex].isFavorite; // get new favorite status
            const updatedProducts = [...currentProdList];                // create updated product list based on the old lilst
            updatedProducts[prodIndex] = {                               // swap the one item we're updating
                ...currentProdList[prodIndex],                           // copy old item
                isFavorite: newFavStatus                                 // replace with new item
            };
            return updatedProducts;
        });
    }

    return (
        // <ProductsContext.Provider value={{ products: productsList }}>
        <ProductsContext.Provider value={{ products: productsList, toggleFav: toggleFavorite }}>
            {props.children}
        </ProductsContext.Provider>
    );
}