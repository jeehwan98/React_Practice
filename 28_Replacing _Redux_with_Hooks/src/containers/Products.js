import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
// import { ProductsContext } from '../context/products-context';
import { useStore } from '../hooks-store/store'; // gives us access to the globalStore and the globalDispatch function
import './Products.css';

const Products = props => {
  // const productList = useContext(ProductsContext).products;
  // const productList = useSelector(state => state.shop.products);
  const state = useStore()[0]; // because it returns 2 things 1. globalState and 2. dispatch

  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
