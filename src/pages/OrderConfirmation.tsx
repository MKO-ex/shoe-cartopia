
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Check, Package } from "lucide-react";
import { formatPrice } from "@/lib/products";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If user tries to access this page directly without order data, redirect to home
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-kam-light-blue py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-kam-blue hover:text-kam-dark-blue transition-colors"
          >
            <ArrowLeft className="mr-2" size={16} />
            Return to home
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 text-center mb-8">Your order has been placed successfully.</p>

          <div className="border-t border-b py-4 my-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Order Number:</span>
              <span>{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Order Date:</span>
              <span>{orderData.date}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Payment Method:</span>
              <span>Credit Card (•••• {orderData.lastFourDigits})</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>{formatPrice(orderData.totalAmount)}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {orderData.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between mb-2">
                <div className="flex items-start">
                  <span className="text-gray-700 mr-2">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 text-kam-blue mr-2" />
              <span className="font-semibold">Shipping Information</span>
            </div>
            <p className="text-gray-600">
              Your order will be processed and shipped within 2-3 business days.
              You will receive a shipping confirmation email with tracking information.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-kam-blue hover:bg-kam-dark-blue text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
