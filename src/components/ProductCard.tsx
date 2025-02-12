import React, { memo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('showProductDetails', { detail: product }));
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-90 cursor-pointer flex flex-col mx-auto mb-6"
      onClick={handleClick}
    >
      <div className="relative pb-[56.25%]">
        {/* Placeholder skeleton */}
        <div
          className={`absolute inset-0 bg-gray-700 animate-pulse ${imageLoaded ? 'hidden' : 'block'}`}
        />
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Información del producto */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>

        {/* Ajustar el ancho del span al contenido */}
        <span className="text-center w-[60px] text-xs font-medium px-2 py-1 bg-gray-700 rounded-full text-white">
          {product.style}
        </span>

        {/* Descripción visible solo en escritorio */}
        <p className="text-gray-300 text-xs mb-3 line-clamp-2 sm:line-clamp-3 hidden sm:block">{product.description}</p>

        {/* Precio */}
        <p className="text-white font-bold text-sm">${product.price}</p>

        {/* Botón "Ver Detalles" */}
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="w-full sm:w-auto flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-xs sm:text-sm"
          >
            <ShoppingBag size={16} />
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
