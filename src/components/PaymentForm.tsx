
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
import { CreditCard, CheckCircle } from "lucide-react";

// Payment form schema
const formSchema = z.object({
  cardName: z.string().min(3, { message: "Name must be at least 3 characters." }),
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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Payment details:", values);
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      onPaymentSuccess(values);
    }, 1500);
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

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      
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
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    value={field.value}
                    onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                    maxLength={19}
                    disabled={isProcessing}
                  />
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
                    <Input 
                      placeholder="123" 
                      maxLength={4}
                      {...field}
                      disabled={isProcessing}
                    />
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
                  Processing...
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
