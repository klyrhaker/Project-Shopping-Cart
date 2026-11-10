import { Link, useParams } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((item) => item.id === Number(id));

  return (
    <div data-testid="product-page">
      <Link to="/shop" data-testid="shop-link">
        Вернуться к товарам
      </Link>
      {product && <ProductCard {...product} />}
    </div>
  );
}
export default ProductPage;
