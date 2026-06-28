import { getCartSummary, getItemSubtotal } from "./cartUtils";

describe("cartUtils", () => {
  test("getItemSubtotal возвращает price всех продуктов одного товара", () => {
    const result = getItemSubtotal({ price: 3, quantity: 2 });
    expect(result).toBe(6);
  });
  test("getCartSummary возвращает price всех товаров", () => {
    const { totalPrice } = getCartSummary([
      { price: 2, quantity: 2 },
      { price: 3, quantity: 1 },
    ]);
    expect(totalPrice).toBe(7);
  });
  test("getCartSummary возвращает quantity всех товаров", () => {
    const { totalQuantity } = getCartSummary([
      { price: 2, quantity: 2 },
      { price: 3, quantity: 7 },
    ]);
    expect(totalQuantity).toBe(9);
  });
  test("getCartSummary возвращает нули для пустой корзины", () => {
    const { totalPrice, totalQuantity } = getCartSummary([]);
    expect(totalPrice).toBe(0);
    expect(totalQuantity).toBe(0);
  });
});
