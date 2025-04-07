
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/products";
import { CreditCard, CheckCircle, Shield, Lock } from "lucide-react";

// Payment form schema
const formSchema = z.object({
  cardName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(19, { message: "Card number must not exceed 19 characters." })
    .regex(/^[0-9\s-]+$/, { message: "Card number can only contain digits, spaces, or dashes." }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be 3 or 4 digits." })
    .max(4, { message: "CVV must be 3 or 4 digits." })
    .regex(/^[0-9]+$/, { message: "CVV can only contain digits." }),
});

interface PaymentFormProps {
  total: number;
  onPaymentSuccess: (cardInfo: any) => void;
  isProcessing: boolean;
}

const PaymentForm = ({ total, onPaymentSuccess, isProcessing }: PaymentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardType, setCardType] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Payment details:", values);
    setIsSubmitting(true);
    
    // Simulate payment gateway processing
    setTimeout(() => {
      setIsSubmitting(false);
      onPaymentSuccess(values);
    }, 1500);
  };

  // Detect card type based on first digits
  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (cleanNumber.startsWith('4')) {
      return 'visa';
    } else if (/^5[1-5]/.test(cleanNumber)) {
      return 'mastercard';
    } else if (/^3[47]/.test(cleanNumber)) {
      return 'amex';
    } else if (/^6(?:011|5)/.test(cleanNumber)) {
      return 'discover';
    } else {
      return '';
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    const formattedValue = parts.length ? parts.join(" ") : value;
    const detectedType = detectCardType(formattedValue);
    setCardType(detectedType);
    
    return formattedValue;
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      
      <div className="mb-6 p-3 bg-kam-light-blue rounded-md flex items-center">
        <Shield className="text-kam-blue mr-2" size={18} />
        <p className="text-sm">This payment is securely processed by our payment provider.</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Accepted Cards</span>
        <div className="flex space-x-2">
          <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[10px] font-medium">VISA</div>
          <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[10px] font-medium">MC</div>
          <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-[10px] font-medium">AMEX</div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isProcessing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com" 
                    {...field}
                    disabled={isProcessing} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="0123456789" 
                    value={field.value}
                    onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                    disabled={isProcessing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      value={field.value}
                      onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                      maxLength={19}
                      disabled={isProcessing}
                      className="pr-10"
                    />
                    {cardType && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold">
                        {cardType.toUpperCase()}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/YY" 
                      value={field.value}
                      onChange={(e) => field.onChange(formatExpiryDate(e.target.value))}
                      maxLength={5}
                      disabled={isProcessing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="123" 
                        maxLength={4}
                        {...field}
                        disabled={isProcessing}
                        className="pr-10"
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isProcessing}
              className="w-full bg-kam-blue hover:bg-kam-dark-blue text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting || isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" size={18} />
                  Pay {formatPrice(total)}
                </>
              )}
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center">
              <CheckCircle className="mr-2 text-green-500" size={16} />
              Your payment information is secure
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
