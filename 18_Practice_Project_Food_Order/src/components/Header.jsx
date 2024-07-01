import { useContext, forwardRef } from 'react';
import CartContext from '../store/CartContext.jsx';
import headerLogo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0); // reduce() -> helps reduce an array to a single value

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id='title'>
                <img src={headerLogo} alt='A restaurant' />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button
                    textOnly
                    onClick={handleShowCart}
                >
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    )
}