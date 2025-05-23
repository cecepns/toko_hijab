import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import productService from '../services/productService';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const productData = await productService.getProduct(id);
        
        if (productData) {
          setProduct(productData);
          
          // Fetch similar products from the same category
          const categoryProducts = await productService.getProductsByCategory(productData.categoryId.toString());
          const filtered = categoryProducts.filter(p => p.id.toString() !== id).slice(0, 4);
          setSimilarProducts(filtered);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);
  
  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const message = `Halo, Saya tertarik dengan produk ${product.name}`;
    const whatsappUrl = `https://wa.me/6282122888903?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  if (loading) {
    return (
      <div className="container-custom py-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container-custom py-16 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-700 mb-4">
            {error || 'Product not found'}
          </h2>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={`https://api.isavralabel.com${product.imageUrl}`}
                alt={product.name}
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.categoryName}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
            </div>
            
            <div className="mb-6">
              <span className="text-2xl font-semibold text-primary-600">
                Rp {product.price}
              </span>
              
              <div className="mt-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `Produk Tersedia (${product.stock} tersedia)` : 'Habis'}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tentang Produk</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="mt-auto">
              <button
                onClick={handleWhatsAppOrder}
                disabled={product.stock <= 0}
                className={`w-full py-3 flex items-center justify-center rounded-md font-medium transition-colors ${
                  product.stock > 0 
                    ? 'bg-accent-500 text-white hover:bg-accent-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={20} className="mr-2" />
                Order via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
        
        {similarProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Rekomendasi Produk Lainnya
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map(item => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-800 font-medium group-hover:text-primary-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-primary-600 font-semibold mt-1">
                        Rp {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;