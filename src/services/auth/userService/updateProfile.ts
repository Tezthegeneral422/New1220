import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

export async function updateUserProfile(userId: string, updates: Partial<Profile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}