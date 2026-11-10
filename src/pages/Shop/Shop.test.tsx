import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { PropsWithChildren } from "react";
import useProducts from "../../hooks/useProducts";
import { CartProvider } from "../../context/CartContext";
import Shop from "./Shop";
import type { Product } from "../../types/product";

vi.mock("../../hooks/useProducts");

const mockedUseProducts = vi.mocked(useProducts);

const mockProduct: Product = {
  title: "product-test",
  description: "",
  price: 2.99,
  img: {
    src: "",
    alt: "",
  },
  id: 67,
};

describe("Shop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );

  test("рендерит список товаров", () => {
    mockedUseProducts.mockReturnValue({
      products: [mockProduct],
      loading: false,
      error: null,
    });

    render(<Shop />, { wrapper });

    const title = screen.getByRole("heading", {
      name: "product-test",
    });

    expect(title).toBeInTheDocument();
  });

  test("рендерит ErrorMessage в случае ошибки", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      error: new Error("anything"),
      loading: false,
    });

    render(<Shop />, { wrapper });

    const error = screen.getByTestId("error-message");

    expect(error).toHaveTextContent("Ошибка при загрузке товаров");
  });

  test("рендерит skeleton во время загрузки", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      error: null,
      loading: true,
    });

    render(<Shop />, { wrapper });

    const loading = screen.getByTestId("skeleton");

    expect(loading).toBeInTheDocument();
  });
});
