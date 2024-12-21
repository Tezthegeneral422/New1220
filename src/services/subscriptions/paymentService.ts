import { supabase } from '../../lib/supabase';
import type { SubscriptionPlan } from '../../types/subscription';

export async function createCheckoutSession(planId: string) {
  const { data, error } = await supabase
    .functions.invoke('create-checkout-session', {
      body: { planId }
    });

  if (error) throw error;
  return data.sessionUrl;
}

export async function createSubscription(userId: string, planId: string) {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancel_at_period_end: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}