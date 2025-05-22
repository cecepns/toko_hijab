export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
  categoryName?: string;
  categoryDescription?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Admin {
  id: string;
  username: string;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  token?: string;
  admin?: Admin;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}