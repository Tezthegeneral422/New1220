import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Goal = Database['public']['Tables']['user_goals']['Row'];
type GoalInsert = Database['public']['Tables']['user_goals']['Insert'];
type GoalUpdate = Database['public']['Tables']['user_goals']['Update'];

export async function getUserGoals(userId: string) {
  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Goal[];
}

export async function createGoal(goal: GoalInsert) {
  const { data, error } = await supabase
    .from('user_goals')
    .insert(goal)
    .select()
    .single();

  if (error) throw error;
  return data as Goal;
}

export async function updateGoal(goalId: string, updates: GoalUpdate) {
  const { data, error } = await supabase
    .from('user_goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();

  if (error) throw error;
  return data as Goal;
}

export async function deleteGoal(goalId: string) {
  const { error } = await supabase
    .from('user_goals')
    .delete()
    .eq('id', goalId);

  if (error) throw error;
}