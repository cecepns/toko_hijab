import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const { admin, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="ml-2 text-gray-700">{admin?.username}</span>
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} className="mr-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;