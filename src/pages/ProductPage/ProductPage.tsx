import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const product = products.find((item) => item.id === Number(id));

  let productContent;
  if (loading) {
    productContent = <Skeleton />;
  } else if (error) {
    productContent = <ErrorMessage message="Ошибка при загрузке товаров" />;
  } else if (!product) {
    productContent = <ErrorMessage message="Товар не найден" />;
  } else {
    productContent = <ProductCard {...product} />;
  }

  return (
    <div data-testid="product-page" className={styles.productPage}>
      <Link to="/shop" data-testid="shop-link" className={styles.backLink}>
        <ArrowLeft size={18} />
        Вернуться к товарам
      </Link>
      {productContent}
    </div>
  );
}
export default ProductPage;
