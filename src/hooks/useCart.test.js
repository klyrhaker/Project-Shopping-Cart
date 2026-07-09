import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import useCart from "./useCart";

describe("useContext/useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("cart изначально пустой массив", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    expect(result.current.cart).toEqual([]);
  });

  test("addToCart добавляет новый товар с quantity: 1", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    const newProduct = { id: 1 };
    act(() => {
      result.current.addToCart(newProduct);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  test("addToCart увеличивает quantity если товар уже есть в корзине", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    const newProduct = { id: 1 };
    act(() => {
      result.current.addToCart(newProduct);
    });
    act(() => {
      result.current.addToCart(newProduct);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  test("decreaseFromCart удаляет товар если его quantity: 1", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    const newProduct = { id: 4 };
    act(() => {
      result.current.addToCart(newProduct);
    });
    expect(result.current.cart).toHaveLength(1);
    act(() => {
      result.current.decreaseFromCart(newProduct);
    });
    expect(result.current.cart).toHaveLength(0);
  });
  test("decreaseFromCart уменьшает колличество товара если его quantity > 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    const newProduct = { id: 7 };
    act(() => {
      result.current.addToCart(newProduct);
    });

    act(() => {
      result.current.addToCart(newProduct);
    });
    expect(result.current.cart[0].quantity).toBe(2);
    act(() => {
      result.current.decreaseFromCart(newProduct);
    });
    expect(result.current.cart[0].quantity).toBe(1);
  });

  test("removeFromCart удаляет товар если он есть в стейте", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    const firstProduct = { id: 4 };
    const secondProduct = { id: 7 };
    act(() => {
      result.current.addToCart(firstProduct);
    });
    act(() => {
      result.current.addToCart(firstProduct);
    });
    act(() => {
      result.current.addToCart(secondProduct);
    });
    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart[0].quantity).toBe(2);
    act(() => {
      result.current.removeFromCart(firstProduct.id);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(7);
  });
  test("clearCart полностью очищает стейт от всех товаров", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    const firstProduct = { id: 1 };
    const secondProduct = { id: 2 };
    const thirdProduct = { id: 3 };
    act(() => {
      result.current.addToCart(firstProduct);
    });
    act(() => {
      result.current.addToCart(secondProduct);
    });
    act(() => {
      result.current.addToCart(thirdProduct);
    });
    expect(result.current.cart).toHaveLength(3);
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toHaveLength(0);
  });
});
