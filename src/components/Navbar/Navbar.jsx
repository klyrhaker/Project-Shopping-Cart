import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { cart } = useCart();
  const [theme, toggleTheme] = useTheme();
  return (
    <header>
      <h1>Klyrh Cart</h1>
      <nav>
        <Link to="/">Товары</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
      <span data-testid="cart-count">{cart.length}</span>
      <Button
        data-testid="theme-btn"
        className="theme-btn"
        onClick={toggleTheme}
      >
        {theme}
      </Button>
    </header>
  );
}
export default Navbar;
