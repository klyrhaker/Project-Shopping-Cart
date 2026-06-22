import useCart from "../../hooks/useCart";
import Button from "../Button/Button";

function ProductCard(props) {
  const { title, description, price = 0, id, img = {} } = props;
  const { cart, addToCart, decreaseFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;
  return (
    <article data-card-id={id} className="product__card">
      <h2 data-testid="card-title" className="product__card-title">
        {title}
      </h2>
      <span
        data-testid="card-price"
        className="product__card-price"
      >{`$${price.toFixed(2)}`}</span>
      <img
        data-testid="card-img"
        className="product__card-img"
        src={img.src}
        alt={img.alt}
      />
      <p data-testid="card-description" className="product__card-description">
        {description}
      </p>
      <Button
        onClick={() => addToCart(props)}
        aria-label="добавить товар в корзину"
      >
        +
      </Button>
      <span className="product__card-quantity" aria-live="polite">
        {quantity}
      </span>
      <Button
        onClick={() => decreaseFromCart(props)}
        aria-label="убрать товар из корзины"
      >
        -
      </Button>
    </article>
  );
}
export default ProductCard;
