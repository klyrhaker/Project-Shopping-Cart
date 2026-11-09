import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductPage from "./ProductPage";

vi.mock("../../hooks/useProducts");

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("показывает название товара с id из адреса", () => {
    useProducts.mockReturnValue({
      products: [
        {
          title: "product-test",
          description: "",
          price: 5.99,
          img: { src: "", alt: "" },
          id: 5,
        },
      ],
      loading: false,
      error: null,
    });
    const router = createMemoryRouter(
      [{ path: "/shop/:id", element: <ProductPage /> }],
      { initialEntries: ["/shop/5"] },
    );

    render(<RouterProvider router={router} />);

    const title = screen.getByRole("heading", { name: "product-test" });
    expect(title).toBeInTheDocument();
  });
});
