import { FAKE_STORE_API_URL } from "../constants/api";
import type { Product } from "../types/product";

interface FakeStoreApiProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

async function getProducts(signal: AbortSignal): Promise<Product[]> {
  try {
    const res = await fetch(FAKE_STORE_API_URL, { signal });

    if (!res.ok) throw new Error(`error: ${res.status}`);

    const data = (await res.json()) as FakeStoreApiProduct[];

    const products: Product[] = data.map((item) => {
      return {
        title: item.title,
        price: item.price,
        img: { src: item.image, alt: item.title },
        id: item.id,
        description: item.description,
      };
    });

    return products;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      err.name === "AbortError"
    ) {
      throw err;
    }

    throw new Error(`error: ${String(err)}`);
  }
}

export default getProducts;
