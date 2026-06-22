import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CartProvider } from "../../context/CartContext";
import userEvent from "@testing-library/user-event";
import CartSpy from "../../test-utils/CartSpy";
import ProductCard from "./ProductCard";
import { beforeEach } from "vitest";

describe("ProductCard", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const wrapper = ({ children }) => (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );
  test("рендерит title", () => {
    render(<ProductCard title="pen" />, { wrapper });
    const pen = screen.getByRole("heading", { name: /pen/i });
    expect(pen).toBeInTheDocument();
  });
  test("рендерит img", () => {
    render(<ProductCard img={{ src: "/pictures.png", alt: "pictures" }} />, {
      wrapper,
    });
    const img = screen.getByTestId("card-img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/pictures.png");
    expect(img).toHaveAttribute("alt", "pictures");
  });
  test("рендерит description", () => {
    render(<ProductCard description="blue" />, { wrapper });
    const des = screen.getByTestId("card-description");
    expect(des).toHaveTextContent("blue");
  });
  test("рендерит price с форматированием $X.XX", () => {
    render(<ProductCard price={5} />, { wrapper });
    const price = screen.getByTestId("card-price");
    expect(price).toHaveTextContent("$5.00");
  });
  test("рендерит кнопку при клике на которую товар добавляется в корзину", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProductCard /> <CartSpy />
      </>,
      { wrapper },
    );
    const spy = screen.getByTestId("cart-spy");

    expect(JSON.parse(spy.textContent)).toHaveLength(0);
    const btn = screen.getByRole("button", {
      name: "добавить товар в корзину",
    });
    await user.click(btn);
    const cart = JSON.parse(spy.textContent);
    expect(cart).toHaveLength(1);
  });
  test("при клике на кнопку добаления колличество товара увеличивается если он уже есть в корзине", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProductCard id={8} />
        <CartSpy />
      </>,
      { wrapper },
    );
    const spy = screen.getByTestId("cart-spy");
    const btn = screen.getByRole("button", {
      name: "добавить товар в корзину",
    });
    await user.click(btn);
    expect(JSON.parse(spy.textContent)[0].quantity).toBe(1);
    expect(JSON.parse(spy.textContent)[0].id).toBe(8);
    await user.click(btn);
    expect(JSON.parse(spy.textContent)[0].id).toBe(8);
    expect(JSON.parse(spy.textContent)[0].quantity).toBe(2);
  });
  test("рендерит кнопку '-', которая при клике удаляет товар из корзины если он там есть", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProductCard /> <CartSpy />
      </>,
      { wrapper },
    );
    const btnDel = screen.getByRole("button", {
      name: "убрать товар из корзины",
    });
    const btnAdd = screen.getByRole("button", {
      name: "добавить товар в корзину",
    });
    const spy = screen.getByTestId("cart-spy");
    await user.click(btnAdd);
    expect(JSON.parse(spy.textContent)).toHaveLength(1);
    await user.click(btnDel);
    expect(JSON.parse(spy.textContent)).toHaveLength(0);
  });
  test("при нажатии на кнопку '-' товар уменьшается если его колличество больше одного", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProductCard id={9} /> <CartSpy />
      </>,
      { wrapper },
    );
    const btnDel = screen.getByRole("button", {
      name: "убрать товар из корзины",
    });
    const btnAdd = screen.getByRole("button", {
      name: "добавить товар в корзину",
    });
    const spy = screen.getByTestId("cart-spy");
    await user.click(btnAdd);
    await user.click(btnAdd);
    expect(JSON.parse(spy.textContent)[0].id).toBe(9);
    expect(JSON.parse(spy.textContent)).toHaveLength(1);
    expect(JSON.parse(spy.textContent)[0].quantity).toBe(2);
    await user.click(btnDel);
    expect(JSON.parse(spy.textContent)[0].id).toBe(9);
    expect(JSON.parse(spy.textContent)).toHaveLength(1);
    expect(JSON.parse(spy.textContent)[0].quantity).toBe(1);
  });
});
