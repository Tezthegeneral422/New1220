import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PricingCard } from '../components/subscriptions/PricingCard';
import { useSubscription } from '../hooks/subscriptions/useSubscription';
import { usePlanSelection } from '../hooks/subscriptions/usePlanSelection';
import { getSubscriptionPlans } from '../services/subscriptions/subscriptionService';
import type { SubscriptionPlan } from '../types/subscription';

export function SubscriptionPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { subscription } = useSubscription();
  const { handlePlanSelection, isProcessing } = usePlanSelection();

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        console.error('Error loading plans:', error);
        toast.error('Failed to load subscription plans');
      } finally {
        setIsLoading(false);
      }
    }

    loadPlans();
  }, []);

  if (isLoading || isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-button-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={subscription?.plan_id === plan.id}
              onSelect={handlePlanSelection}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}