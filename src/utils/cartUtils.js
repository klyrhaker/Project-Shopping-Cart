export function getItemSubtotal({ price, quantity }) {
  return price * quantity;
}
export function getCartSummary(cart) {
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
