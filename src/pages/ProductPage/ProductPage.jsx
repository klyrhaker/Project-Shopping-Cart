import { Link, useParams } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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
    <div data-testid="product-page">
      <Link to="/shop" data-testid="shop-link">
        Вернуться к товарам
      </Link>
      {productContent}
    </div>
  );
}
export default ProductPage;
