import { render, screen } from "@testing-library/react";
import useCart from "../../hooks/useCart";
import userEvent from "@testing-library/user-event";
import CartPage from "./CartPage";
import { MemoryRouter } from "react-router";

vi.mock("../../hooks/useCart");
describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("при пустой корзине рендерит сслыку на страницу товаров", () => {
    useCart.mockReturnValue({
      cart: [],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart: () => {},
    });
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /перейти к товарам/i });
    expect(link).toBeInTheDocument();
  });
  test("рендерит карточку товара из cart", () => {
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 3,
          quantity: 1,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart: () => {},
    });
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    const product1 = screen.getByRole("heading", { name: "product1" });
    expect(product1).toBeInTheDocument();
  });
  test("рендерит общую цену всех товаров в корзине", () => {
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 1,
          quantity: 1,
        },
        {
          title: "product2",
          description: "",
          id: 13,
          img: { src: "/png", alt: "" },
          price: 2,
          quantity: 1,
        },
        {
          title: "product3",
          description: "",
          id: 32,
          img: { src: "/png", alt: "" },
          price: 4,
          quantity: 1,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart: () => {},
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
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 1,
          quantity: 1,
        },
        {
          title: "product2",
          description: "",
          id: 13,
          img: { src: "/png", alt: "" },
          price: 2,
          quantity: 5,
        },
        {
          title: "product3",
          description: "",
          id: 32,
          img: { src: "/png", alt: "" },
          price: 4,
          quantity: 2,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart: () => {},
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
    const clearCart = vi.fn();
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 1,
          quantity: 1,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart,
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    const button = screen.getByRole("button", { name: /очистить корзину/i });
    const user = userEvent.setup();
    await user.click(button);
    expect(clearCart).toHaveBeenCalled();
  });
  test("рендерит кнопку 'X' для удаления товара из корзины", () => {
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 1,
          quantity: 1,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    });
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    const button = screen.getByTestId("remove-3");
    expect(button).toBeInTheDocument();
  });
  test("при нажатии на  кнопку 'X' товар удаляется из корзины", async () => {
    const removeFromCart = vi.fn();
    useCart.mockReturnValue({
      cart: [
        {
          title: "product1",
          description: "",
          id: 3,
          img: { src: "/png", alt: "" },
          price: 1,
          quantity: 1,
        },
        {
          title: "product2",
          description: "",
          id: 32,
          img: { src: "/png", alt: "" },
          price: 4,
          quantity: 2,
        },
      ],
      addToCart: () => {},
      decreaseFromCart: () => {},
      removeFromCart,
      clearCart: () => {},
    });
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    const button = screen.getByTestId("remove-32");
    const user = userEvent.setup();
    await user.click(button);
    expect(removeFromCart).toHaveBeenCalled();
  });
});
