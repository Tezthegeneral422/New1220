import React from 'react';
import { Check } from 'lucide-react';
import type { OnboardingData } from '../../../types/onboarding';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      'Access to job board',
      'Basic skill tracking',
      'Limited course access'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious career growth',
    price: 19.99,
    features: [
      'All Free features',
      'Unlimited course access',
      'Advanced skill analytics',
      'Priority job applications',
      'Career coaching sessions'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for teams',
    price: 49.99,
    features: [
      'All Pro features',
      'Team collaboration tools',
      'Custom learning paths',
      'Dedicated support',
      'API access'
    ]
  }
];

type SubscriptionStepProps = Pick<OnboardingData, 'selectedPlanId'> & {
  updateFields: (fields: Partial<OnboardingData>) => void;
};

export function SubscriptionStep({ selectedPlanId, updateFields }: SubscriptionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Select a plan that best fits your needs. You can always change this later.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all
                ${selectedPlanId === plan.id
                  ? 'border-button-primary bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-button-primary'
                }
              `}
              onClick={() => updateFields({ selectedPlanId: plan.id })}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  {plan.price > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/month</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      Free
                    </span>
                  )}
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedPlanId === plan.id && (
                <div className="absolute -top-2 -right-2 bg-button-primary rounded-full p-1">
                  <Check className="h-4 w-4 text-black" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}