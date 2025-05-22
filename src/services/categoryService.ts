import api from './api';
import { Category } from '../types';

const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch categories');
    }
    return response.data;
  },

  createCategory: async (categoryData: { name: string; description: string }): Promise<Category> => {
    const response = await api.post<Category>('/categories', categoryData);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create category');
    }
    return response.data;
  },

  updateCategory: async (id: number, categoryData: { name: string; description: string }): Promise<Category> => {
    const response = await api.put<Category>(`/categories/${id}`, categoryData);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update category');
    }
    return response.data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    const response = await api.delete(`/categories/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete category');
    }
  }
};

export default categoryService; 