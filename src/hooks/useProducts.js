import { useState, useEffect } from "react";
import getProducts from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchProducts() {
      try {
        const data = await getProducts(signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
export default useProducts;
