import { supabase } from '../../lib/supabase';

export async function createStripeCheckoutSession(priceId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
      body: { priceId }
    });

    if (error) throw error;
    return data.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createStripePortalSession() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.functions.invoke('create-stripe-portal', {
      body: { returnUrl: window.location.origin + '/subscription' }
    });

    if (error) throw error;
    return data.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}