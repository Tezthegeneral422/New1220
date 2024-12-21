import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserRoutines, createRoutine, updateRoutine, deleteRoutine } from '../../services/routines';
import type { Database } from '../../types/database';

type Routine = Database['public']['Tables']['user_routines']['Row'];
type RoutineInsert = Database['public']['Tables']['user_routines']['Insert'];
type RoutineUpdate = Database['public']['Tables']['user_routines']['Update'];

export function useRoutineManagement() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function loadRoutines() {
      try {
        const data = await getUserRoutines(user.id);
        setRoutines(data);
      } catch (error) {
        console.error('Error loading routines:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRoutines();
  }, [user?.id]);

  const create = async (data: Omit<RoutineInsert, 'user_id'>) => {
    if (!user?.id) return;

    try {
      const newRoutine = await createRoutine({
        ...data,
        user_id: user.id,
      });
      setRoutines(prev => [newRoutine, ...prev]);
      return newRoutine;
    } catch (error) {
      console.error('Error creating routine:', error);
      throw error;
    }
  };

  const update = async (routineId: string, updates: RoutineUpdate) => {
    try {
      const updated = await updateRoutine(routineId, updates);
      setRoutines(prev => prev.map(r => r.id === routineId ? updated : r));
      return updated;
    } catch (error) {
      console.error('Error updating routine:', error);
      throw error;
    }
  };

  const remove = async (routineId: string) => {
    try {
      await deleteRoutine(routineId);
      setRoutines(prev => prev.filter(r => r.id !== routineId));
    } catch (error) {
      console.error('Error deleting routine:', error);
      throw error;
    }
  };

  return {
    routines,
    isLoading,
    create,
    update,
    remove,
  };
}