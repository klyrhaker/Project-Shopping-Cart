import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import getProducts from "./productService";
import type { Product } from "../types/product";

const fetchMock = vi.fn<typeof fetch>();

const fakeApiProduct = {
  id: 1,
  title: "Pen",
  price: 2.99,
  description: "Blue pen",
  image: "https://example.com/pen.png",
};

describe("productService", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("getProducts возвращает один товар в корректном формате", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([fakeApiProduct]), {
        status: 200,
      }),
    );

    const signal = new AbortController().signal;
    const products = await getProducts(signal);

    const expectedProducts: Product[] = [
      {
        id: 1,
        title: "Pen",
        price: 2.99,
        description: "Blue pen",
        img: {
          src: "https://example.com/pen.png",
          alt: "Pen",
        },
      },
    ];

    expect(products).toEqual(expectedProducts);
  });

  test("getProducts возвращает все товары из ответа", async () => {
    const secondProduct = {
      id: 2,
      title: "Notebook",
      price: 5,
      description: "...",
      image: "...",
    };

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([fakeApiProduct, secondProduct]), {
        status: 200,
      }),
    );

    const signal = new AbortController().signal;
    const products = await getProducts(signal);

    expect(products).toHaveLength(2);
  });

  test("getProducts выбрасывает ошибку если fetch не удался", async () => {
    fetchMock.mockRejectedValue(new Error("Network error"));

    const signal = new AbortController().signal;

    await expect(getProducts(signal)).rejects.toThrow();
  });

  test("getProducts пробрасывает AbortError без оборачивания", async () => {
    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";

    fetchMock.mockRejectedValue(abortError);

    const signal = new AbortController().signal;

    await expect(getProducts(signal)).rejects.toBe(abortError);
  });
});
