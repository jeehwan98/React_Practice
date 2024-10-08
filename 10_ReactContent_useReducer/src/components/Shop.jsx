// import { DUMMY_PRODUCTS } from '../dummy-products.js';
// import Product from './Product.jsx';

export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
      {/* list of products could be moved from the Shop to the App component */}
        {/* {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))} */}
        {children}
      </ul>
    </section>
  );
}