
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/products";
import { useToast } from "@/components/ui/use-toast";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { ArrowLeft } from "lucide-react";
import ShippingAddressForm, { ShippingAddressData } from "@/components/ShippingAddressForm";

const Checkout = () => {
  const { state, getCartTotal, clearCart } = useCart();
  const { items } = state;
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">("shipping");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddressData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handleAddressSubmit = (addressData: ShippingAddressData) => {
    setShippingAddress(addressData);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = (cardInfo: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Your order has been placed and will be processed soon.",
        duration: 5000,
      });
      
      // Generate order data
      const orderData = {
        orderNumber: `KAM-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(),
        lastFourDigits: cardInfo.cardNumber.slice(-4),
        totalAmount: getCartTotal() + 1500, // Including shipping
        email: cardInfo.email,
        phone: cardInfo.phone,
        shippingAddress: shippingAddress,
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      };
      
      clearCart();
      navigate("/order-confirmation", { state: { orderData } });
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
          
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentStep === "shipping" ? (
              <>
                <ShippingAddressForm 
                  onAddressSubmit={handleAddressSubmit}
                  isSubmitting={isProcessing}
                />
                <div className="pt-4">
                  <button
                    onClick={form => form.handleSubmit(handleAddressSubmit)}
                    disabled={isProcessing}
                    className="w-full bg-kam-blue hover:bg-kam-dark-blue text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    Continue to Payment
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Shipping Address:</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p>{shippingAddress?.fullName}</p>
                    <p>{shippingAddress?.addressLine1}</p>
                    {shippingAddress?.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                    <p>
                      {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
                    </p>
                    <p>
                      {countries.find(c => c.value === shippingAddress?.country)?.label}
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentStep("shipping")}
                    className="text-kam-blue hover:text-kam-dark-blue text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                <PaymentForm 
                  total={getCartTotal()} 
                  onPaymentSuccess={handlePaymentSuccess}
                  isProcessing={isProcessing}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Array of countries for display
const countries = [
  { value: "ng", label: "Nigeria" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

export default Checkout;
