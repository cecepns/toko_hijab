import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleWhatsAppOrder = () => {
    const message = `Hello, I would like to order ${product.name} (ID: ${product.id})`;
    const whatsappUrl = `https://wa.me/6282122888903?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <motion.div 
      className="card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={`https://api.isavralabel.com${product.imageUrl}`} 
          alt={product.name} 
          className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        
        {product.stock <= 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm font-medium">
            Habis
          </div>
        )}
        
        {!!product.featured && (
          <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-sm font-medium">
            Terlaris
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex flex-col justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-800">{product?.name}</h3>
          <span className="text-lg font-semibold text-primary-600">Rp {product?.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{product?.description}</p>
        
        <div className="mt-auto flex space-x-2">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-primary flex-1"
          >
            Lihat Detail
          </Link>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={product.stock <= 0}
            className={`btn flex items-center justify-center ${
              product.stock > 0 ? 'btn-accent' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;