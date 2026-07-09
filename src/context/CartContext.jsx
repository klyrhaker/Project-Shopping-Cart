import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  decreaseFromCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
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

  function decreaseFromCart(product) {
    const cartItem = cart.find((item) => item.id === product.id);
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      return setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }

    return setCart(cart.filter((item) => item.id !== product.id));
  }

  function removeFromCart(id) {
    return setCart(cart.filter((item) => item.id !== id));
  }

  function clearCart() {
    return setCart([]);
  }
  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseFromCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProvider };
