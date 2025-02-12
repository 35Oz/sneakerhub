import React from 'react';
import { motion } from 'framer-motion';

interface FeaturedSectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  description,
  image,
  reverse = false,
}) => {
  return (
    <div className="h-screen min-w-full flex items-center px-4">
      <div className={`container mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            <img
              src={image}
              alt={title}
              className="w-full h-[60vh] object-cover relative z-10 hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = '1';
                target.style.transform = 'scale(1.02)';
              }}
              style={{ opacity: 0, transform: 'scale(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-20" />
          </div>
        </motion.div>
        <motion.div 
          className="lg:w-1/2 text-white"
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {title}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">{description}</p>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300">
            Explorar Colección
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSection;