import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createStripePortalSession } from '../../services/stripe/stripeService';
import { useSubscription } from '../../hooks/subscriptions/useSubscription';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function SubscriptionManagement() {
  const { subscription, isLoading } = useSubscription();
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const navigate = useNavigate();

  const handleManageSubscription = async () => {
    setIsRedirecting(true);
    try {
      const portalUrl = await createStripePortalSession();
      window.location.href = portalUrl;
    } catch (error) {
      console.error('Error redirecting to portal:', error);
      setIsRedirecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-background-card rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Subscription Management
      </h2>

      {subscription ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Current Plan: {subscription.plan?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: {subscription.status}
              </p>
            </div>
            <button
              onClick={handleManageSubscription}
              disabled={isRedirecting}
              className="btn-primary"
            >
              {isRedirecting ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Manage Subscription'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have an active subscription
          </p>
          <button
            onClick={() => navigate('/subscription')}
            className="btn-primary"
          >
            View Plans
          </button>
        </div>
      )}
    </div>
  );
}