import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showMyCart = useSelector((state) => state.cart.showMyCart);
  const cart = useSelector((state) => state.cartSlice);
  const notification = useSelector((state) => state.cart.notification);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => { // useEffects allow us to run side effects and run effects when some dependency changes
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]); // cart as a dependency array so that this effect function re-executes whenever the cart changes

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.status} message={notification.message} />}
      <Layout>
        {showMyCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;