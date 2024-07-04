import { cartActions } from '../../store/myCart';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cartItem.quantity);

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
