import { supabase } from '../../lib/supabase';
import type { SubscriptionPlan, UserSubscription } from '../../types/subscription';

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .order('price');

  if (error) throw error;
  return data;
}

export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        plan:subscription_plans(*)
      `)
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export async function selectPlan(userId: string, planId: string): Promise<UserSubscription> {
  // First, check if user already has a subscription
  const { data: existingSubscription } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (existingSubscription) {
    // Update existing subscription
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        plan_id: planId,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingSubscription.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Create new subscription
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

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      cancel_at_period_end: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', subscriptionId);

  if (error) throw error;
}