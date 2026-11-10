import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CartProvider } from "../../context/CartContext";
import useProducts from "../../hooks/useProducts";
import ProductPage from "./ProductPage";
import type { Product } from "../../types/product";

vi.mock("../../hooks/useProducts");

const mockedUseProducts = vi.mocked(useProducts);

const mockProduct: Product = {
  title: "Test product",
  description: "",
  price: 5.99,
  img: {
    src: "/pic.png",
    alt: "",
  },
  id: 5,
};

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  function createRouter() {
    return createMemoryRouter(
      [{ path: "/shop/:id", element: <ProductPage /> }],
      { initialEntries: ["/shop/5"] },
    );
  }

  test("показывает название товара с id из адреса", () => {
    mockedUseProducts.mockReturnValue({
      products: [{ ...mockProduct, title: "product-test" }],
      loading: false,
      error: null,
    });

    render(
      <CartProvider>
        <RouterProvider router={createRouter()} />
      </CartProvider>,
    );

    const title = screen.getByRole("heading", {
      name: "product-test",
    });

    expect(title).toBeInTheDocument();
  });

  test("показывает ссылку «Вернуться к товарам», ведущую на /shop", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
    });

    render(
      <CartProvider>
        <RouterProvider router={createRouter()} />
      </CartProvider>,
    );

    const link = screen.getByTestId("shop-link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  test("во время загрузки показывает skeleton и не показывает «Товар не найден»", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(
      <CartProvider>
        <RouterProvider router={createRouter()} />
      </CartProvider>,
    );

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Товар не найден")).not.toBeInTheDocument();
  });

  test("при ошибке показывает только сообщение об ошибке", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: new Error("Network error"),
    });

    render(
      <CartProvider>
        <RouterProvider router={createRouter()} />
      </CartProvider>,
    );

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Ошибка при загрузке товаров",
    );

    expect(screen.queryByText("Товар не найден")).not.toBeInTheDocument();
  });

  test("если товара с таким id нет в списке, показывает «Товар не найден»", () => {
    mockedUseProducts.mockReturnValue({
      products: [
        {
          ...mockProduct,
          title: "other-product",
          price: 1,
          id: 99,
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <CartProvider>
        <RouterProvider router={createRouter()} />
      </CartProvider>,
    );

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Товар не найден",
    );

    expect(
      screen.queryByRole("heading", { name: "other-product" }),
    ).not.toBeInTheDocument();
  });
});
