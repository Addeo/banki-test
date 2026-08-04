export type CartButtonState = 'idle' | 'processing' | 'in-cart';

export interface NavLink {
  label: string;
  to: string;
}

export interface Product {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  gallery: string[];
  oldPrice: number | null;
  price: number | null;
  isSold: boolean;
}

export interface CartItemView {
  product: Product;
  quantity: number;
}

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $`;
}

export function productFullTitle(product: Product): string {
  return `${product.title} ${product.author}`;
}
