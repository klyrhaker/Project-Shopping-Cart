import { screen, render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("рендерит статичный текст '@klyrh2026'", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-text")).toHaveTextContent(/@klyrh2026/i);
  });
});
