
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { ArrowLeft, CheckCircle } from "lucide-react";
import ShippingAddressForm, { ShippingAddressData } from "@/components/ShippingAddressForm";

// Array of countries for display
export const countries = [
  { value: "ng", label: "Nigeria" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

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
    
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (cardInfo: any) => {
    setIsProcessing(true);
    
    // Simulate payment gateway processing
    setTimeout(() => {
      toast({
        title: "Payment successful! 🎉",
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
        
        {/* Checkout progress */}
        <div className="mb-8">
          <div className="flex justify-center items-center">
            <div className={`flex flex-col items-center ${currentStep === "shipping" ? "text-kam-blue font-medium" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === "shipping" ? "bg-kam-blue text-white" : "bg-gray-200 text-gray-600"}`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className={`w-16 h-0.5 ${currentStep === "shipping" ? "bg-gray-200" : "bg-kam-blue"} mx-1`}></div>
            <div className={`flex flex-col items-center ${currentStep === "payment" ? "text-kam-blue font-medium" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep === "payment" ? "bg-kam-blue text-white" : "bg-gray-200 text-gray-600"}`}>
                {currentStep === "payment" ? <CheckCircle className="h-4 w-4" /> : "2"}
              </div>
              <span className="text-sm">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <OrderSummary />
          </div>
          
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentStep === "shipping" ? (
              <ShippingAddressForm 
                onAddressSubmit={handleAddressSubmit}
                isSubmitting={isProcessing}
              />
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

export default Checkout;
