import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

export async function createUserProfile(userId: string, profile: Partial<Profile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        first_name: profile.first_name || null,
        last_name: profile.last_name || null,
        career_level: profile.career_level || null,
        career_focus: profile.career_focus || [],
        tracking_preferences: profile.tracking_preferences || [],
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}