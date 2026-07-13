import useProducts from "../../hooks/useProducts";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ProductCard from "../ProductCard/ProductCard";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./Shop.module.css";

function Shop() {
  const { products, loading, error } = useProducts();
  if (loading)
    return (
      <div className={styles.shopLoaderWrapper}>
        <Skeleton />
      </div>
    );
  if (error) return <ErrorMessage message="Ошибка при загрузке товаров" />;
  return (
    <ul className={styles.productList} data-testid="product-list">
      {products.map((product) => (
        <li key={product.id} className={styles.productItem}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
export default Shop;
