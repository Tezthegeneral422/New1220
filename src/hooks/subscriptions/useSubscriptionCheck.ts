import { useSubscription } from './useSubscription';
import { useLocation } from 'react-router-dom';

export function useSubscriptionCheck() {
  const { subscription } = useSubscription();
  const location = useLocation();

  // Routes that require a paid subscription
  const PROTECTED_ROUTES = [
    '/dashboard',
    '/courses',
    '/goals',
    '/calendar',
    '/daily-routine'
  ];

  const requiresSubscription = PROTECTED_ROUTES.some(route => 
    location.pathname.startsWith(route)
  );
  
  const isPaidUser = subscription?.status === 'active' && 
                    subscription.plan?.price > 0;

  return {
    requiresSubscription,
    isPaidUser,
    canAccess: !requiresSubscription || isPaidUser
  };
}