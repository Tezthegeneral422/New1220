import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type SkillTracking = Database['public']['Tables']['user_skills_tracking']['Row'];
type SkillTrackingInsert = Database['public']['Tables']['user_skills_tracking']['Insert'];
type SkillTrackingUpdate = Database['public']['Tables']['user_skills_tracking']['Update'];

export async function getUserSkills(userId: string) {
  const { data, error } = await supabase
    .from('user_skills_tracking')
    .select(`
      *,
      skills (
        name,
        category
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data as (SkillTracking & {
    skills: {
      name: string;
      category: string;
    };
  })[];
}

export async function trackSkill(tracking: SkillTrackingInsert) {
  const { data, error } = await supabase
    .from('user_skills_tracking')
    .insert(tracking)
    .select()
    .single();

  if (error) throw error;
  return data as SkillTracking;
}

export async function updateSkillTracking(trackingId: string, updates: SkillTrackingUpdate) {
  const { data, error } = await supabase
    .from('user_skills_tracking')
    .update(updates)
    .eq('id', trackingId)
    .select()
    .single();

  if (error) throw error;
  return data as SkillTracking;
}

export async function deleteSkillTracking(trackingId: string) {
  const { error } = await supabase
    .from('user_skills_tracking')
    .delete()
    .eq('id', trackingId);

  if (error) throw error;
}