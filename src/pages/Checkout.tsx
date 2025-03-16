
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/products";
import { useToast } from "@/components/ui/use-toast";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { state, getCartTotal, clearCart } = useCart();
  const { items } = state;
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Your order has been placed and will be processed soon.",
        duration: 5000,
      });
      
      clearCart();
      navigate("/");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-kam-light-blue py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-kam-blue hover:text-kam-dark-blue mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Return to shopping
        </button>

        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <OrderSummary />
          </div>
          
          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PaymentForm 
              total={getCartTotal()} 
              onPaymentSuccess={handlePaymentSuccess}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
