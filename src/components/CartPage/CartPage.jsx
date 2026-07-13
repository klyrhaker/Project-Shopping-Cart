import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import { getCartSummary } from "../../utils/cartUtils";
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import { useState } from "react";
import Toast from "../Toast/Toast";
import styles from "./CartPage.module.css";

function CartPage() {
  const { cart, clearCart } = useCart();

  const { totalQuantity, totalPrice } = getCartSummary(cart);
  const [isOrder, setIsOrder] = useState(false);

  return (
    <div className={styles.cartWrapper}>
      {isOrder && (
        <Toast
          message="Заказ успешно оформлен"
          duration={3000}
          onDismiss={() => setIsOrder(false)}
          className={styles.orderMessage}
        />
      )}

      {cart.length === 0 ? (
        <Link to="/shop">Перейти к товарам</Link>
      ) : (
        <>
          <div className={styles.cartItemsList}>
            {cart.map((product) => (
              <ProductCard key={product.id} {...product} isInCart />
            ))}
          </div>

          {/* Правая колонка с итогами */}
          <div className={styles.cartSummary}>
            <p data-testid="total-price" className={styles.totalPrice}>
              Итого: ${totalPrice.toFixed(2)}
            </p>
            <p data-testid="total-quantity" className={styles.totalQuantity}>
              Товаров: {totalQuantity} шт.
            </p>
            <Button
              className={styles.btnOrder}
              onClick={() => {
                clearCart();
                setIsOrder(true);
              }}
            >
              Оформить заказ
            </Button>
            <Button className={styles.clearCart} onClick={clearCart}>
              Очистить корзину
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
export default CartPage;
