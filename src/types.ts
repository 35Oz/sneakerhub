export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women';
  style: 'running' | 'tracking' | 'fashion' | 'casual' | 'sport';
  description: string;
  sizes: number[];
  colors: { name: string; hex: string }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: number;
  selectedColor?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  style: string;
}