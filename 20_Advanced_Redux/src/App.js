import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showMyCart = useSelector(state => state.cart.showMyCart);

  return (
    <Layout>
      {showMyCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
