import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Archive, Tag, ArrowUpRight, Layers, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { Product } from '../../types';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    outOfStock: 0,
    featured: 0,
    categories: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories()
        ]);
        setProducts(productsData);
        
        // Calculate dashboard stats
        const outOfStock = productsData.filter(p => p.stock <= 0).length;
        const featured = productsData.filter(p => p.featured).length;
        
        setStats({
          totalProducts: productsData.length,
          outOfStock: outOfStock,
          featured: featured,
          categories: categoriesData.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };
  
  const recentProducts = products.slice(0, 5);
  const lowStockProducts = [...products]
    .filter(p => p.stock > 0 && p.stock <= 5)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-800">
                  <ShoppingBag size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Total Products</h2>
                  <p className="text-2xl font-semibold">{stats.totalProducts}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-800">
                  <Archive size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Out of Stock</h2>
                  <p className="text-2xl font-semibold">{stats.outOfStock}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-accent-100 text-accent-800">
                  <Tag size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Featured Products</h2>
                  <p className="text-2xl font-semibold">{stats.featured}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-800">
                  <Layers size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Categories</h2>
                  <p className="text-2xl font-semibold">{stats.categories}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="font-semibold text-lg">Recent Products</h3>
                <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                  View All <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="p-0">
                {recentProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No products found</div>
                ) : (
                  <div className="divide-y">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center p-4 hover:bg-gray-50">
                        <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
                          <img 
                            src={`https://api.isavralabel.com${product.imageUrl}`} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.categoryName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-800">Rp {product.price}</p>
                          <p className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of stock'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Low Stock Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="font-semibold text-lg">Low Stock Alert</h3>
                <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                  View All <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="p-0">
                {lowStockProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No products with low stock</div>
                ) : (
                  <div className="divide-y">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center p-4 hover:bg-gray-50">
                        <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
                          <img 
                            src={`https://api.isavralabel.com${product.imageUrl}`} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.categoryName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-amber-600">
                            Only {product.stock} left
                          </p>
                          <Link 
                            to={`/admin/products/edit/${product.id}`}
                            className="text-xs text-primary-600 hover:text-primary-800"
                          >
                            Update Stock
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/admin/products/add" className="btn btn-primary flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Add New Product
            </Link>
            <Link to="/admin/products" className="btn btn-secondary flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              Manage Products
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;