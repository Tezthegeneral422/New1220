import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSubscription } from '../../hooks/subscriptions/useSubscription';
import { UpgradePrompt } from './UpgradePrompt';

interface SubscriptionCheckProps {
  children: React.ReactNode;
}

export function SubscriptionCheck({ children }: SubscriptionCheckProps) {
  const { subscription } = useSubscription();
  const location = useLocation();

  const requiresSubscription = ['/dashboard'].includes(location.pathname);
  const isPaidUser = subscription?.status === 'active' && subscription.plan?.price > 0;

  if (requiresSubscription && !isPaidUser) {
    return <UpgradePrompt />;
  }

  return <>{children}</>;
}