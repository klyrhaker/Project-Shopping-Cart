import { screen, render } from "@testing-library/react";
import useProducts from "../../hooks/useProducts";
import Shop from "./Shop";
vi.mock("../../hooks/useProducts");

describe("Shop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("рендерит список товаров", () => {
    useProducts.mockReturnValue({
      products: [
        {
          title: "product-test",
          description: "",
          price: 2.99,
          img: { src: "", alt: "" },
          id: 67,
        },
      ],
      loading: false,
      error: null,
    });
    render(<Shop />);
    const title = screen.getByRole("heading", { name: "product-test" });
    expect(title).toBeInTheDocument();
  });
  test("рендерит ErrorMessage в случае ошибки", () => {
    useProducts.mockReturnValue({
      products: [],
      error: "anything",
      loading: false,
    });
    render(<Shop />);
    const error = screen.getByTestId("error-message");
    expect(error).toHaveTextContent("Ошибка при загрузке товаров");
  });
  test("рендерит skeleton во время загрузки", () => {
    useProducts.mockReturnValue({
      products: [],
      error: null,
      loading: true,
    });
    render(<Shop />);
    const loading = screen.getByTestId("skeleton");
    expect(loading).toBeInTheDocument();
  });
});
