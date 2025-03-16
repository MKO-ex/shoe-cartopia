
import { useState } from 'react';
import { Product, formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShoeCardProps {
  product: Product;
  featured?: boolean;
}

const ShoeCard = ({ product, featured = false }: ShoeCardProps) => {
  const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className={cn(
        "neo-card group animate-fade-up",
        featured ? "max-w-md mx-auto" : "w-full max-w-xs"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-kam-blue/30 border-t-kam-blue rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovering ? "scale-110" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={cn(
          "absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}>
          <button
            onClick={() => addItem(product)}
            className="bg-white text-kam-blue rounded-full p-3 transform transition-transform duration-300 hover:scale-110 mx-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={20} />
          </button>
          <button
            className="bg-white text-kam-blue rounded-full p-3 transform transition-transform duration-300 hover:scale-110 mx-2"
            aria-label={`View ${product.name} details`}
          >
            <Info size={20} />
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-kam-blue font-bold text-lg">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};

export default ShoeCard;
