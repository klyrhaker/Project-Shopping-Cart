import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import { getCartSummary } from "../../utils/cartUtils";
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";

function CartPage() {
  const { cart, clearCart } = useCart();
  if (cart.length === 0) return <Link to="/shop">Перейти к товарам</Link>;
  const { totalQuantity, totalPrice } = getCartSummary(cart);

  return (
    <>
      {cart.map((product) => (
        <ProductCard key={product.id} {...product} isInCart />
      ))}

      <p data-testid="total-price" className="total-price">
        ${totalPrice.toFixed(2)}
      </p>
      <p data-testid="total-quantity" className="total-quantity">
        {totalQuantity}
      </p>
      <Button className="clear-cart" onClick={clearCart}>
        очистить корзину
      </Button>
    </>
  );
}
export default CartPage;
