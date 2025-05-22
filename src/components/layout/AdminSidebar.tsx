import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Settings, ShoppingCart, Tag } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <ShoppingBag size={20} />, label: 'Products' },
    // { path: '/admin/products/add', icon: <PlusCircle size={20} />, label: 'Add Product' },
    { path: '/admin/categories', icon: <Tag size={20} />, label: 'Categories' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <aside className="w-64 bg-gray-800 text-white hidden md:block">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <ShoppingCart className="h-8 w-8 text-primary-300" />
          <span className="ml-2 text-xl font-heading font-semibold">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
                  isActive(item.path) ? 'bg-gray-700 border-l-4 border-primary-500' : ''
                }`}
              >
                <span className="mr-3 text-gray-300">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6">
        <Link
          to="/admin/settings"
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <Settings size={20} className="mr-3" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;