
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="container mx-auto text-center">
      <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Us</h2>
          <p className="mt-8 text-lg leading-relaxed text-gray-700">
            KAM Shoes is dedicated to providing high-quality, stylish, and comfortable footwear. 
            Our goal is to keep you moving with confidence.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Founded with a passion for combining innovative design with exceptional comfort, 
            we create shoes that not only look great but also provide the support your feet need.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-kam-blue rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
            <p className="text-gray-600 text-center">
              We use only the highest quality materials for durability and comfort.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-kam-blue rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovative Design</h3>
            <p className="text-gray-600 text-center">
              Our designs blend style with functionality for the perfect fit.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-kam-blue rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600 text-center">
              We're committed to ensuring you love your KAM shoes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
