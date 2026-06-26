import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";
describe("ErrorMessage", () => {
  test("рендерит 'message' ошибки", () => {
    render(<ErrorMessage message="ошибка" />);
    const error = screen.getByTestId("error-message");
    expect(error).toHaveTextContent("ошибка");
  });
});
