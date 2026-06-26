import { Link } from "react-router";
function HomePage() {
  return (
    <>
      <h1>Klyrh Shop</h1>
      <p>
        Простой и удобный способ найти именно то, что вам нужно. Большой выбор
        товаров, быстрое оформление заказа.
      </p>
      <Link to="/shop" className="home__cta-button">
        перейти к товарам
      </Link>
    </>
  );
}
export default HomePage;
