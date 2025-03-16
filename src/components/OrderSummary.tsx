
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';

const OrderSummary = () => {
  const { state, getCartTotal } = useCart();
  const { items } = state;
  
  // Calculate subtotal and shipping
  const subtotal = getCartTotal();
  const shipping = 1500; // Fixed shipping cost of ₦1,500
  const total = subtotal + shipping;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="border-b pb-4 mb-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between mb-2">
            <div className="flex items-start">
              <span className="text-gray-700 mr-2">{quantity}x</span>
              <span>{product.name}</span>
            </div>
            <span className="font-medium">{formatPrice(product.price * quantity)}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 border-b pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
