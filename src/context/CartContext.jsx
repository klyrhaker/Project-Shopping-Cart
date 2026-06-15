import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);

  function addToCart(product) {
    const exsisting = cart.find((item) => item.id === product.id);
    if (exsisting) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    return setCart(cart.filter((item) => item.id !== product.id));
  }
  function clearCart() {
    return setCart([]);
  }
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProvider };
