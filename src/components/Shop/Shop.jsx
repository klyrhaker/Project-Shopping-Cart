import useProducts from "../../hooks/useProducts";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ProductCard from "../ProductCard/ProductCard";
import Skeleton from "../Skeleton/Skeleton";

function Shop() {
  const { products, loading, error } = useProducts();
  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message="Ошибка при загрузке товаров" />;
  return (
    <ul className="product-list" data-testid="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list__item">
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
export default Shop;
