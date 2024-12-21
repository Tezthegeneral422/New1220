import React from 'react';
import { useSubscriptionCheck } from '../../hooks/subscriptions/useSubscriptionCheck';
import { UpgradePrompt } from './UpgradePrompt';

interface SubscriptionGateProps {
  children: React.ReactNode;
  feature?: string;
}

export function SubscriptionGate({ children, feature }: SubscriptionGateProps) {
  const { requiresSubscription, isPaidUser } = useSubscriptionCheck();

  if (requiresSubscription && !isPaidUser) {
    return <UpgradePrompt feature={feature} />;
  }

  return <>{children}</>;
}