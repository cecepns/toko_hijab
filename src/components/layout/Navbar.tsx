import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../assets';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navbarClasses = `fixed w-full z-30 transition-all duration-300 ${scrolled
    ? 'bg-white shadow-md py-2'
    : 'bg-transparent py-4'
    }`;

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Implement search functionality
  //   console.log('Searching for:', searchQuery);
  // };

  return (
    <nav className={navbarClasses}>
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="logo" className="w-24" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <a href="/#products" className="text-gray-700 hover:text-primary-600 transition-colors">Products</a>
            <a href="/#about" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
            {/* <Link to="/#contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link> */}

            {isAuthenticated && (
              <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">Admin</Link>
            )}
          </div>

          {/* <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
            {!isAuthenticated && (
              <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">Login</Link>
            )}
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {/* <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </form> */}
              <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
              <a href="/#products" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">Products</a>
              <a href="/#about" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">About</a>
              {/* <Link to="/#contact" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">Contact</Link> */}

              {isAuthenticated ? (
                <Link to="/admin" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">Admin</Link>
              ) : (
                <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-600 transition-colors">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;