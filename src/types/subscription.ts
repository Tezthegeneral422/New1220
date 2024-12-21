export type SubscriptionInterval = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: SubscriptionInterval;
  features: string[];
  is_active: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan?: SubscriptionPlan;
}