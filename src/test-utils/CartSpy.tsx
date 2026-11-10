import useCart from "../hooks/useCart";

function CartSpy() {
  const { cart } = useCart();
  return <div data-testid="cart-spy">{JSON.stringify(cart)}</div>;
}
export default CartSpy;
