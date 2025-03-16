import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { formatPrice } from '@/lib/products';
import { ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, toggleCart, getCartTotal, clearCart } = useCart();
  const { isOpen, items } = state;
  const cartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        toggleCart(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Lock body scroll when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, toggleCart]);

  const handleCheckout = () => {
    toggleCart(false);
    navigate('/checkout');
  };

  const isCartEmpty = items.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />
      
      {/* Cart Sidebar */}
      <div
        ref={cartRef}
        className={cn(
          "fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-lg z-50 transition-transform duration-500 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Your Cart
            </h2>
            <button
              onClick={() => toggleCart(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-2 px-4">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-400">
                  Add items to get started
                </p>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {items.map(({ product, quantity }) => (
                  <li key={product.id}>
                    <CartItem product={product} quantity={quantity} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            {!isCartEmpty && (
              <>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(getCartTotal())}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </>
            )}
            
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={isCartEmpty}
                className={cn(
                  "w-full rounded-md py-3 px-4 text-center font-medium text-white transition-colors",
                  isCartEmpty 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-kam-blue hover:bg-kam-dark-blue"
                )}
              >
                Checkout
              </button>
            </div>
            
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  onClick={() => toggleCart(false)}
                  className="font-medium text-kam-blue hover:text-kam-dark-blue"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
