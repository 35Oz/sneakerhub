import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '/logo.png';

interface NavbarProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string, style: string) => void;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onFilterChange, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="sm:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center ml-2"
            onClick={() => window.location.href = '/'}>
              <img 
                src={logo}
                alt="Logo SneakerHub" 
                className="w-12 h-12 sm:w-20 sm:h-20 mr-2" 
              />
            </div>
              <button 
                className="hidden md:block text-2xl font-bold text-white" 
                onClick={() => window.location.href = '/'}
              >
                SneakerHub
              </button>

          </div>
        

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={onCartClick}
              className="text-gray-400 hover:text-white relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        {isSearchOpen && (
          <div className="py-4 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-all duration-200"
              />
            </div>
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50"></div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 space-y-1">
              <p className="text-gray-400 text-sm">Estilos</p>
              {['running', 'tracking', 'fashion', 'casual', 'sport'].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    onFilterChange('all', style);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md w-full text-left capitalize"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;