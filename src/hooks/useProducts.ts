import { useState, useEffect } from "react";
import getProducts from "../services/productService";
import type { Product } from "../types/product";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProducts(): Promise<void> {
      try {
        const data: Product[] = await getProducts(signal);
        setProducts(data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}

export default useProducts;
