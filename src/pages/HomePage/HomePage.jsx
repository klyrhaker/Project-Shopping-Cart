import { Link } from "react-router";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={styles.homeWrapper}>
      <h1 className={styles.homeLogo}>Klyrh Shop</h1>
      <p>
        Простой и удобный способ найти именно то, что вам нужно. Большой выбор
        товаров, быстрое оформление заказа.
      </p>
      <Link to="/shop" className={styles.ctaButton}>
        перейти к товарам
      </Link>
    </div>
  );
}
export default HomePage;
