import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";
import { expect } from "vitest";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("возвращает initialValue если ключа нет в localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  test("возвращает сохранённое значение если ключ уже есть в localStorage", () => {
    localStorage.setItem("key", JSON.stringify("nikita"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("nikita");
  });

  test("не откатывает state к initialValue при ошибке localStorage.setItem", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    act(() => {
      result.current[1]("first");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    act(() => {
      result.current[1]("second");
    });
    expect(result.current[0]).toBe("first");
  });

  test("setStoredValue обновляет state и записывает в localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("new");
    });
    expect(result.current[0]).toBe("new");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("new"));
  });
});
