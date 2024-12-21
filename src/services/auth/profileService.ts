import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

const VALID_CAREER_LEVELS = ['entry', 'mid', 'senior', 'transitioning'] as const;
type CareerLevel = typeof VALID_CAREER_LEVELS[number] | null;

function isValidCareerLevel(level: unknown): level is CareerLevel {
  if (level === null || level === '') return true;
  return VALID_CAREER_LEVELS.includes(level as CareerLevel);
}

function validateProfileData(profile: Partial<Profile>) {
  if (profile.career_level && !isValidCareerLevel(profile.career_level)) {
    throw new Error(`Invalid career level. Must be one of: ${VALID_CAREER_LEVELS.join(', ')} or null`);
  }
  
  // Convert empty string to null for career_level
  if (profile.career_level === '') {
    profile.career_level = null;
  }

  return profile;
}

export async function upsertProfile(userId: string, profile: Partial<Profile>): Promise<Profile> {
  const validatedProfile = validateProfileData(profile);

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      ...validatedProfile,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function ensureProfileExists(userId: string, defaultData: Partial<Profile>): Promise<Profile> {
  try {
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (existingProfile) {
      // If updating, only update non-null fields from defaultData
      const updates = Object.entries(defaultData).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Partial<Profile>);

      if (Object.keys(updates).length > 0) {
        return await upsertProfile(userId, updates);
      }
      return existingProfile;
    }

    // Create new profile
    return await upsertProfile(userId, {
      id: userId,
      first_name: null,
      last_name: null,
      career_level: null,
      career_focus: [],
      tracking_preferences: [],
      ...defaultData
    });
  } catch (error) {
    console.error('Error ensuring profile exists:', error);
    throw error;
  }
}