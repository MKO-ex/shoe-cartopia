
import { useState } from 'react';
import { Product, formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex py-6 border-b border-gray-200 last:border-0 animate-fade-up">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-kam-blue/30 border-t-kam-blue rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover object-center transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
            <p className="ml-4 text-base font-medium text-gray-900">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.description}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={handleDecrement}
              className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
            </button>
            <span className="px-4 py-1 flex items-center justify-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(product.id)}
            className="ml-4 text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
