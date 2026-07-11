import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import { getCartSummary } from "../../utils/cartUtils";
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import { useState } from "react";
import Toast from "../Toast/Toast";

function CartPage() {
  const { cart, clearCart } = useCart();

  const { totalQuantity, totalPrice } = getCartSummary(cart);
  const [isOrder, setIsOrder] = useState(false);

  return (
    <>
      {isOrder && (
        <Toast
          message="Заказ успешно оформлен"
          duration={3000}
          onDismiss={() => setIsOrder(false)}
          className="order-message"
        />
      )}

      {cart.length === 0 ? (
        <Link to="/shop">Перейти к товарам</Link>
      ) : (
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
          <Button
            className="btn-order"
            onClick={() => {
              clearCart();
              setIsOrder(true);
            }}
          >
            Оформить заказ
          </Button>

          <Button className="clear-cart" onClick={clearCart}>
            очистить корзину
          </Button>
        </>
      )}
    </>
  );
}
export default CartPage;
