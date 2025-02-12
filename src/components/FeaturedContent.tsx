import React from 'react';
import { motion } from 'framer-motion';

interface FeaturedContentProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
  title,
  description,
  image,
  reverse = false,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 md:py-16 lg:py-20 min-h-screen">
      <motion.div
        className={`w-full lg:w-1/2 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center lg:text-left bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 text-center lg:text-left leading-relaxed">
          {description}
        </p>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-transform duration-700 hover:rotate-1 hover:scale-105">
          <img
            src={image}
            alt={title}
            className="w-full max-h-[50vh] h-[30vh] lg:h-[50vh] md:h-[40vh] object-cover rounded-3xl"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedContent;
