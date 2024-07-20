import React, { useContext } from 'react';
import Card from '../UI/Card';
import './ProductItem.css';
// import { ProductsContext } from '../../context/products-context';
import { useStore } from '../../hooks-store/store';

const ProductItem = React.memo(props => {
  console.log('RENDERING');
  // const toggleFav = useContext(ProductsContext).toggleFav;
  const dispatch = useStore(false)[1]; // only interested in the dispatch function
  // for each product, we're using our custom hook, which is the reason why all are rendered

  const toggleFavHandler = () => {
    // toggleFav(props.id)
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
