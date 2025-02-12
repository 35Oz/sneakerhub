import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Navbar from './components/Navbar';
import { Shoe3D } from './components/Shoe3D';
import { CartProvider } from './context/CartContext';
import { products } from './data/products';
import { SearchFilters as SearchFiltersType, Product } from './types';
import { motion } from 'framer-motion';
import SearchFilters from './components/SearchFilters';
import ScrollSection from './components/ScrollSection';
import FeaturedContent from './components/FeaturedContent';
import { Environment} from '@react-three/drei';


// Lazy load components
const ProductCard = lazy(() => import('./components/ProductCard'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Checkout = lazy(() => import('./components/Checkout'));
const Cart = lazy(() => import('./components/Cart'));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-full min-h-[200px] bg-gray-800 rounded-lg animate-pulse" />
);

function App() {

  //States for loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    category: 'all',
    style: 'all'
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  React.useEffect(() => {
    const handleShowProduct = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedProduct(customEvent.detail);
    };

    window.addEventListener('showProductDetails', handleShowProduct);
    return () => window.removeEventListener('showProductDetails', handleShowProduct);
  }, []);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
    setSelectedProduct(null);
  };

  const handleFilterChange = (category: string, style: string) => {
    setFilters(prev => ({ ...prev, category, style }));
    setSelectedProduct(null);
  };

  const showSearchResults = filters.query.length > 0;

  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesQuery = product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                          product.description.toLowerCase().includes(filters.query.toLowerCase());
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesStyle = filters.style === 'all' || product.style === filters.style;
      return matchesQuery && matchesCategory && matchesStyle;
    });
  }, [filters]);

  const [fov] = useState(50); // Valor por defecto del fov

  
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900"
      >
        <Navbar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onCartClick={() => setIsCartOpen(true)}
        />

        {!selectedProduct && (
          <>
            {!showSearchResults ? (
              <>
                {/* Hero Section with 3D Model */}
                <div className="h-[82vh] lg:h-[90vh] relative mt-10"
 
                 >
                  {isLoading ? (
                    <div className="absolute inset-0 flex justify-center mb-72 items-center">
                      <div className="w-12 h-12 sm:w-20 sm:h-20 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <Canvas
                      camera={{ position: [0, 0, 4], fov}} // Asegúrate de que la cámara esté fija
                      className="absolute inset-0"
                   
                    >
                      <directionalLight 
                        position={[2, 52, 2]}  // Ajusta la posición de la luz según lo necesites
                        intensity={8}  // Ajusta la intensidad de la luz
                        castShadow  // Habilita la sombra si la deseas
                      />
                
                      <Shoe3D />
                      <Environment preset="city" />
                    </Canvas>
                  )}

                  <div className="w-[40vh] md:w-[94vh] lg:w-[120vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-26 bg-gray-800/60 py-4 rounded-xl backdrop-blur-md shadow-xl">
                    <h1 className="text-[20px] sm:text-[45px] md:text-[55px] lg:text-[70px] font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                      Bienvenido a SneakerHub
                    </h1>
                    <p className="text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] text-gray-200">
                      Descubre tu par perfecto
                    </p>
                  </div>
                </div>

                {/* Horizontal Scroll Section */}
                <ScrollSection>
                  <FeaturedContent
                    title="Quiénes somos"
                    description="En SneakerHub, no solo vendemos zapatillas, creamos cultura. Somos el punto de encuentro para los amantes de las sneakers, donde cada par cuenta una historia de estilo, innovación y pasión."
                    image="https://th.bing.com/th/id/R.fbcbf3b896c278064acbb880e95404ac?rik=iJlkSPDmYa2LtQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-WtxQ0q512wI%2fTZOjb1In4-I%2fAAAAAAAAAEM%2ftLp1j_ywiSc%2fs1600%2fdeadstock-wall-paper.jpg&ehk=ixgw7%2fxwnkf14GcYOkE%2bJRAXudCSlTSxzweWhd0XfT4%3d&risl=&pid=ImgRaw&r=0"
                    reverse
                  />

                  <FeaturedContent
                    title="Colección Exclusiva"
                    description="Descubrí nuestra selección curada de zapatillas icónicas y lanzamientos exclusivos. Desde ediciones limitadas hasta colaboraciones con diseñadores de renombre, cada modelo refleja la esencia de SneakerHub."
                    image="https://i.pinimg.com/736x/49/00/c5/4900c5fbfa986918d2dded7100806467.jpg"
                    reverse
                  />

                  <FeaturedContent
                    title="Unite a la Comunidad"
                    description="Más que una tienda, somos una comunidad global de entusiastas de las zapatillas. Participá en eventos, compartí tu colección y conectá con otros fanáticos que comparten tu misma pasión por el streetwear."
                    image="https://i0.wp.com/sneakercon.com/wp-content/uploads/2023/01/sneakercon-sea-vendors.jpg?fit=629%2C420&ssl=1"
                    reverse
                  />
                </ScrollSection>

                {/* Products Grid/Carousel for Home */}
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <Suspense fallback={<LoadingFallback />}>
                    {/* Desktop/mobile Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: Math.min(index * 0.1, 0.3) }}
                          viewport={{ once: true, amount: 0.1 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  </Suspense>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-lg">No se encuentran productos relacionados.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Search Results with Filters
              <div className="container mx-auto px-4 py-8 mt-16">
                <div className="flex flex-col lg:flex-row gap-24">
                  {/* Filters Sidebar */}
                  <div className="lg:w-1/4">
                    <div className="sticky top-24">
                      <SearchFilters
                        selectedStyle={filters.style}
                        selectedCategory={filters.category}
                        onStyleChange={(style) => handleFilterChange(filters.category, style)}
                        onCategoryChange={(category) => handleFilterChange(category, filters.style)}
                      />
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="lg:w-3/4">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Resultados ({filteredProducts.length})
                    </h2>

                    <Suspense fallback={<LoadingFallback />}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        {filteredProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: Math.min(index * 0.1, 0.3) }}
                            viewport={{ once: true, amount: 0.1 }}
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </div>
                    </Suspense>

                    {filteredProducts.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No se encuentran productos relacionados.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <Suspense fallback={<LoadingFallback />}>
          {/* Product Details Page */}
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => {
              setSelectedProduct(null);
              window.history.pushState({}, '', '/');
            }} 
          />

          {/* Cart Modal */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />

          {/* Checkout Modal */}
          <Checkout
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </Suspense>
      </div>
    </CartProvider>
  );
}

export default App;