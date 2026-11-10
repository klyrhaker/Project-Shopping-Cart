import { render, screen, act } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("рендерит переданный текст сообщения", () => {
    render(<Toast message="Заказ успешно оформлен" onDismiss={() => {}} />);
    expect(screen.getByText(/заказ успешно оформлен/i)).toBeInTheDocument();
  });
  test("по истечению таймера вызывается 'onDismiss'", () => {
    const onDismiss = vi.fn();
    render(<Toast message="default" onDismiss={onDismiss} duration={3000} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
  test("'onDismiss' не вызывется до истечения 'duration'", () => {
    const onDismiss = vi.fn();
    render(<Toast message="default" onDismiss={onDismiss} duration={3000} />);
    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onDismiss).toHaveBeenCalledTimes(0);
  });
});
