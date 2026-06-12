import { renderHook, act } from "@testing-library/react";
import useTheme from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });
  test("при монтировании data-theme равен 'light' по умолчанию", () => {
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  test("если в localStorage уже лежит 'dark' — при монтировании тема 'dark'", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    const { result } = renderHook(() => useTheme());
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(result.current[0]).toBe("dark");
  });

  test("toggleTheme меняет тему с 'light' на 'dark'", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
  test("двойной вызов toggleTheme возвращает тему на 'light'", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current[1]();
      result.current[1]();
    });
    expect(result.current[0]).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
