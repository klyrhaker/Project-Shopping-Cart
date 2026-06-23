import { vi } from "vitest";
import getProducts from "./productService.js";

describe("productService", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    localStorage.clear();
  });
  const fakeApiProduct = {
    id: 1,
    title: "Pen",
    price: 2.99,
    description: "Blue pen",
    image: "https://example.com/pen.png",
  };
  test("getProducts возвращает один товар в корректном формате", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [fakeApiProduct],
    });
    const product = await getProducts();
    expect(product[0]).toEqual({
      id: 1,
      title: "Pen",
      price: 2.99,
      description: "Blue pen",
      img: { src: "https://example.com/pen.png", alt: "Pen" },
    });
  });
  test("getProducts возвращает все товары из ответа", async () => {
    const secondProduct = {
      id: 2,
      title: "Notebook",
      price: 5,
      description: "...",
      image: "...",
    };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [fakeApiProduct, secondProduct],
    });

    const products = await getProducts();

    expect(products).toHaveLength(2);
  });
  test("getProducts выбрасывает ошибку если fetch не удался", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    await expect(getProducts()).rejects.toThrow();
  });
});
