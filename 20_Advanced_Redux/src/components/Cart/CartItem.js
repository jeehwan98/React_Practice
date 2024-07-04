import { useDispatch, useSelector } from 'react-redux';
import classes from './CartItem.module.css';
import { cartItemActions } from '../../store/cartItem';

const CartItem = (props) => {
  const { title } = props.item;

  const dispatch = useDispatch();
  const manageQuantity = useSelector(state => state.cartItem.quantity);
  const item = useSelector(state => state.cartItem);

  const decrementHandler = () => {
    dispatch(cartItemActions.decrement());
  }

  const total = item.price * manageQuantity;

  const incremetHandler = () => {
    dispatch(cartItemActions.increment());
  }

  if (manageQuantity < 0) {
    return;
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${item.price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{manageQuantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incremetHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
