import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductForm from '../../components/forms/ProductForm';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { Category } from '../../types';

const AdminAddProduct: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setNotification({
          message: 'Failed to load categories',
          type: 'error'
        });
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await productService.createProduct(formData);
      
      if (response) {
        setNotification({
          message: 'Product created successfully!',
          type: 'success'
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/admin/products');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setNotification({
        message: 'An error occurred while creating the product',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="mr-4 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Add New Product</h1>
          <p className="text-gray-600">Create a new product in your inventory</p>
        </div>
      </div>
      
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-md flex items-center ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle size={20} className="mr-2" />
          ) : (
            <AlertCircle size={20} className="mr-2" />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default AdminAddProduct;