import { toast } from '@/components/ui/use-toast';
import { JobPostSchemaType } from '@/lib/validators/jobs.validator';

const intializeRazorpay = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    document.body.appendChild(script);
  });
};

export const useRazorpay = () => {
  const processPayment = async ({
    data,
    amount,
    successCallback,
  }: {
    amount: number;
    data: JobPostSchemaType;
    successCallback: () => void;
  }) => {
    const razorpay = await intializeRazorpay();
    if (!razorpay) {
      toast({
        title: 'Failed to initialize Razorpay',
        variant: 'destructive',
      });
      return;
    }

    const order = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'INR',
      }),
    });
    const orderDetails = await order.json();

    if (!orderDetails.id) {
      toast({
        title: 'Failed to create order',
        variant: 'destructive',
      });
      return;
    }
    const options = {
      key: process.env.RAZORPAY_ID,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: data.title,
      description: data.description,
      order_id: orderDetails.id,
      // prefill: {
      //   email: data.email, // Note: Add email field after commit
      // },
      notes: data,
      modal: {
        ondismiss: () => {
          toast({
            title: 'Payment Cancelled',
            variant: 'destructive',
          });
        },
      },
      handler: () => {
        toast({
          title: 'Payment Successful Thank you!',
          variant: 'success',
        });
        successCallback && successCallback();
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on('payment.failed', (response: any) => {
      toast({
        title: response.error.description,
        variant: 'destructive',
      });
    });
    paymentObject.open();
  };
  return processPayment;
};
