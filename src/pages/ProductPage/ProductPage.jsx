import { useParams } from "react-router";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((item) => item.id === Number(id));

  return (
    <div data-testid="product-page">
      {product && <ProductCard {...product} />}
    </div>
  );
}
export default ProductPage;
