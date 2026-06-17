import { render, screen } from "@testing-library/react";
import { CartProvider } from "../../context/CartContext";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

describe("Navbar", () => {
  const wrapper = ({ children }) => (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );
  beforeEach(() => {
    localStorage.clear();
  });
  test("Navbar рендерит лого", () => {
    render(<Navbar />, { wrapper });
    const logo = screen.getByRole("heading", { name: "Klyrh Cart" });
    expect(logo).toBeInTheDocument();
  });
  test("Navbar рендерит ссылку страницу товаров", () => {
    render(<Navbar />, { wrapper });
    const linkPageGoods = screen.getByRole("link", { name: /товары/i });
    expect(linkPageGoods).toBeInTheDocument();
  });
  test("Navbar рендерит ссылку на страницу корзины товаров", () => {
    render(<Navbar />, { wrapper });
    const linkPageCart = screen.getByRole("link", { name: /корзина/i });
    expect(linkPageCart).toBeInTheDocument();
  });

  test("Navbar показывает колличество товаров в корзине", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ]),
    );
    render(<Navbar />, { wrapper });
    const countCart = screen.getByTestId("cart-count");
    expect(countCart).toBeInTheDocument();
    expect(countCart).toHaveTextContent("2");
  });
  test("Navbar рендерит кнопку смены темы", () => {
    render(<Navbar />, { wrapper });
    const themeBtn = screen.getByTestId("theme-btn");
    expect(themeBtn).toBeInTheDocument();
  });
});
