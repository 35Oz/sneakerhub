import React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex-[0_0_85%] min-w-0 pl-4 first:pl-0"
              initial={{ opacity: 0, y: 20 }} // Animación más ligera
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }} // Animación más rápida
              viewport={{ once: true, amount: 0.2 }} // Reduce la cantidad de viewport
            >
               <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/40 transition-colors"
        onClick={scrollPrev}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/40 transition-colors"
        onClick={scrollNext}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ProductCarousel;
