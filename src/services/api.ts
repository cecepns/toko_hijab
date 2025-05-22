import axios from 'axios';
import { ApiResponse } from '../types';

const API_URL = 'https://api.isavralabel.com/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Remove Content-Type header for FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  setAuthToken: (token: string): void => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  
  removeAuthToken: (): void => {
    delete instance.defaults.headers.common.Authorization;
  },
  
  get: async <T>(url: string, params = {}): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.get(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || error.message 
        };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },
  
  post: async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || error.message 
        };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },
  
  put: async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || error.message 
        };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },
  
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.delete(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          error: error.response?.data?.error || error.message 
        };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },
};

export default api;