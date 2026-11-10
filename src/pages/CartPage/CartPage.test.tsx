import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useCart from "../../hooks/useCart";
import CartPage from "./CartPage";
import type { CartItem, Product } from "../../types/product";

vi.mock("../../hooks/useCart");

const mockedUseCart = vi.mocked(useCart);

const mockProduct1: CartItem = {
  title: "product1",
  description: "",
  id: 3,
  img: { src: "/png", alt: "" },
  price: 1,
  quantity: 1,
};

const mockProduct2: CartItem = {
  title: "product2",
  description: "",
  id: 13,
  img: { src: "/png", alt: "" },
  price: 2,
  quantity: 5,
};

const mockProduct3: CartItem = {
  title: "product3",
  description: "",
  id: 32,
  img: { src: "/png", alt: "" },
  price: 4,
  quantity: 2,
};

const emptyCart: CartItem[] = [];

const mockCartContext = {
  cart: emptyCart,
  addToCart: vi.fn<(product: Product) => void>(),
  decreaseFromCart: vi.fn<(product: Product) => void>(),
  removeFromCart: vi.fn<(id: number) => void>(),
  clearCart: vi.fn<() => void>(),
};

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("при пустой корзине рендерит ссылку на страницу товаров", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: /перейти к товарам/i,
    });

    expect(link).toBeInTheDocument();
  });

  test("рендерит карточку товара из cart", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const product1 = screen.getByRole("heading", {
      name: "product1",
    });

    expect(product1).toBeInTheDocument();
  });

  test("рендерит общую цену всех товаров в корзине", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [
        mockProduct1,
        { ...mockProduct2, quantity: 1 },
        { ...mockProduct3, quantity: 1 },
      ],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const totalPrice = screen.getByTestId("total-price");

    expect(totalPrice).toHaveTextContent("$7.00");
  });

  test("рендерит общее количество всех товаров в корзине", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1, mockProduct2, mockProduct3],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const totalQuantity = screen.getByTestId("total-quantity");

    expect(totalQuantity).toHaveTextContent("8");
  });

  test("при нажатии на кнопку очистки корзины вызывается clearCart", async () => {
    const clearCart = vi.fn<() => void>();

    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
      clearCart,
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /очистить корзину/i,
    });

    const user = userEvent.setup();

    await user.click(button);

    expect(clearCart).toHaveBeenCalled();
  });

  test("рендерит кнопку 'X' для удаления товара из корзины", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByTestId("remove-3");

    expect(button).toBeInTheDocument();
  });

  test("при нажатии на кнопку 'X' товар удаляется из корзины", async () => {
    const removeFromCart = vi.fn<(id: number) => void>();

    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1, mockProduct3],
      removeFromCart,
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByTestId("remove-32");
    const user = userEvent.setup();

    await user.click(button);

    expect(removeFromCart).toHaveBeenCalledWith(32);
  });

  test("рендерит кнопку 'оформить заказ'", () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /оформить заказ/i,
    });

    expect(button).toBeInTheDocument();
  });

  test("при клике на кнопку выводится текст 'заказ успешно оформлен'", async () => {
    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /оформить заказ/i,
    });

    expect(
      screen.queryByText(/заказ успешно оформлен/i),
    ).not.toBeInTheDocument();

    await user.click(button);

    expect(screen.getByRole("status")).toHaveTextContent(
      /заказ успешно оформлен/i,
    );
  });

  test("при клике на кнопку 'оформить заказ' вызывается clearCart", async () => {
    const clearCart = vi.fn<() => void>();

    mockedUseCart.mockReturnValue({
      ...mockCartContext,
      cart: [mockProduct1],
      clearCart,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /оформить заказ/i,
    });

    await user.click(button);

    expect(clearCart).toHaveBeenCalled();
  });
});
