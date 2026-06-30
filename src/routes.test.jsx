import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";
vi.mock("./hooks/useProducts");
vi.mock("./hooks/useCart");

describe("routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useCart.mockReturnValue({
      cart: [],
      addToCart: () => {},
      decreaseFromCart: () => {},
      clearCart: () => {},
    });
  });
  test("рендерит HomePage на пути /", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const heading = screen.getByRole("heading", { name: "Klyrh Shop" });
    expect(heading).toBeInTheDocument();
  });
  test("рендерит Shop на пути /shop", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });
    render(<RouterProvider router={router} />);
    const productList = screen.getByTestId("product-list");
    expect(productList).toBeInTheDocument();
  });
  test("рендерит CartPage по пути /cart", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const link = screen.getByRole("link", { name: /перейти к товарам/i });
    expect(link).toBeInTheDocument();
  });
});
