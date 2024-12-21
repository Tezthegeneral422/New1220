import React from 'react';
import { Check, Loader } from 'lucide-react';
import type { SubscriptionPlan } from '../../types/subscription';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  isProcessing?: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

export function PricingCard({ plan, isCurrentPlan, isProcessing, onSelect }: PricingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };

  return (
    <div className={`
      bg-white dark:bg-background-card rounded-lg shadow-lg p-6
      ${isCurrentPlan ? 'ring-2 ring-button-primary' : ''}
    `}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
      
      <div className="mt-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          {formatPrice(plan.price)}
        </span>
        <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
      </div>

      <ul className="mt-6 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        disabled={isCurrentPlan || isProcessing}
        className={`
          w-full mt-8 px-4 py-2 rounded-md font-medium flex items-center justify-center
          ${isCurrentPlan
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
            : 'btn-primary'
          }
        `}
      >
        {isProcessing ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Processing...
          </>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          'Select Plan'
        )}
      </button>
    </div>
  );
}