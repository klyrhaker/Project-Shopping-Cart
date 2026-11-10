import { createContext, type PropsWithChildren } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Product, CartItem } from "../types/product";

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseFromCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useLocalStorage("cart", [] as CartItem[]);

  function addToCart(product: Product): void {
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

  function decreaseFromCart(product: Product): void {
    const cartItem = cart.find((item) => item.id === product.id);

    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
      return;
    }

    setCart(cart.filter((item) => item.id !== product.id));
  }

  function removeFromCart(id: number): void {
    setCart(cart.filter((item) => item.id !== id));
  }

  function clearCart(): void {
    setCart([]);
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
