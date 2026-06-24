import { beforeEach } from "vitest";
import { vi } from "vitest";
import getProducts from "../services/productService";
import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";

vi.mock("../services/productService");

describe("useProducts", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("возвращает объект товара", async () => {
    getProducts.mockResolvedValue([
      {
        id: 1,
        title: "Pen",
        img: { src: "./png", alt: "Pen" },
        description: "blue",
        price: 2.99,
      },
    ]);
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.products).toEqual([
      {
        id: 1,
        title: "Pen",
        img: { src: "./png", alt: "Pen" },
        description: "blue",
        price: 2.99,
      },
    ]);
  });
  test("возвращает error в случае ошибки", async () => {
    getProducts.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useProducts());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.products).toEqual([]);
  });
  test("loading = true до завершения промиса", async () => {
    getProducts.mockResolvedValue([
      {
        id: 1,
        title: "Pen",
        img: { src: "./png", alt: "Pen" },
        description: "blue",
        price: 2.99,
      },
    ]);
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
