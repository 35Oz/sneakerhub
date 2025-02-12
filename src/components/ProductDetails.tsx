import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      // Scroll to top when product changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    };
    
    dispatch({
      type: 'ADD_ITEM',
      payload: cartItem
    });

    alert('Product added to cart!');
  };

  return (
    <section className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center text-white mb-8 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg" />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                  {product.style}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-white mb-6">${product.price}</p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Talles</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Elija el color</h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative w-12 h-12 rounded-full p-1 ${
                      selectedColor === color.name ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Añadir al carrito</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails