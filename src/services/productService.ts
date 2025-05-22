import api from './api';
import { Product } from '../types';

const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch products');
    }
    return response.data;
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/featured');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch featured products');
    }
    return response.data;
  },
  
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch product');
    }
    return response.data;
  },
  
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch products by category');
    }
    return response.data;
  },
  
  createProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post<Product>('/products', productData);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create product');
    }
    return response.data;
  },
  
  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, productData);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update product');
    }
    return response.data;
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    const response = await api.delete(`/products/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete product');
    }
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/search', {
      params: { q: query }
    });
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to search products');
    }
    return response.data;
  }
};

export default productService;