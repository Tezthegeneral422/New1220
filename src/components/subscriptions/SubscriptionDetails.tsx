import React from 'react';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSubscription } from '../../hooks/subscriptions/useSubscription';
import { cancelSubscription } from '../../services/subscriptions/subscriptionService';
import { formatDate } from '../../utils/dateUtils';

export function SubscriptionDetails() {
  const { subscription, isLoading } = useSubscription();

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await cancelSubscription(subscription.id);
        toast.success('Subscription will be cancelled at the end of the billing period');
      } catch (error) {
        console.error('Error cancelling subscription:', error);
        toast.error('Failed to cancel subscription');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-button-primary mx-auto"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You are currently on the Free plan
        </p>
        <Link to="/subscription" className="btn-primary">
          Upgrade Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-background-card rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {subscription.plan?.name} Plan
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {subscription.plan?.description}
          </p>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${subscription.status === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
          }
        `}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <CreditCard className="h-5 w-5 mr-3" />
          ${subscription.plan?.price / 100}/{subscription.plan?.interval}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-5 w-5 mr-3" />
          Current period ends: {formatDate(subscription.current_period_end)}
        </div>
      </div>

      {subscription.cancel_at_period_end && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Your subscription will end on {formatDate(subscription.current_period_end)}.
              </p>
              <Link
                to="/subscription"
                className="text-sm text-yellow-700 dark:text-yellow-300 underline mt-2 inline-block"
              >
                Renew subscription
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="border-t dark:border-gray-700 pt-6">
        <div className="flex justify-between">
          <Link
            to="/subscription"
            className="text-button-primary hover:opacity-80 text-sm font-medium"
          >
            Change Plan
          </Link>
          {!subscription.cancel_at_period_end && (
            <button
              onClick={handleCancelSubscription}
              className="text-red-600 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
}