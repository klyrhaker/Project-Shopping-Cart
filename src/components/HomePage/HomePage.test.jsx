import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "./HomePage";

describe("HomePage", () => {
  const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
  test("рендерит заголовок 'Klyrh Shop'", () => {
    render(<HomePage />, { wrapper });
    const heading = screen.getByRole("heading", { name: "Klyrh Shop" });
    expect(heading).toBeInTheDocument();
  });
  test("рендерит описание 'Простой и удобный способ найти именно то, что вам нужно. Большой выбор товаров, быстрое оформление заказа.'", () => {
    render(<HomePage />, { wrapper });
    const description = screen.getByText(
      "Простой и удобный способ найти именно то, что вам нужно. Большой выбор товаров, быстрое оформление заказа.",
    );
    expect(description).toBeInTheDocument();
  });
  test("рендерит ссылочную кнопку с текстом 'Перейти к товарам'", () => {
    render(<HomePage />, { wrapper });
    const btnLink = screen.getByRole("link", { name: /перейти к товарам/i });
    expect(btnLink).toBeInTheDocument();
  });
});
