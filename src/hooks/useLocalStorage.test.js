import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";
import { expect } from "vitest";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
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

  test("возвращает initialValue если передали невалидный json", () => {
    localStorage.setItem("key", "not valid json{{{");
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
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
