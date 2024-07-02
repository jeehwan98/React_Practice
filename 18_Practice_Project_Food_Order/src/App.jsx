import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider> {/* used to show the cart */}
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        {/* <h1>You got this 💪</h1>
        <p>Stuck? Not sure how to proceed?</p>
        <p>Don't worry - we've all been there. Let's build it together!</p> */}
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
