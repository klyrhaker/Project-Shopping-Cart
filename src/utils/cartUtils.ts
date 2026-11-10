import type { CartItem } from "../types/product";

export function getItemSubtotal({
  price,
  quantity,
}: Pick<CartItem, "price" | "quantity">): number {
  return price * quantity;
}

export function getCartSummary(cart: Pick<CartItem, "price" | "quantity">[]): {
  totalQuantity: number;
  totalPrice: number;
} {
  const { totalPrice, totalQuantity } = cart.reduce(
    (acc, cur) => {
      acc.totalPrice += getItemSubtotal(cur);
      acc.totalQuantity += cur.quantity;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 },
  );

  return { totalQuantity, totalPrice };
}
