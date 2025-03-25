
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { getCartCount, toggleCart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-md bg-kam-blue/80 shadow-md py-4" 
          : "bg-kam-blue py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          KAM Shoes
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('shoes')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium"
              >
                Shoes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('all-products')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium"
              >
                View All Products
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => toggleCart(true)}
            className="relative text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={24} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-kam-blue rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {getCartCount()}
              </span>
            )}
          </button>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-kam-blue/95 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-6">
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium block w-full text-left py-2"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('shoes')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium block w-full text-left py-2"
              >
                Shoes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('all-products')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium block w-full text-left py-2"
              >
                View All Products
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-kam-dark-blue transition-colors font-medium block w-full text-left py-2"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
