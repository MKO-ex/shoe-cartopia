
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 3000,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Contact Us</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-kam-blue rounded-full p-3 mr-4">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-medium">Email</h4>
                <a href="mailto:contact@kamshoes.com" className="text-gray-600 hover:text-kam-blue transition-colors">
                  contact@kamshoes.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-kam-blue rounded-full p-3 mr-4">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-medium">Phone</h4>
                <a href="tel:+123456789" className="text-gray-600 hover:text-kam-blue transition-colors">
                  +123 456 789
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-kam-blue rounded-full p-3 mr-4">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-medium">Address</h4>
                <p className="text-gray-600">
                  123 Shoe Street, Fashion City
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kam-blue focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kam-blue focus:border-transparent"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kam-blue focus:border-transparent"
                placeholder="Your message"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-kam-blue hover:bg-kam-dark-blue text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
