import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}