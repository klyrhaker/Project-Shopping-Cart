import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import { Link } from "react-router";
import styles from "./ProductCard.module.css";

function ProductCard(props) {
  const {
    title,
    description,
    price = 0,
    id,
    img = {},
    isInCart = false,
  } = props;
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;
  return (
    <article data-card-id={id} className={styles.productCard}>
      <h2 data-testid="card-title" className={styles.productTitle}>
        <Link data-testid={`link-${id}`} to={`/shop/${id}`}>
          {title}
        </Link>
      </h2>
      <span
        data-testid="card-price"
        className={styles.cardPrice}
      >{`$${price.toFixed(2)}`}</span>
      <img
        data-testid="card-img"
        className={styles.productImg}
        src={img.src}
        alt={img.alt}
      />
      <p data-testid="card-description" className={styles.productDescription}>
        {description}
      </p>
      <div className={styles.controlsRow}>
        <Button
          onClick={() => addToCart(props)}
          aria-label="добавить товар в корзину"
          className={styles.ProductBtnAdd}
        >
          +
        </Button>
        <span className={styles.productQuantity} aria-live="polite">
          {quantity}
        </span>
        <Button
          onClick={() => decreaseFromCart(props)}
          aria-label="убрать товар из корзины"
          className={styles.ProductBtnDec}
        >
          -
        </Button>
      </div>

      {isInCart && (
        <Button
          className={styles.productBtnRemove}
          onClick={() => removeFromCart(id)}
          aria-label="удалить товар"
          data-testid={`remove-${id}`}
        >
          x
        </Button>
      )}
    </article>
  );
}
export default ProductCard;
