
import { useState } from 'react';
import { products } from '@/lib/products';
import ShoeCard from './ShoeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'running', name: 'Running' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'sport', name: 'Sport' },
];

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="all-products" className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">All Products</h2>
        
        <div className="flex justify-center flex-wrap gap-2 mb-10 mt-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                activeCategory === category.id
                  ? "bg-kam-blue text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShoeCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;
