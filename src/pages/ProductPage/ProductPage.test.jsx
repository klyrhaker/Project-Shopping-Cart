import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductPage from "./ProductPage";

vi.mock("../../hooks/useProducts");

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  function createRouter() {
    return createMemoryRouter(
      [{ path: "/shop/:id", element: <ProductPage /> }],
      { initialEntries: ["/shop/5"] },
    );
  }

  test("показывает название товара с id из адреса", () => {
    useProducts.mockReturnValue({
      products: [
        {
          title: "product-test",
          description: "",
          price: 5.99,
          img: { src: "/pic.png", alt: "" },
          id: 5,
        },
      ],
      loading: false,
      error: null,
    });

    render(<RouterProvider router={createRouter()} />);

    const title = screen.getByRole("heading", { name: "product-test" });
    expect(title).toBeInTheDocument();
  });

  test("показывает ссылку «Вернуться к товарам», ведущую на /shop", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
    });

    render(<RouterProvider router={createRouter()} />);

    const link = screen.getByTestId("shop-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  test("во время загрузки показывает skeleton и не показывает «Товар не найден»", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<RouterProvider router={createRouter()} />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Товар не найден")).not.toBeInTheDocument();
  });

  test("при ошибке показывает только сообщение об ошибке", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: new Error("Network error"),
    });

    render(<RouterProvider router={createRouter()} />);

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Ошибка при загрузке товаров",
    );
    expect(screen.queryByText("Товар не найден")).not.toBeInTheDocument();
  });

  test("если товара с таким id нет в списке, показывает «Товар не найден»", () => {
    useProducts.mockReturnValue({
      products: [
        {
          title: "other-product",
          description: "",
          price: 1,
          img: { src: "/pic.png", alt: "" },
          id: 99,
        },
      ],
      loading: false,
      error: null,
    });

    render(<RouterProvider router={createRouter()} />);

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Товар не найден",
    );
    expect(
      screen.queryByRole("heading", { name: "other-product" }),
    ).not.toBeInTheDocument();
  });
});
