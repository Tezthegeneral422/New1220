import React from 'react';
import { Check, X } from 'lucide-react';
import type { SubscriptionPlan } from '../../types/subscription';

interface PlanComparisonProps {
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function PlanComparison({ plans, selectedPlan, onSelectPlan }: PlanComparisonProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Features
            </th>
            {plans.map((plan) => (
              <th key={plan.id} className="px-6 py-3 text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {plan.price === 0 ? 'Free' : `$${plan.price / 100}/${plan.interval}`}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {plans[0].features.map((feature, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {feature}
              </td>
              {plans.map((plan) => (
                <td key={plan.id} className="px-6 py-4 text-center">
                  {plan.features.includes(feature) ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-6 py-4"></td>
            {plans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                <button
                  onClick={() => onSelectPlan(plan)}
                  disabled={selectedPlan?.id === plan.id}
                  className={`
                    px-4 py-2 rounded-md font-medium text-sm
                    ${selectedPlan?.id === plan.id
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                    }
                  `}
                >
                  {selectedPlan?.id === plan.id ? 'Current Plan' : 'Select Plan'}
                </button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}