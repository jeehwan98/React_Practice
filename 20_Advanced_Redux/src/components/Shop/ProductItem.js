import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartItemActions } from '../../store/cartItem';
import { cartActionss } from '../../store/cart-slice';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description, id } = props;


  // we want to do all the heavy work in the reducer function
  // but now, we want to sync our new state to the server (update the server with a new state)
  // 1. let the redux update the store
  // 2. send the request to the server
  // whenever our cart state change, we can send the HTTP request to the backend
  const addItemHandler = () => {
    // dispatch(cartItemActions.increment());
    dispatch(cartActionss.addItemToCart({
      id,
      title,
      price,
    }));
  }



  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
