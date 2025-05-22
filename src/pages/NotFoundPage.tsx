import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg w-full text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-9xl font-bold text-primary-300">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center btn btn-primary px-6 py-3"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;