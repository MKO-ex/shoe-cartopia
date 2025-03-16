
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ShoeCard from "@/components/ShoeCard";
import Cart from "@/components/Cart";
import AboutSection from "@/components/AboutSection";
import ProductGallery from "@/components/ProductGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const featuredProducts = products.slice(0, 3);
  
  // Add smooth scrolling for hash links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-kam-light-blue">
      <Navbar />
      <Cart />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:pt-40 md:pb-20 container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-white/50 backdrop-blur-sm text-kam-blue rounded-full mb-4 text-sm font-medium">
                Premium Quality Shoes
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Step Into <span className="text-kam-blue">Comfort</span> & Style
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Discover our collection of handcrafted shoes designed for ultimate comfort and timeless style.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#shoes" 
                  className="px-6 py-3 bg-kam-blue text-white rounded-md hover:bg-kam-dark-blue transition-colors duration-300 shadow-md"
                >
                  Explore Collection
                </a>
                <a 
                  href="#about" 
                  className="px-6 py-3 bg-white text-kam-blue rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-kam-blue/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop" 
                alt="Premium Shoes" 
                className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <AboutSection />
      
      {/* Featured Shoes Section */}
      <section id="shoes" className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Collection</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
            Explore our signature shoes crafted with premium materials and designed for style and comfort.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ShoeCard product={product} featured />
            </motion.div>
          ))}
        </div>
      </section>
      
      <ProductGallery />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;
