import Button from "./Button";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("Button", () => {
  test("рендерит переданный children", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });
  test("применяет переданный className", () => {
    render(<Button className="btn">Click</Button>);
    const button = screen.getByRole("button", { name: "Click" });
    expect(button).toHaveClass("btn");
  });
  test("вызывает onClick при клике", async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole("button", { name: "Click" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
