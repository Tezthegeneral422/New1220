import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { selectPlan } from '../../services/subscriptions/subscriptionService';
import type { SubscriptionPlan } from '../../types/subscription';

export function usePlanSelection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelection = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast.error('Please sign in to select a plan');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      await selectPlan(user.id, plan.id);
      toast.success(`Successfully subscribed to the ${plan.name} plan`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast.error('Failed to process plan selection');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    handlePlanSelection
  };
}