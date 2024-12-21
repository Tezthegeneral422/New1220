import React from 'react';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../hooks/subscriptions/useSubscription';
import { formatDate } from '../../utils/dateUtils';

export function SubscriptionSettings() {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-button-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Subscription Plan
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your subscription and billing
          </p>
        </div>
        {!subscription && (
          <Link 
            to="/subscription"
            className="btn-primary"
          >
            Upgrade Plan
          </Link>
        )}
      </div>

      {subscription ? (
        <div className="bg-gray-50 dark:bg-background-cardLight rounded-lg p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {subscription.plan?.name} Plan
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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

          <div className="border-t dark:border-gray-700 pt-6 space-y-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CreditCard className="h-5 w-5 mr-3" />
              ${subscription.plan?.price / 100}/{subscription.plan?.interval}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5 mr-3" />
              Current period ends: {formatDate(subscription.current_period_end)}
            </div>
            {subscription.cancel_at_period_end && (
              <div className="flex items-start text-sm text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="h-5 w-5 mr-3 mt-0.5" />
                <span>
                  Your subscription will end on {formatDate(subscription.current_period_end)}.
                  <Link to="/subscription" className="ml-1 underline">
                    Renew subscription
                  </Link>
                </span>
              </div>
            )}
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Plan Features
            </h5>
            <ul className="space-y-2">
              {subscription.plan?.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t dark:border-gray-700 pt-6 flex justify-between">
            <Link
              to="/subscription"
              className="text-button-primary hover:opacity-80 text-sm font-medium"
            >
              Change Plan
            </Link>
            {!subscription.cancel_at_period_end && (
              <button
                onClick={() => {/* TODO: Implement cancel subscription */}}
                className="text-red-600 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-background-cardLight rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            You are currently on the Free plan.
            <br />
            Upgrade to access premium features.
          </p>
        </div>
      )}
    </div>
  );
}