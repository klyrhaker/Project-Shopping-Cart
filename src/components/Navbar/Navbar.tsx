import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";
import { getCartSummary } from "../../utils/cartUtils";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { cart } = useCart();
  const [theme, toggleTheme] = useTheme();
  const { totalQuantity } = getCartSummary(cart);

  return (
    <header>
      <h1 className={styles.navLogo}>Klyrh</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Товары
        </NavLink>
        <div className={styles.cartWrapper}>
          <NavLink
            to="/cart"
            aria-label="Перейти в корзину"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <div className={styles.cartIconWrapper}>
              <ShoppingCart size={24} className={styles.cartIcon} />
              {totalQuantity > 0 && (
                <span data-testid="cart-count" className={styles.cartBadge}>
                  {totalQuantity}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>

      <Button
        data-testid="theme-btn"
        className={styles.themeBtn}
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className={styles.moon} />
        ) : (
          <Sun className={styles.sun} />
        )}
      </Button>
    </header>
  );
}
export default Navbar;
