import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Routine = Database['public']['Tables']['user_routines']['Row'];
type RoutineInsert = Database['public']['Tables']['user_routines']['Insert'];
type RoutineUpdate = Database['public']['Tables']['user_routines']['Update'];

export async function getUserRoutines(userId: string) {
  const { data, error } = await supabase
    .from('user_routines')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Routine[];
}

export async function createRoutine(routine: RoutineInsert) {
  const { data, error } = await supabase
    .from('user_routines')
    .insert(routine)
    .select()
    .single();

  if (error) throw error;
  return data as Routine;
}

export async function updateRoutine(routineId: string, updates: RoutineUpdate) {
  const { data, error } = await supabase
    .from('user_routines')
    .update(updates)
    .eq('id', routineId)
    .select()
    .single();

  if (error) throw error;
  return data as Routine;
}

export async function deleteRoutine(routineId: string) {
  const { error } = await supabase
    .from('user_routines')
    .delete()
    .eq('id', routineId);

  if (error) throw error;
}