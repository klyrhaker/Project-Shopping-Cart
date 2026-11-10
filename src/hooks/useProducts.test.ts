import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import getProducts from "../services/productService";
import useProducts from "./useProducts";
import type { Product } from "../types/product";

vi.mock("../services/productService");

const mockedGetProducts = vi.mocked(getProducts);

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Pen",
    img: {
      src: "./png",
      alt: "Pen",
    },
    description: "blue",
    price: 2.99,
  },
];

describe("useProducts", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("возвращает массив товаров", async () => {
    mockedGetProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
  });

  test("возвращает error в случае ошибки", async () => {
    mockedGetProducts.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.products).toEqual([]);
  });

  test("loading = true до завершения промиса", async () => {
    mockedGetProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  test("вызывает abort() при размонтировании", async () => {
    mockedGetProducts.mockResolvedValue([]);

    const abortSpy = vi.spyOn(AbortController.prototype, "abort");

    const { unmount } = renderHook(() => useProducts());

    unmount();

    expect(abortSpy).toHaveBeenCalledTimes(1);

    abortSpy.mockRestore();
  });
});
