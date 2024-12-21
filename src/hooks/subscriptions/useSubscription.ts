import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserSubscription } from '../../services/subscriptions/subscriptionService';
import type { UserSubscription } from '../../types/subscription';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadSubscription() {
      try {
        const data = await getUserSubscription(user.id);
        if (isMounted) {
          setSubscription(data);
          setError(null);
        }
      } catch (error) {
        console.error('Error loading subscription:', error);
        if (isMounted) {
          setError(error instanceof Error ? error : new Error('Failed to load subscription'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSubscription();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return {
    subscription,
    isLoading,
    error,
    isSubscribed: subscription?.status === 'active',
    isPro: subscription?.status === 'active' && subscription.plan?.name === 'Pro',
    isEnterprise: subscription?.status === 'active' && subscription.plan?.name === 'Enterprise'
  };
}