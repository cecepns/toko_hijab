import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-heading font-semibold text-white">Isavra Label</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Temukan koleksi elegan hijab terbaik kami
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary-300" />
                <span className="text-gray-300">082122888903</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-300" />
                <span className="text-gray-300">isavralabel@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Isavra Label. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;