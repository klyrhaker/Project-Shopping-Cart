export interface ProductImage {
  src?: string;
  alt?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: ProductImage;
}

export interface CartItem extends Product {
  quantity: number;
}
