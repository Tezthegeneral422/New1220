import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createStripeCheckoutSession } from '../../services/stripe/stripeService';

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const redirectToCheckout = async (priceId: string) => {
    setIsLoading(true);
    try {
      const checkoutUrl = await createStripeCheckoutSession(priceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      toast.error('Failed to start checkout process');
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    redirectToCheckout
  };
}