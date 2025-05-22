import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductForm from '../../components/forms/ProductForm';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { Product, Category } from '../../types';

const AdminEditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          productService.getProduct(id),
          categoryService.getAllCategories()
        ]);
        
        if (productData) {
          setProduct(productData);
        } else {
          setNotification({
            message: 'Product not found',
            type: 'error'
          });
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({
          message: 'Failed to load data',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      
      const updatedProduct = await productService.updateProduct(id, formData);
      
      setNotification({
        message: 'Product updated successfully!',
        type: 'success'
      });
      
      // Update local state
      setProduct(updatedProduct);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error('Error updating product:', error);
      setNotification({
        message: 'An error occurred while updating the product',
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
          <h1 className="text-2xl font-semibold text-gray-800">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
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
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : !product ? (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
            <p className="text-gray-500 mb-6">
              The product you're trying to edit could not be found.
            </p>
            <button
              onClick={() => navigate('/admin/products')}
              className="btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <ProductForm 
            initialData={product} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;