export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  sku: string;
  specifications?: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  productCount?: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'warehouse';
  avatar?: string;
}
